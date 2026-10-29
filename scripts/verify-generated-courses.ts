import { cp, mkdir, mkdtemp, rm, symlink, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { tmpdir } from "node:os";
import { chromium, expect } from "@playwright/test";
import { createServer } from "node:net";
const root=process.cwd();const selected=process.argv.includes("--course")?[process.argv[process.argv.indexOf("--course")+1]]:["typescript","vue","node","postgres"];
const results=[];
for(const name of selected){
 if(!["typescript","vue","node","postgres"].includes(name))throw Error("Unknown acceptance course.");
 const directory=await mkdtemp(resolve(tmpdir(),"course-acceptance-"+name+"-"));let server:ReturnType<typeof Bun.spawn>|undefined;let browser;
 try{
 await cp(root,directory,{recursive:true,filter:path=>!["node_modules","dist","artifacts","test-results",".git"].some(p=>path.slice(root.length).split("/").includes(p)) && !path.endsWith(".tsbuildinfo")});
 await symlink(resolve(root,"node_modules"),resolve(directory,"node_modules"));
 for(const path of ["src/lessons","examples"])await rm(resolve(directory,path),{recursive:true,force:true});
 await cp(resolve(root,"tests/fixtures/generated-courses",name),directory,{recursive:true});
 const checks=[];
 for(const command of [["validate:course","--publication"],["check:mdx"],["typecheck"],["test"],["build"]]){
 const child=Bun.spawn(["bun","run",...command],{cwd:directory,stdout:"pipe",stderr:"pipe"});const stdout=new Response(child.stdout).text(),stderr=new Response(child.stderr).text();const exitCode=await child.exited;
 checks.push({command:command.join(" "),exitCode});if(exitCode)throw Error(command.join(" ")+" failed\n"+await stdout+await stderr);await stdout;await stderr;
 }
 const socket=createServer();await new Promise<void>(done=>socket.listen(0,"127.0.0.1",done));const port=(socket.address() as {port:number}).port;await new Promise<void>(done=>socket.close(()=>done()));const url=`http://127.0.0.1:${port}`;
 server=Bun.spawn(["bun","run","preview","--host","127.0.0.1","--port",String(port),"--strictPort"],{cwd:directory,stdout:"ignore",stderr:"inherit"});
 let ready=false;for(let i=0;i<50;i++){try{await fetch(url);ready=true;break;}catch{await Bun.sleep(100);}}if(!ready)throw Error("Preview failed.");
 const verify=Bun.spawn(["bun","run","verify:examples","--referenced","--json"],{cwd:directory,env:{...process.env,COURSE_VERIFY_URL:url},stdout:"pipe",stderr:"pipe"});const report=await new Response(verify.stdout).text();const stderr=await new Response(verify.stderr).text();if(await verify.exited)throw Error(report+stderr);checks.push({command:"verify:examples (production)",exitCode:0,report:JSON.parse(report)});
 browser=await chromium.launch({channel:"chrome"});const page=await browser.newPage();await page.goto(url);await expect(page.getByRole("link",{name:"Start learning"})).toBeVisible();await page.getByRole("link",{name:"Start learning"}).click();await expect(page).toHaveURL(/\/learn\/start$/);await expect(page.getByRole("button",{name:/complete/i}).first()).toBeVisible();
 // Read curriculum as plain JSON from its declaration; no MDX execution in validation.
 const data=await readFile(resolve(directory,"src/curriculum/data.ts"),"utf8");const parts=JSON.parse(data.slice(data.indexOf("= [")+2).trim().replace(/;$/,""));
 for(const lesson of parts[0].lessons){await page.goto(url+"/learn/"+lesson.slug);await expect(page.getByRole("heading",{name:lesson.title,exact:true})).toBeVisible();await expect(page.getByText("This lesson is on the roadmap but not written yet.",{exact:false})).toHaveCount(0);}
 await page.getByRole("button",{name:/Switch to dark mode/i}).click();await expect(page.locator("html")).toHaveAttribute("data-theme","dark");await page.setViewportSize({width:390,height:844});await expect(page.getByRole("heading",{name:parts[0].lessons.at(-1).title,exact:true})).toBeVisible();if(!await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth))throw Error("Mobile overflow.");
 await mkdir(resolve(root,"artifacts/generated-courses"),{recursive:true});await page.screenshot({path:resolve(root,"artifacts/generated-courses",name+"-mobile.png"),fullPage:true});
 results.push({course:name,ok:true,directory,lessons:parts[0].lessons.length,checks});console.error(`${name}: complete course, production examples, navigation, theme and narrow layout passed.`);
 }catch(error){results.push({course:name,ok:false,directory,message:String(error)});console.error(`${name}: ${String(error).slice(0,1800)}`);}finally{await browser?.close();server?.kill();}
}
const report={ok:results.every(r=>r.ok),results};await mkdir("artifacts",{recursive:true});await Bun.write("artifacts/generated-course-verification.json",JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(!report.ok)process.exitCode=1;
