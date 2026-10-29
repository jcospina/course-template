import { test, expect } from "@playwright/test";

test("Node imports CommonJS files, npm packages, filesystem, Buffer and async streams",async({page})=>{
 await page.goto("/__verify?example=__fixtures/node-builtins");const region=page.getByRole("region",{name:"Verification example",exact:true});await region.getByRole("button",{name:"Run code",exact:true}).click();
 for(const text of ["multi-file proof","virtual filesystem","buffer proof","packageProof","stream proof"])await expect(region.locator(".sp-console")).toContainText(text);
 await region.getByRole("button",{name:"Stop",exact:true}).click();await expect(region.locator("iframe")).toHaveCount(0);
});
test("Node ESM resolves ordinary multi-file imports",async({page})=>{
 await page.goto("/__verify?example=__fixtures/node-esm");const region=page.getByRole("region",{name:"Verification example",exact:true});await region.getByRole("button",{name:"Run code",exact:true}).click();await expect(region.locator(".sp-console")).toContainText("ESM multi-file proof");
});
test("two Node HTTP servers use the same authored port independently and recover",async({page})=>{
 await page.goto("/__verify?example=__fixtures/node-api&variant=solution&copies=2");const first=page.getByRole("region",{name:"Verification example 1",exact:true}),second=page.getByRole("region",{name:"Verification example 2",exact:true});
 for(const region of [first,second])await region.getByRole("button",{name:"Run code",exact:true}).click();
 for(const region of [first,second]){await region.getByRole("button",{name:"Send request",exact:true}).click();await expect(region.getByLabel("HTTP response")).toContainText("Hello");}
 await first.getByRole("button",{name:"Stop",exact:true}).click();await second.getByRole("button",{name:"Send request",exact:true}).click();await expect(second.getByLabel("HTTP response")).toContainText("Status: 200");
 const editor=first.locator(".cm-content").first();await editor.fill('throw new Error("server failure proof");');await first.getByRole("button",{name:"Run code",exact:true}).click();await expect(first).toContainText("server failure proof");
 await first.getByRole("button",{name:"Reset code"}).click();await first.getByRole("button",{name:"Run code",exact:true}).click();await first.getByRole("button",{name:"Send request",exact:true}).click();await expect(first.getByLabel("HTTP response")).toContainText("Hello");
 await page.goto("/");await expect(page.locator("iframe")).toHaveCount(0);
});
test("two PostgreSQL instances isolate mutations and each rerun reseeds",async({page})=>{
 await page.goto("/__verify?example=__fixtures/sql-filter&copies=2");const first=page.getByRole("region",{name:"Verification example 1",exact:true}),second=page.getByRole("region",{name:"Verification example 2",exact:true});
 await first.locator(".cm-content").fill("DELETE FROM customers; SELECT name FROM customers;");await first.getByRole("button",{name:"Run code",exact:true}).click();await expect(first).toContainText("Empty result set.");
 await second.getByRole("button",{name:"Run code",exact:true}).click();await expect(second.getByRole("cell",{name:"Sam",exact:true})).toBeVisible();
 await first.locator(".cm-content").fill("SELECT name FROM customers;");await first.getByRole("button",{name:"Run code",exact:true}).click();await expect(first.getByRole("cell",{name:"Sam",exact:true})).toBeVisible();
});
test("Node TypeScript uses Node declarations and flags a semantic error independently of execution",async({page})=>{
 await page.goto("/__verify?example=__fixtures/node-ts");const region=page.getByRole("region",{name:"Verification example",exact:true});
 await region.getByRole("button",{name:"Check types",exact:true}).click();await expect(region).toContainText("No type errors in this project.");
 await region.locator(".cm-content").fill('import {readFileSync} from "node:fs";\nconst text: number = readFileSync("data.txt", "utf8");');await region.getByRole("button",{name:"Check types",exact:true}).click();await expect(region).toContainText("TS2322");
});
for(const id of ["browser-zero","node-zero"])test(`${id}: printing a verdict cannot turn zero checks green`,async({page})=>{
 await page.goto("/__verify?example=__fixtures/"+id);const region=page.getByRole("region",{name:"Verification example",exact:true});await region.getByRole("button",{name:"Run code",exact:true}).click();await expect(region.locator(".sp-console")).toContainText("3 passed, 0 failed.");await region.getByRole("button",{name:"Check solution",exact:true}).click();const checks=region.getByRole("group",{name:"Behavior checks",exact:true});await expect(checks).toContainText(/No checks ran|test file could not run/);await expect(checks.getByRole("status")).not.toContainText(/\d+ passed, \d+ failed\./);
});
test("Node HTTP preserves UTF-8 text, methods and headers and bounds request bodies",async({page})=>{
 await page.goto("/__verify?example=__fixtures/node-http-worked");const region=page.getByRole("region",{name:"Verification example",exact:true});await region.getByRole("button",{name:"Run code",exact:true}).click();
 await region.getByLabel("Method",{exact:true}).selectOption("POST");await region.getByLabel("Request path",{exact:true}).fill("/echo");await region.getByLabel("Headers (JSON)",{exact:true}).fill('{"x-example":"lesson"}');await region.getByLabel("Body",{exact:true}).fill("café ☕");await region.getByRole("button",{name:"Send request",exact:true}).click();await expect(region.getByLabel("HTTP response")).toContainText('{"body":"café ☕","method":"POST","header":"lesson"}');await expect(region.locator(".sp-console")).toContainText("incoming POST");
 await region.getByLabel("Body",{exact:true}).fill("x".repeat(4097));await region.getByRole("button",{name:"Send request",exact:true}).click();await expect(region.getByRole("alert")).toContainText("4096 UTF-8 bytes");
});
