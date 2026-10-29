import type { Capabilities, PresetId, SourceFiles, WebEnvironment } from "./types";
export interface Preset {
 id: PresetId; label: string; revision: number; status: "experimental" | "verified";
 environment?: WebEnvironment; instructionalFile: string; entry: string;
 output: "preview" | "console" | "results"; dependencies: Record<string,string>;
 scaffold: Record<string,string>; starter: string; capabilities: Capabilities;
 limitations: string[]; fixture: string; browserCoverage: string[]; checkKinds: string[]; moduleFormats?: string[]; builtIns?: string[];
}
const capabilities = (output: Preset["output"], semanticCheck: Capabilities["semanticCheck"] = false, behaviorCheck: Capabilities["behaviorCheck"] = false): Capabilities => ({run:true, preview:output === "preview", console:output !== "results", results:output === "results", http:false, semanticCheck, behaviorCheck});
const html = '<!doctype html><html><head><meta charset="UTF-8"></head><body><div id="root"></div><script type="module" src="/src/main.js"></script></body></html>';
const records: Preset[] = [];
function add(id: PresetId, environment: WebEnvironment | undefined, instructionalFile: string, entry: string, output: Preset["output"], dependencies: Record<string,string>, scaffold: Record<string,string>, starter: string, semantic: Capabilities["semanticCheck"] = false, behavior: Capabilities["behaviorCheck"] = false) {
 records.push({id,label:id === "postgres" ? "PostgreSQL" : id,revision:1,status:"verified",environment,instructionalFile,entry,output,dependencies,scaffold,starter,capabilities:{...capabilities(output,semantic,behavior),preview:output === "preview" || environment === "parcel",http:behavior === "node"},limitations: id === "postgres" ? ["Fresh seeded database on every Run", "PostgreSQL only", "Display limits are not database memory limits", "Live database completion unavailable"] : ["Hosted Sandpack assets require network access", ...(semantic ? ["Third-party declarations must be supplied"] : ["Semantic checks unavailable"]), ...(behavior ? [] : ["Automated behavioral checks unavailable"]),...(behavior === "node" ? ["HTTP bridge supports CommonJS or compiled node-ts; server framework packages unverified", "Buffered text request bodies limited to 4096 UTF-8 bytes; no streaming uploads", "Native addons, external raw sockets, and subprocesses unsupported"] : [])],fixture:id,browserCoverage:["desktop-chrome"],checkKinds:behavior === "browser-jest" ? ["browser-jest"] : behavior === "sql" ? ["sql-result","sql-state"] : behavior === "node" ? ["node-assert","node-http"] : [],...(behavior === "node" ? {moduleFormats:id === "node-ts" ? ["TypeScript transpiled to CommonJS"] : ["CommonJS","ESM via custom-web .mjs project"],builtIns:["path","fs (virtual /nodebox)","buffer","stream","assert","http (CJS bridge)"]} : {})});
}
add("html-css", "static", "/index.html", "/index.html", "preview", {}, {"/styles.css":"body { font-family: sans-serif; }"}, '<!doctype html><link rel="stylesheet" href="/styles.css"><h1>Hello HTML</h1>');
for (const typed of [false,true]) {
 const ext = typed ? "ts" : "js";
 add(typed ? "typescript" : "javascript", "parcel", `/index.${ext}`, `/index.${ext}`, "console", {}, {"/index.html":'<div id="app"></div>'}, `console.log("Hello ${typed ? "TypeScript" : "JavaScript"}");`, typed ? "typescript" : false, "browser-jest");
 add(typed ? "react-ts" : "react", "create-react-app", typed ? "/App.tsx" : "/App.js", typed ? "/index.tsx" : "/index.js", "preview", {react:"18.3.1","react-dom":"18.3.1"}, {
  [typed ? "/index.tsx" : "/index.js"]:`import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
createRoot(document.getElementById('root')${typed ? "!" : ""}).render(<App />);`,
  "/public/index.html":'<div id="root"></div>', "/styles.css":"body { font-family: sans-serif; }"
 }, 'import { useState } from "react";\nexport default function App() { const [n, setN] = useState(0); return <button onClick={() => setN(n + 1)}>Count: {n}</button>; }', typed ? "react-typescript" : false, "browser-jest");
 add(typed ? "vue-ts" : "vue", "node", "/src/App.vue", `/src/main.${ext}`, "preview", {vue:"3.5.43",vite:"4.5.14","@vitejs/plugin-vue":"4.6.2","esbuild-wasm":"0.18.20",typescript:"5.9.3"}, {
  "/index.html":html.replace("main.js",`main.${ext}`), [`/src/main.${ext}`]:'import { createApp } from "vue";\nimport App from "./App.vue";\ncreateApp(App).mount("#root");', "/vite.config.js":'import { defineConfig } from "vite";\nimport vue from "@vitejs/plugin-vue";\nexport default defineConfig({plugins:[vue()],server:{host:"0.0.0.0"}});'
 }, `<script setup${typed ? ' lang="ts"' : ""}>
import { ref } from "vue";
const count = ref(0);
</script>
<template><button @click="count++">Count: {{ count }}</button></template>
<style>button { font-size: 18px; }</style>`);
 add(typed ? "svelte-ts" : "svelte", "node", "/src/App.svelte", `/src/main.${ext}`, "preview", {svelte:"5.57.1",vite:"4.5.14","@sveltejs/vite-plugin-svelte":"2.5.3","esbuild-wasm":"0.18.20",typescript:"5.9.3"}, {
  "/index.html":html.replace("main.js",`main.${ext}`), [`/src/main.${ext}`]:'import { mount } from "svelte";\nimport App from "./App.svelte";\nmount(App, {target: document.getElementById("root")'+(typed ? '!' : '')+'});', "/vite.config.js":'import { defineConfig } from "vite";\nimport { svelte } from "@sveltejs/vite-plugin-svelte";\nexport default defineConfig({plugins:[svelte()],server:{host:"0.0.0.0"}});'
 }, `<script${typed ? ' lang="ts"' : ""}>
let count = $state(0);
</script>
<button onclick={() => count++}>Count: {count}</button>
<style>button { font-size: 18px; }</style>`);
}
add("angular", "node", "/src/app/app.component.ts", "/src/main.ts", "preview", {"@angular/core":"22.2.1","@angular/common":"22.2.1","@angular/compiler":"22.2.1","@angular/platform-browser":"22.2.1",rxjs:"7.8.2",typescript:"5.9.3",vite:"4.5.14","esbuild-wasm":"0.18.20"}, {
 "/src/main.ts":'import "@angular/compiler";\nimport { bootstrapApplication } from "@angular/platform-browser";\nimport { AppComponent } from "./app/app.component";\nbootstrapApplication(AppComponent).catch(console.error);', "/index.html":'<app-root></app-root><script type="module" src="/src/main.ts"></script>', "/vite.config.js":'export default {server:{host:"0.0.0.0"}};', "/tsconfig.json":JSON.stringify({compilerOptions:{experimentalDecorators:true,target:"ES2022",module:"ESNext",useDefineForClassFields:false}})
}, 'import { Component, signal } from "@angular/core";\n@Component({selector:"app-root",standalone:true,template:`<button (click)="count.set(count() + 1)">Count: {{count()}}</button>`})\nexport class AppComponent { count = signal(0); }');
add("node", "node", "/index.js", "/index.js", "console", {}, {}, 'const path = require("path");\nconsole.log(path.basename("/lessons/intro.js"));',false,"node");
add("node-ts", "node", "/index.ts", "/index.ts", "console", {typescript:"5.9.3","@types/node":"22.18.6"}, {"/tsconfig.json":JSON.stringify({compilerOptions:{module:"CommonJS",target:"ES2022",esModuleInterop:true}})}, 'import path from "node:path";\nconsole.log(path.basename("/lessons/intro.ts"));',"node-typescript","node");
add("postgres", undefined, "/query.sql", "/query.sql", "results", {}, {}, "SELECT 'Hello PostgreSQL' AS greeting;", false, "sql");
export const presets = Object.fromEntries(records.map(p => [p.id,p])) as Record<Exclude<PresetId,"custom-web">,Preset>;
export function scaffoldFiles(preset: Preset, dependencies = preset.dependencies): SourceFiles {
 const files: SourceFiles = Object.fromEntries(Object.entries(preset.scaffold).map(([path,code]) => [path,{code,hidden:true,readOnly:true}]));
 if (preset.environment) {
 if (preset.environment === "node" && preset.output === "preview") files["/coursebootstrap.cjs"] = {hidden:true,readOnly:true,code:`const originalLog = console.log.bind(console);
for (const method of ['warn','info','error']) console[method] = (...args) => originalLog('[' + method + ']', ...args.map(value => value instanceof Error ? value.stack : value));
const { Buffer } = require('buffer');
const originalToString = Buffer.prototype.toString;
Buffer.prototype.toString = function(encoding, ...args) {
 if (encoding === 'base64url') return originalToString.call(this, 'base64', ...args).replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');
 return originalToString.call(this, encoding, ...args);
};
require('vite').createServer().then(server => server.listen()).catch(error => {console.error(error);process.exit(1);});`};
 const scripts = preset.environment === "node" ? {start:preset.id === "node-ts" ? `node ${preset.entry.slice(1).replace(/\.ts$/, ".js")}` : preset.output === "preview" ? "node coursebootstrap.cjs" : `node ${preset.entry.slice(1)}`} : {};
 files["/package.json"] = {code:JSON.stringify({name:"course-example",private:true,...(preset.output === "preview" && preset.environment === "node" ? {type:"module"} : {}),main:preset.entry,dependencies,scripts},null,2),hidden:true,readOnly:true};
 }
 return files;
}
