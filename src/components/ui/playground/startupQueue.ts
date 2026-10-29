/** Bound expensive cold starts across workbenches without sharing runtime state. */
export function createStartupQueue(limit = 2) {
 let active=0;
 const waiting: Array<{signal:AbortSignal;resolve:(release:()=>void)=>void;reject:(error:Error)=>void;cancel:()=>void}> = [];
 function grant(job: typeof waiting[number]) {
 active++;job.signal.removeEventListener("abort",job.cancel);let released=false;
 job.resolve(()=>{if(released)return;released=true;active--;pump();});
 }
 function pump(){while(active<limit && waiting.length){const job=waiting.shift()!;if(!job.signal.aborted)grant(job);}}
 return (signal:AbortSignal,onQueued?:()=>void):Promise<()=>void>=>new Promise((resolve,reject)=>{
 if(signal.aborted){reject(new Error("Startup cancelled."));return;}
 const job={signal,resolve,reject,cancel:()=>{const index=waiting.indexOf(job);if(index>=0)waiting.splice(index,1);reject(new Error("Startup cancelled."));}};
 if(active<limit)grant(job);else{waiting.push(job);signal.addEventListener("abort",job.cancel,{once:true});onQueued?.();}
 });
}
export const acquireStartup = createStartupQueue();
