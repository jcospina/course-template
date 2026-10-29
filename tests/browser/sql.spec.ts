import { test, expect } from "@playwright/test";
test("PostgreSQL separates runs, checks, edits, reset, NULL and duplicate labels",async({page})=>{
 await page.goto("/__verify?example=__fixtures/sql-filter");const region=page.getByRole("region",{name:"Verification example",exact:true});
 await expect(region).toContainText("Ready when you are");await region.getByRole("button",{name:"Run code",exact:true}).click();await expect(region.getByRole("cell",{name:"Sam",exact:true})).toBeVisible();
 await region.getByRole("button",{name:"Check solution"}).click();await expect(region).toContainText("0 passed, 1 failed.");
 const editor=region.locator(".cm-content");await editor.fill("SELECT name FROM customers WHERE city = 'Bogotá';");await expect(region).toContainText("Code changed. Run checks again.");
 await region.getByRole("button",{name:"Check solution"}).click();await expect(region).toContainText("1 passed, 0 failed.");
 await region.getByRole("button",{name:"Run code",exact:true}).click();await expect(region.getByRole("cell",{name:"Ada",exact:true})).toBeVisible();await expect(region.getByRole("cell",{name:"Sam",exact:true})).toHaveCount(0);
 await editor.fill("SELECT NULL AS value, 'NULL' AS value; SELECT 9007199254740993::bigint AS large, 1.234567890123456789::numeric AS precise;");await region.getByRole("button",{name:"Run code",exact:true}).click();await expect(region.getByRole("cell",{name:"9007199254740993"})).toBeVisible();await expect(region.getByRole("cell",{name:"1.234567890123456789"})).toBeVisible();await expect(region.getByRole("columnheader",{name:"value",exact:true})).toHaveCount(2);await expect(region.locator(".sql-null")).toHaveText("NULL");
 await editor.fill("SELECT missing FROM customers;");await region.getByRole("button",{name:"Run code",exact:true}).click();await expect(region.getByRole("alert")).toContainText("missing");
 await region.getByRole("button",{name:"Reset code"}).click();await expect(editor).toContainText("SELECT name FROM customers;");await expect(region.getByRole("alert")).toHaveCount(0);
});
test("Stop discards a blocked PostgreSQL worker and recovery works",async({page})=>{
 await page.goto("/__verify?example=__fixtures/sql-filter");const region=page.getByRole("region",{name:"Verification example",exact:true});const editor=region.locator(".cm-content");await editor.fill("SELECT pg_sleep(30);");await region.getByRole("button",{name:"Run code",exact:true}).click();await region.getByRole("button",{name:"Stop",exact:true}).click();await expect(region).toContainText("Stopped.");await editor.fill("SELECT 'recovered' AS status;");await region.getByRole("button",{name:"Run code",exact:true}).click();await expect(region.getByRole("cell",{name:"recovered"})).toBeVisible();
});
