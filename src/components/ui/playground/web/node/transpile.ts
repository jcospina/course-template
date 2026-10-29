import type { SourceFiles } from "../../types";
export async function transpileNode(files: SourceFiles, signal: AbortSignal): Promise<SourceFiles> {
 const worker = new Worker(new URL("../../typecheck.worker.ts",import.meta.url),{type:"module"});
 return new Promise((resolve,reject)=>{
 const finish=(error?:Error,result?:SourceFiles)=>{worker.terminate();clearTimeout(timer);signal.removeEventListener("abort",cancel);if(error)reject(error);else resolve(result!);};
 const cancel=()=>finish(new Error("Compilation cancelled."));
 const timer=setTimeout(()=>finish(new Error("TypeScript transpilation timed out.")),20000);
 signal.addEventListener("abort",cancel,{once:true});
 worker.onmessage=({data})=>finish(data.error?new Error(data.error):undefined,data.files);
 worker.onerror=event=>finish(new Error(event.message || "TypeScript compiler could not load."));
 if(signal.aborted)cancel();else worker.postMessage({kind:"transpile",files});
 });
}
