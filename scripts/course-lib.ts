import { readdir, readFile, realpath, stat } from "node:fs/promises";
import { resolve, relative } from "node:path";
import { createProcessor } from "@mdx-js/mdx";
import { validateManifest } from "../src/components/ui/playground/validate";
import { resolveProject, normalizePath } from "../src/components/ui/playground/resolve";
import type { LoadedExample } from "../src/components/ui/playground/types";
export interface Issue {code:string;file:string;message:string;example?:string;lesson?:string;line?:number;suggestion:string;severity:"error" | "warning"}
export async function walk(directory:string):Promise<string[]> {
 try {const entries=await readdir(directory,{withFileTypes:true});const arrays=await Promise.all(entries.filter(e=>!e.name.startsWith(".") && !["node_modules","dist"].includes(e.name)).map(async e=>e.isDirectory()?walk(directory+"/"+e.name):[directory+"/"+e.name]));return arrays.flat();}catch(e){if((e as {code?:string}).code==="ENOENT")return [];throw e;}
}
export async function readExample(id:string,variant:"starter"|"solution"|"rejected"="starter"):Promise<LoadedExample> {
 normalizePath(id);
 const fixture=id.startsWith("__fixtures/");const container=fixture ? "tests/fixtures/compatibility" : "examples";
 const directory=resolve(container,fixture ? id.slice(11) : id);const root=await realpath(directory);
 const examplesRoot=await realpath(container);if(id.startsWith("/") || relative(examplesRoot,root).startsWith(".."))throw new Error("Example escapes examples root: "+id);
 const manifest=JSON.parse(await readFile(directory+"/example.json","utf8"));validateManifest(manifest);
 const read=async(path:string)=>{
 normalizePath(path);if(path.startsWith("/"))throw new Error("Source must be relative: "+path);
 const file=await realpath(resolve(directory,path));if(relative(root,file).startsWith("..") || !(await stat(file)).isFile())throw new Error("Source escapes example root: "+path);
 return readFile(file,"utf8");
 };
 const map=async(sources?:Record<string,string>)=>sources?Object.fromEntries(await Promise.all(Object.entries(sources).map(async([p,f])=>[normalizePath(p),await read(f)]))):undefined;
 let sources=(await map(manifest.sources))!;
 const solution=await map(manifest.solutionSources);
 if(variant==="solution") {if(!solution)throw new Error("Missing solution sources.");sources={...sources,...solution};for(const p of manifest.solutionRemoveFiles ?? [])delete sources[normalizePath(p)];}
 if(variant==="rejected"){if(!manifest.verification?.rejectedSources)throw new Error("Missing rejected repair.");sources={...sources,...await map(manifest.verification.rejectedSources)};}
 const example={id,manifest:variant === "solution" ? {...manifest,solutionRemoveFiles:undefined} : manifest,sources,solution,seed:manifest.database?await read(manifest.database.seed):"",tests:await map(manifest.checks?.sources)};
 // Resolve the original before variant overlays, since removal belongs to the solution.
 if(variant==="starter")resolveProject({example:id},undefined,example);
 return example;
}
export function parseMDX(source:string):any {return createProcessor().parse(source);}
export function visit(node:any,fn:(node:any)=>void) {fn(node);for(const child of node.children ?? [])visit(child,fn);}
export function literal(attribute:any):unknown {
 const value=attribute.value;if(typeof value==="string" || value===null)return value ?? true;
 const expression=value?.data?.estree?.body?.[0]?.expression;
 function evaluate(e:any):unknown {
 if(e?.type==="Literal")return e.value;
 if(e?.type==="TemplateLiteral" && !e.expressions.length)return e.quasis[0].value.cooked;
 if(e?.type==="ArrayExpression")return e.elements.map(evaluate);
 if(e?.type==="ObjectExpression")return Object.fromEntries(e.properties.map((p:any)=>{if(p.type!=="Property" || p.computed)throw Error();return[p.key.name ?? p.key.value,evaluate(p.value)];}));
 throw new Error("Dynamic expression needs explicit browser verification.");
 }
 return evaluate(expression);
}
export function output(result:unknown,json:boolean) {console.log(json?JSON.stringify(result,null,2):JSON.stringify(result,null,2));}
