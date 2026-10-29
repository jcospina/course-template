import { test, expect } from "@playwright/test";
import { presets } from "../../src/components/ui/playground/presets";
for(const preset of Object.values(presets)) test(`${preset.id} executes and resets`,async({page})=>{
 test.setTimeout(120000);
 await page.goto(`/__verify?example=__fixtures/${preset.id}`);
 const region=page.getByRole("region",{name:"Verification example",exact:true});
 await expect(region).toContainText("Ready when you are");
 await expect(region.locator("iframe")).toHaveCount(0);
 await region.getByRole("button",{name:"Run code",exact:true}).click();
 if(preset.output==="preview") {
 const frame=region.getByLabel("Preview",{exact:true}).frameLocator('iframe[title="Sandpack Preview"]');
 if(preset.id==="html-css")await expect(frame.getByRole("heading",{name:"Hello HTML"})).toBeVisible();
 else {await expect(frame.getByRole("button",{name:"Count: 0"})).toBeVisible({timeout:45000});if(preset.environment === "node")await region.getByRole("button",{name:"Client",exact:true}).click();await expect(region.locator(".sp-console")).toContainText("dependencyProof",{timeout:45000});await frame.getByRole("button",{name:"Count: 0"}).click();await expect(frame.getByRole("button",{name:"Count: 1"})).toBeVisible();}
 }else if(preset.output==="results")await expect(region.getByRole("cell",{name:"Hello PostgreSQL"})).toBeVisible();
 else await expect(region.locator(".sp-console")).toContainText(preset.id==="node" ? "intro.js" : preset.id==="node-ts" ? "intro.ts" : `Hello ${preset.id==="typescript"?"TypeScript":"JavaScript"}`);
 if(preset.output === "preview" && preset.id !== "html-css") {
 const editor=region.locator(".cm-content").first();const starter=await editor.innerText();
 const failure='console.error("deliberate framework failure"); throw new Error("deliberate framework failure");\n';
 const broken=preset.id.startsWith("vue") || preset.id.startsWith("svelte") ? starter.replace("</script>",failure+"</script>") : failure+starter;
 await editor.fill(broken);await region.getByRole("button",{name:"Run code",exact:true}).click();
 if(preset.environment === "node")await region.getByRole("button",{name:"Client",exact:true}).click();
 await expect(region.locator(".sp-console")).toContainText("deliberate framework failure",{timeout:45000});
 await expect(region.getByLabel("Preview",{exact:true}).frameLocator('iframe[title="Sandpack Preview"]').getByRole("button",{name:"Count: 0"})).toHaveCount(0);
 await editor.fill(starter);await region.getByRole("button",{name:"Run code",exact:true}).click();
 await expect(region.getByLabel("Preview",{exact:true}).frameLocator('iframe[title="Sandpack Preview"]').getByRole("button",{name:"Count: 0"})).toBeVisible({timeout:45000});
 }
 await region.getByRole("button",{name:"Reset code",exact:true}).click();await expect(region).toContainText("Starter restored");await expect(region.locator("iframe")).toHaveCount(0);
});
