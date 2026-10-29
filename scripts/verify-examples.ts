import { chromium, expect } from "@playwright/test";
import { validateCourse } from "./validate-course";
import { readExample } from "./course-lib";
import type { ExampleManifest } from "../src/components/ui/playground/types";
export async function verifyExamples() {
 const args=process.argv.slice(2);const id=args.includes("--example")?args[args.indexOf("--example")+1]:undefined;
 const validated=await validateCourse();if(!validated.ok)return {ok:false,code:"CONTENT_VALIDATION_FAILURE",issues:validated.issues};
 const ids=id?[id]:validated.references;
 const serverURL=process.env.COURSE_VERIFY_URL ?? "http://127.0.0.1:5173";
 let server:ReturnType<typeof Bun.spawn>|undefined;
 try{await fetch(serverURL,{signal:AbortSignal.timeout(1000)});}catch{
 if(process.env.COURSE_VERIFY_URL)throw new Error("Configured verification server is unavailable.");
 server=Bun.spawn(["bun","run","dev","--host","127.0.0.1","--strictPort"],{stdout:"ignore",stderr:"inherit"});
 for(let attempt=0;attempt<50;attempt++){try{await fetch(serverURL);break;}catch{await new Promise(r=>setTimeout(r,200));}}
 }
 const browser=await chromium.launch({channel:"chrome"});const results=[];
 try {
 for(const example of ids) {
 const loaded=await readExample(example);const recipe=loaded.manifest.verification;
 if(!recipe || (!loaded.manifest.checks && !recipe.steps?.length)){results.push({example,ok:false,code:"MISSING_RECIPE",message:"Declare observable verification steps."});continue;}
 for(const variant of loaded.manifest.checks ? ["starter","solution","rejected"] as const : ["starter"] as const) {
 const page=await browser.newPage();const started=performance.now();
 try {
 await page.goto(`${serverURL}/__verify?example=${encodeURIComponent(example)}&variant=${variant}`);
 const region=page.getByRole("region",{name:"Verification example",exact:true});await expect(region).toContainText("Ready when you are",{timeout:15000});
 await region.getByRole("button",{name:"Run code",exact:true}).click();
 if(loaded.manifest.checks) {
 await region.getByRole("button",{name:"Check solution",exact:true}).click();
 const outcome=variant==="solution" ? "pass" : variant==="rejected" ? "fail" : recipe.starterChecks;
 if(!outcome)throw new Error("Declare starterChecks for exercises.");
 await check(region,outcome);
 } else for(const step of recipe.steps ?? [])await runStep(region,step);
 await region.getByRole("button",{name:"Reset code",exact:true}).click();await expect(region).toContainText("Starter restored");
 results.push({example,variant,ok:true,durationMs:Math.round(performance.now()-started)});
 }catch(error){const text=await page.locator("body").innerText().catch(()=>"");results.push({example,variant,ok:false,code:/connection|network/i.test(text) && !/test file could not run|runner error|runner failed/i.test(text)?"INFRASTRUCTURE_FAILURE":"EXAMPLE_FAILURE",message:String(error),output:text.slice(-2500)});}finally{console.error(`${example} (${variant}): ${results.at(-1)?.ok ? "passed" : "failed"}`);await page.close();}
 }
 }
 }finally{await browser.close();server?.kill();}
 return {ok:results.every(r=>r.ok),results,inlineExamples:validated.issues.filter(i=>i.code==="INLINE_UNVERIFIED")};
}
async function check(region:any,outcome:"pass"|"fail") {
 const status=region.getByRole("group",{name:"Behavior checks",exact:true}).getByRole("status");
 await expect(status).toContainText(/\d+ passed, \d+ failed\.|test file could not run|runner error|runner failed|timed out|No checks ran|could not start/i,{timeout:45000});
 const text=await status.innerText();const match=/(\d+) passed, (\d+) failed\./.exec(text);
 if(!match)throw new Error("Check runner error: "+text);
 if(outcome==="pass" ? Number(match[1])===0 || Number(match[2])>0 : Number(match[2])===0)throw new Error(`Expected ${outcome}, got ${match[0]}`);
}
async function runStep(region:any,step:NonNullable<NonNullable<ExampleManifest["verification"]>["steps"]>[number]) {
 if(step.action==="console") {
 const client=region.getByRole("button",{name:"Client",exact:true});
 // The tab appears after a frontend Nodebox project finishes startup.
 await expect(region).not.toContainText("Starting runtime…",{timeout:45000});
 if(await client.count())await client.click();
 await expect(region.locator(".sp-console")).toContainText(step.text!,{timeout:45000});
 }
 if(step.action==="preview")await expect(region.getByLabel("Preview",{exact:true}).frameLocator('iframe[title="Sandpack Preview"]').getByText(step.text!,{exact:false})).toBeVisible({timeout:45000});
 if(step.action==="click")await region.getByLabel("Preview",{exact:true}).frameLocator('iframe[title="Sandpack Preview"]').getByRole(step.role!,{name:step.name!}).click({timeout:45000});
 if(step.action==="http") {
 const request=step.request!;
 await region.getByLabel("Method",{exact:true}).selectOption(request.method);
 await region.getByLabel("Request path",{exact:true}).fill(request.path);
 await region.getByLabel("Body",{exact:true}).fill(request.body ?? "");
 await region.getByLabel("Headers (JSON)",{exact:true}).fill(JSON.stringify(request.headers ?? {}));
 await region.getByRole("button",{name:"Send request",exact:true}).click({timeout:45000});
 const response=region.getByLabel("HTTP response",{exact:true});
 await expect(response).toContainText("Status: "+step.status,{timeout:15000});
 if(step.body!==undefined)await expect(response.locator("pre").last()).toHaveText(step.body);
 for(const [key,value] of Object.entries(step.headers ?? {}))await expect(response.locator("pre").first()).toContainText(JSON.stringify(key.toLowerCase())+": "+JSON.stringify(value));
 }
 if(step.action==="sql")await expect(region.getByRole("cell",{name:step.text!,exact:true})).toBeVisible({timeout:45000});
 if(step.action==="checks"){await region.getByRole("button",{name:"Check solution",exact:true}).click();await check(region,step.outcome!);}
}
if(import.meta.main)try{const report=await verifyExamples();console.log(JSON.stringify(report,null,2));if(!report.ok)process.exitCode=1;}catch(error){console.log(JSON.stringify({ok:false,code:"INFRASTRUCTURE_FAILURE",message:String(error)}));process.exitCode=1;}
