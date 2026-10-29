import { createServer } from "node:net";
const json=process.argv.includes("--json");
const results:Array<{command:string;exitCode:number}>=[];
let preview:ReturnType<typeof Bun.spawn>|undefined;
async function run(command:string,env:Record<string,string|undefined>=process.env) {
 const child=Bun.spawn(["bun","run",command],{stdout:json?"pipe":"inherit",stderr:"inherit",env});
 if(json)console.error(await new Response(child.stdout).text());
 const exitCode=await child.exited;results.push({command,exitCode});if(exitCode!==0)throw new Error(command+" failed.");
}
try {
 for(const command of ["validate:course","check:mdx","typecheck","test","build"])await run(command);
 let url=process.env.COURSE_VERIFY_URL;
 if(!url){
 const socket=createServer();await new Promise<void>(resolve=>socket.listen(0,"127.0.0.1",resolve));const port=(socket.address() as {port:number}).port;await new Promise<void>(resolve=>socket.close(()=>resolve()));
 url=`http://127.0.0.1:${port}`;
 preview=Bun.spawn(["bun","run","preview","--host","127.0.0.1","--port",String(port),"--strictPort"],{stdout:"ignore",stderr:"inherit"});
 let ready=false;for(let i=0;i<50;i++){try{await fetch(url,{signal:AbortSignal.timeout(1000)});ready=true;break;}catch{await Bun.sleep(100);}}
 if(!ready)throw new Error("Production preview could not start.");
 }
 for(const command of ["test:browser","verify:examples"])await run(command,{...process.env,COURSE_VERIFY_URL:url});
}catch(error){console.error(String(error));process.exitCode=1;}finally{preview?.kill();}
console.log(JSON.stringify({ok:!process.exitCode,results},null,2));
