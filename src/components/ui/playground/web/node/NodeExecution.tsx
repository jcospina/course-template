import { useEffect, useRef, useState } from "react";
import { Nodebox, type ShellProcess } from "@codesandbox/nodebox";
import type { ExampleManifest, SourceFiles, WebProject } from "../../types";
import { acquireStartup } from "../../startupQueue";
import { serverBootstrap } from "./httpBridge";
import { transpileNode } from "./transpile";
import { fileText } from "../../resolve";
interface ResponseView {status:number;headers:Record<string,string>;body:string}
export default function NodeExecution({project,files,check=false,onStatus,onSummary}: {project:WebProject;files:SourceFiles;check?:boolean;onStatus:(status:string)=>void;onSummary?:(summary:string)=>void}) {
 const bridge=useRef<HTMLIFrameElement>(null);
 const iframe=useRef<HTMLIFrameElement>(null);const [logs,setLogs]=useState<string[]>([]);const [url,setURL]=useState("");const [response,setResponse]=useState<ResponseView>();
 const initial=project.requests?.[0] ?? {method:"GET",path:project.server?.startPath ?? "/"};
 const [headers,setHeaders]=useState(JSON.stringify(initial.headers ?? {},null,2));
 const [method,setMethod]=useState(initial.method);const [path,setPath]=useState(initial.path);const [body,setBody]=useState(initial.body ?? "");const [requestError,setRequestError]=useState("");
 const runtimeRef=useRef<Nodebox>();
 const active=useRef(false);const requestController=useRef<AbortController>();
 useEffect(()=>{
 const compilerController=new AbortController();
 let release: (()=>void)|undefined;
 let alive=true;active.current=true;let shell:ShellProcess|undefined;let poll:ReturnType<typeof setTimeout>|undefined;
 const timeout=setTimeout(()=>{if(!alive)return;onStatus("Node runtime timed out. Stop or retry.");onSummary?.("Checks timed out; no verdict.");cleanup();},30000);
 function cleanup(){release?.();release=undefined;compilerController.abort();alive=false;active.current=false;clearTimeout(timeout);clearTimeout(poll);requestController.current?.abort();runtimeRef.current=undefined;if(bridge.current)bridge.current.src="about:blank";shell?.stdout.removeAllListeners();shell?.stderr.removeAllListeners();void shell?.kill().catch(()=>{});if(iframe.current)iframe.current.src="about:blank";}
 const task=setTimeout(()=>void(async()=>{
 try {
 release=await acquireStartup(compilerController.signal,()=>onStatus("Queued. Waiting for another runtime to start."));
 if(!alive){release();return;}
 const runtime=new Nodebox({iframe:iframe.current!});await runtime.connect();if(!alive)return;runtimeRef.current=runtime;
 const runtimeFiles = project.preset === "node-ts" ? await transpileNode(files,compilerController.signal) : files;
 if(!alive)return;
 const effective=Object.fromEntries(Object.entries(runtimeFiles).map(([p,f])=>[p.slice(1),fileText(f)]));
 const entry = project.preset === "node-ts" ? project.entry.replace(/\.tsx?$/, ".js") : project.entry;
 if(project.server)effective["__course_server.js"] = serverBootstrap(entry,Object.fromEntries(Object.entries(runtimeFiles).map(([p,f])=>[p,fileText(f)])));
 const resultPath="__course_result_"+crypto.randomUUID()+".json";
 const checkSources=Object.keys(project.checks?.sources ?? {}).map(p=>"./"+(project.preset === "node-ts" ? p.replace(/\.tsx?$/, ".js") : p).replace(/^\//,""));
 if(check && project.checks?.kind==="node-assert") {
 effective["__course_checks.js"]=`const fs = require('fs');\nconst assert = require('assert');\nconst cases=[];\nconst test=(name,fn)=>cases.push({name,fn});\n(async()=>{try {\nfor(const path of ${JSON.stringify(checkSources)}) {const module = require(path); const register = module.default || module; if(typeof register !== 'function')throw Error('Check files must export a registration function'); await register({test,assert});}\nif(!cases.length)throw Error('No checks ran');\nconst results=[];for(const c of cases){try{await c.fn();results.push({name:c.name,passed:true});}catch(e){results.push({name:c.name,passed:false,message:e.stack || String(e)});}}\nfs.writeFileSync(${JSON.stringify(resultPath)},JSON.stringify({results}));\n}catch(e){fs.writeFileSync(${JSON.stringify(resultPath)},JSON.stringify({error:e.stack || String(e)}));}})();`;
 }
 await runtime.fs.init(effective);if(!alive)return;shell=runtime.shell.create();
 shell.stdout.on("data",data=>{if(alive)setLogs(prev=>[...prev,data].slice(-200));});shell.stderr.on("data",data=>{if(alive)setLogs(prev=>[...prev,data].slice(-200));});
 await shell.on("exit",(code,error)=>{if(alive){onStatus(error ? "Runtime error: "+error.message : code ? "Script failed with exit code "+code : "Script complete.");if(error || code){onSummary?.("Check runner failed: "+(error?.message ?? "exit code "+code));cleanup();}}});
 if(!alive)return;
 await shell.runCommand("node",[check && project.checks?.kind==="node-assert" ? "__course_checks.js" : project.server ? "__course_server.js" : entry.slice(1)]);
 if(!alive)return;release?.();release=undefined;
 if(check && project.checks?.kind==="node-assert") {
 const read=async()=>{
 if(!alive)return;
 let result:string;try {result=await runtime.fs.readFile(resultPath,"utf8");}catch{if(alive)poll=setTimeout(()=>void read(),200);return;}
 if(!alive)return;
 const parsed=JSON.parse(result);
 if(parsed.error)onSummary?.("Check runner error: "+parsed.error);
 else {const passed=parsed.results.filter((r:{passed:boolean})=>r.passed).length;onSummary?.(`${passed} passed, ${parsed.results.length-passed} failed.`);setLogs(parsed.results.map((r:{name:string;passed:boolean;message?:string})=>`${r.passed ? "Passed" : "Failed"}: ${r.name}${r.message ? "\n"+r.message : ""}`));}
 clearTimeout(timeout);void shell?.kill();
 };
 void read();
 } else if(project.server) {
 const preview=await runtime.preview.waitForPort(project.server.port,20000);if(!alive)return;
 const parsed=new URL(preview.url);if(parsed.protocol!=="https:" || !parsed.hostname.endsWith(".codesandbox.io"))throw new Error("Unexpected Nodebox server bridge URL.");
 await new Promise<void>((resolve,reject)=>{
 const frame=bridge.current!;const timeout=setTimeout(()=>reject(new Error("Sandbox HTTP bridge did not load.")),10000);
 frame.onload=()=>{clearTimeout(timeout);frame.onload=null;resolve();};
 frame.src=new URL("/__course_bridge",preview.url).href;
 });
 if(!alive)return;
 setURL(preview.url);onStatus("Server ready. Send a request through the sandbox bridge.");if(!check)clearTimeout(timeout);
 if(check && project.checks?.kind==="node-http") {
 let passed=0,failed=0;
 for(const c of project.checks.httpCases ?? []) {
 const response=await request(preview.url,c.request);if(!alive)return;
 const match=response.status===c.status && (c.body===undefined || response.body===c.body) && Object.entries(c.headers ?? {}).every(([k,v])=>response.headers[k.toLowerCase()]===v);
 if(match)passed++;else failed++;
 }
 onSummary?.(passed+failed ? `${passed} passed, ${failed} failed.` : "No checks ran.");void shell?.kill();setURL("");
 }
 }else {onStatus("Script started. Inspect stdout and stderr; Stop releases the runtime.");clearTimeout(timeout);}
 }catch(error){release?.();release=undefined;if(alive){clearTimeout(timeout);onStatus("Node startup failed: "+String(error));onSummary?.("Check runner error: "+String(error));setLogs(prev=>[...prev,String(error)]);}}
 })(),0);
 return()=>{clearTimeout(task);cleanup();};
 },[files,project,check,onStatus,onSummary]);
 async function request(base:string,input:{method:string;path:string;headers?:Record<string,string>;body?:string}) {
 if(!input.path.startsWith("/") || input.path.startsWith("//") || input.path.includes("\\"))throw new Error("Use a relative sandbox path beginning with /.");
 if(input.headers !== undefined && (!input.headers || Array.isArray(input.headers) || typeof input.headers!=="object" || Object.values(input.headers).some(v=>typeof v!=="string")))throw new Error("Headers must be a JSON object of strings.");
 if(Object.keys(input.headers ?? {}).some(key=>key.toLowerCase() === "x-course-body"))throw new Error("x-course-body is reserved for the sandbox bridge.");
 const target=new URL(input.path,base);const origin=new URL(base).origin;
 if(target.origin!==origin)throw new Error("Requests must stay inside this sandbox.");
 requestController.current?.abort();const controller=new AbortController();requestController.current=controller;
 const id=crypto.randomUUID();const frame=bridge.current!;
 return new Promise<ResponseView>((resolve,reject)=>{
 const finish=(error?:Error,response?:ResponseView)=>{clearTimeout(timer);window.removeEventListener("message",receive);controller.signal.removeEventListener("abort",cancel);if(error)reject(error);else resolve(response!);};
 const receive=(event:MessageEvent)=>{if(event.source!==frame.contentWindow || event.origin!==origin || event.data?.type!=="__course_http" || event.data.id!==id)return;const response=event.data.response;
 if(!event.data.error && (!response || !Number.isInteger(response.status) || typeof response.body!=="string" || !response.headers || typeof response.headers!=="object")){finish(new Error("Malformed sandbox HTTP response."));return;}
 finish(event.data.error ? new Error(event.data.error) : undefined,response);};
 const cancel=()=>finish(new Error("Request cancelled."));
 const timer=setTimeout(()=>finish(new Error("Sandbox HTTP request timed out.")),10000);
 window.addEventListener("message",receive);controller.signal.addEventListener("abort",cancel,{once:true});
 frame.contentWindow!.postMessage({type:"__course_request",id,input},origin);
 });
 }
 return <><iframe ref={bridge} title="Sandbox HTTP bridge" hidden/><iframe ref={iframe} title="Node runtime" hidden/><div className="playground__console sp-console" aria-label="Console output"><div className="playground__panel-label">Node stdout & stderr</div><pre>{logs.join("")}</pre></div>
 {project.server && !check && <div className="node-http">{project.requests && <label>Example request <select onChange={e=>{const request=project.requests![Number(e.target.value)];setMethod(request.method);setPath(request.path);setBody(request.body ?? "");setHeaders(JSON.stringify(request.headers ?? {},null,2));}}>{project.requests.map((request,i)=><option key={i} value={i}>{request.method} {request.path}</option>)}</select></label>}<label>Headers (JSON) <textarea aria-label="Headers (JSON)" value={headers} onChange={e=>setHeaders(e.target.value)}/></label><label>Method <select aria-label="Method" value={method} onChange={e=>setMethod(e.target.value as typeof method)}>{["GET","POST","PUT","PATCH","DELETE","HEAD"].map(m=><option key={m}>{m}</option>)}</select></label><label>Request path <input aria-label="Request path" value={path} onChange={e=>setPath(e.target.value)}/></label><label>Body <textarea aria-label="Body" value={body} onChange={e=>setBody(e.target.value)}/></label><button type="button" disabled={!url} onClick={async()=>{setRequestError("");try{const r=await request(url,{method,path,body,headers:JSON.parse(headers)});if(active.current)setResponse(r);}catch(e){if(active.current)setRequestError(String(e));}}}>Send request</button>{requestError && <p role="alert">{requestError}</p>}{response && <div aria-label="HTTP response"><p>Status: {response.status}</p><pre>{JSON.stringify(response.headers,null,2)}</pre><pre>{response.body.slice(0,20000)}{response.body.length>20000 ? "… [body truncated]" : ""}</pre></div>}</div>}
 </>;
}
