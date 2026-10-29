import { describe, expect, test } from "bun:test";
import { resolveProject, snapshotIdentity, normalizePath } from "../src/components/ui/playground/resolve";
import { validateManifest } from "../src/components/ui/playground/validate";
import { compareSQL, type SQLResult } from "../src/components/ui/playground/sql/compare";
import { readExample } from "../scripts/course-lib";
import { mkdtemp, mkdir, writeFile, symlink, rm } from "node:fs/promises";
import type { LoadedExample } from "../src/components/ui/playground/types";
describe("effective projects",()=>{
 test("new default is TypeScript and legacy sources are preserved",()=>{
 const p=resolveProject({code:'console.log("source intact")'});expect(p.preset).toBe("typescript");expect(p.files["/index.ts"]).toBe('console.log("source intact")');expect(p.files["/App.tsx"]).toBeUndefined();
 });
 test("rejects conflicting source modes, bootstrap injection and unsupported checks",()=>{
 expect(()=>resolveProject({code:"",files:{"/index.ts":""}})).toThrow("Choose");
 expect(()=>resolveProject({preset:"vue-ts",code:"",typecheck:true})).toThrow("Semantic");
 expect(()=>resolveProject({preset:"svelte",files:{"/package.json":"{}"}})).toThrow("Bootstrap");
 expect(()=>resolveProject({preset:"node",code:"",tests:{"/x.test.js":""}})).toThrow("Jest");
 });
 test("dependencies and entry are complete and pinned",()=>{
 const p=resolveProject({preset:"react-ts",code:"export default ()=>null",dependencies:{"lodash-es":"4.17.21"}});
 expect(p.dependencies["lodash-es"]).toBe("4.17.21");expect(p.entry).toBe("/index.tsx");expect(p.files["/package.json"]).toMatchObject({code:expect.stringContaining('"lodash-es": "4.17.21"')});
 expect(()=>resolveProject({code:"",dependencies:{x:"^1.0.0"}})).toThrow("exact");
 });
 test.each(["../x","a/../x","a//x","a\\x"])("rejects traversal %s",path=>expect(()=>normalizePath(path)).toThrow());
 test("identity ignores key order and changes for dependencies and source",()=>{
 expect(snapshotIdentity({b:1,a:{y:2,x:3}})).toBe(snapshotIdentity({a:{x:3,y:2},b:1}));expect(snapshotIdentity({files:{x:"a"},dependencies:{x:"1.0.0"}})).not.toBe(snapshotIdentity({files:{x:"a"},dependencies:{x:"1.0.1"}}));
 });
 test("schema rejects unknown properties and lossy values",()=>{
 expect(()=>validateManifest({schemaVersion:1,preset:"postgres",sources:{"/query.sql":"files/query.sql"},typo:true})).toThrow("additional");
 expect(()=>validateManifest({schemaVersion:1,preset:"postgres",sources:{"/query.sql":"../secret"}})).toThrow("Invalid path");
 });
 test("SQL fixture solution overlays keep data separate from source",async()=>{
 const e=await readExample("__fixtures/sql-filter");const p=resolveProject({example:e.id},undefined,e);expect(p.kind).toBe("sql");expect(p.solution!["/query.sql"]).toContain("WHERE");expect(p.files["/seed.sql"]).toBeUndefined();
 });
 test("solution removal and hidden active file are validated",()=>{
 const example:LoadedExample={id:"remove",manifest:{schemaVersion:1,preset:"typescript",sources:{"/index.ts":"files/index.ts"},solutionSources:{"/index.ts":"solution/index.ts"},solutionRemoveFiles:["/old.ts"]},sources:{"/index.ts":"import './old'","/old.ts":""},solution:{"/index.ts":"console.log(1)"},seed:""};
 expect(resolveProject({example:example.id},undefined,example).solution!["/old.ts"]).toBeUndefined();
 expect(()=>resolveProject({example:example.id},undefined,{...example,manifest:{...example.manifest,editor:{hiddenFiles:["/index.ts"],activeFile:"/index.ts"}}})).toThrow("Active file");
 });
});
describe("SQL result feedback",()=>{
 const result:SQLResult={columns:["value"],rows:[[null],["NULL"],[2],[2]],affectedRows:0,totalRows:4};
 test("multisets preserve duplicates and distinguish NULL from text",()=>{
 expect(compareSQL(result,{name:"values",columns:["value"],rows:[[2],[null],[2],["NULL"]]}).passed).toBe(true);
 expect(compareSQL(result,{name:"values",columns:["value"],rows:[[null],["NULL"],[2]]}).passed).toBe(false);
 expect(compareSQL(result,{name:"values",columns:["value"],rows:[[2],[null],[2],["NULL"]],ordered:true}).passed).toBe(false);
 });
 test("numeric strings and numbers differ; bigints and decimals retain precision",()=>{
 expect(compareSQL({...result,rows:[[2]]},{name:"typed",columns:["value"],rows:[["2"]]}).passed).toBe(false);
 expect(compareSQL({...result,rows:[[{type:"decimal",value:"1.2300"}]]},{name:"decimal",columns:["value"],rows:[[{type:"decimal",value:"1.23"}]]}).passed).toBe(true);
 expect(compareSQL({...result,rows:[[{type:"bigint",value:"9007199254740993"}]]},{name:"bigint",columns:["value"],rows:[[{type:"bigint",value:"9007199254740992"}]]}).passed).toBe(false);
 });
 test("missing statements and unsafe numbers are errors",()=>{
 expect(()=>compareSQL(undefined,{name:"missing",columns:[],rows:[]})).toThrow("Missing");expect(()=>compareSQL({...result,rows:[[Number.MAX_SAFE_INTEGER+1]]},{name:"lossy",columns:["value"],rows:[]})).toThrow("Unsafe");
 });
});

describe("startup lifecycle",()=>{
 test("queued cancellation releases a slot and grants the next caller once",async()=>{
 const {createStartupQueue}=await import("../src/components/ui/playground/startupQueue");const queue=createStartupQueue(1);
 const first=await queue(new AbortController().signal);const cancelled=new AbortController();let queued=0;
 const pending=queue(cancelled.signal,()=>queued++).catch(error=>error);cancelled.abort();expect((await pending).message).toContain("cancelled");
 const next=queue(new AbortController().signal,()=>queued++);first();first();const release=await next;expect(queued).toBe(2);release();await queue(new AbortController().signal).then(done=>done());
 });
 test("editable CSS overrides the default and plain scripts allow DOM preview",()=>{
 const p=resolveProject({preset:"html-css",files:{"/index.html":"<p>Hello</p>","/styles.css":"p {color:red}"}});expect(p.files["/styles.css"]).toBe("p {color:red}");expect(resolveProject({preset:"javascript",code:"",showPreview:true}).capabilities.preview).toBe(true);
 });
 test("example root symlinks cannot escape examples",async()=>{
 const outside=await mkdtemp("/tmp/course-example-");const id="symlink-probe-"+Date.now();await mkdir("examples",{recursive:true});await symlink(outside,"examples/"+id);
 try {await expect(readExample(id)).rejects.toThrow("escapes examples root");}finally{await rm("examples/"+id);await rm(outside,{recursive:true});}
 });
});
