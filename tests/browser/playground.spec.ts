import { test, expect } from "@playwright/test";

async function replaceCode(
  region: import("@playwright/test").Locator,
  code: string,
) {
  const editor = region.locator(".cm-content").first();
  await editor.click();
  await editor.press("ControlOrMeta+a");
  await editor.fill(code);
}

test("JavaScript runs on demand, reports errors, stops, resets, and keeps instances isolated", async ({
  page,
}) => {
  await page.goto("/__fixtures/console-and-multifile");
  const region = page.getByRole("region", {
    name: "JavaScript timing",
    exact: true,
  });
  const consoleOutput = region.locator(".sp-console");
  await expect(region).toContainText(
    "Run the code to see logs and errors here.",
  );
  await expect(region.locator("iframe")).toHaveCount(0);
  await region.locator(".cm-content").first().click();
  await region.locator(".cm-content").first().press("ControlOrMeta+Enter");
  await expect(consoleOutput).toContainText(
    "synchronous start, synchronous end, microtask, timer",
  );
  await replaceCode(region, 'console.log("unique rerun output");');
  await expect(region.getByRole("status")).toContainText("Code changed");
  await expect(consoleOutput).not.toContainText("unique rerun output");
  await region.getByRole("button", { name: "Run code", exact: true }).click();
  await expect(consoleOutput).toContainText("unique rerun output");
  await expect(
    page.getByRole("region", { name: "TypeScript values", exact: true }),
  ).not.toContainText("unique rerun output");
  await region.getByRole("button", { name: "Clear output" }).click();
  await expect(consoleOutput).not.toContainText("unique rerun output");
  await replaceCode(region, 'throw new Error("deliberate runtime failure");');
  await region.getByRole("button", { name: "Run code", exact: true }).click();
  await expect(region).toContainText("deliberate runtime failure");
  await region.getByRole("button", { name: "Stop", exact: true }).click();
  await expect(region.getByRole("status")).toContainText("Stopped");
  await region.getByRole("button", { name: "Reset code" }).click();
  await expect(region.locator(".cm-content")).toContainText("const order = []");
  await region.getByRole("button", { name: "Run code", exact: true }).click();
  await expect(consoleOutput).toContainText(
    "synchronous start, synchronous end, microtask, timer",
  );
});

test("TypeScript reports a semantic error and clears it after a repair", async ({
  page,
}) => {
  await page.goto("/__fixtures/console-and-multifile");
  const region = page.getByRole("region", {
    name: "TypeScript values",
    exact: true,
  });
  await region
    .getByRole("button", { name: "Check types", exact: true })
    .click();
  await expect(region).toContainText("TS2322");
  await replaceCode(
    region,
    'const attempts: number = 3; console.log("Next attempt:", attempts + 1);',
  );
  await expect(region).toContainText("Code changed. Check types again.");
  await region
    .getByRole("button", { name: "Check types", exact: true })
    .click();
  await expect(region).toContainText("No type errors in this project.");
  await region.getByRole("button", { name: "Run code", exact: true }).click();
  await expect(region.locator(".sp-console")).toContainText("Next attempt: 4");
});

test("React renders, logs click output, and resolves types across files", async ({
  page,
}) => {
  await page.goto("/__fixtures/console-and-multifile");
  const region = page.getByRole("region", {
    name: "React greeting",
    exact: true,
  });
  await region.getByRole("button", { name: "Run code", exact: true }).click();
  const frame = region.locator(".sp-preview iframe").contentFrame();
  await frame.getByRole("button", { name: "Hello, Ada!" }).click();
  await expect(region.locator(".sp-console")).toContainText(
    "Selected: {name: Ada}",
  );
  await region
    .getByRole("button", { name: "Check types", exact: true })
    .click();
  await expect(region).toContainText("No type errors in this project.");
});

test("Node runs built-in modules and assertions in the lesson", async ({
  page,
}) => {
  await page.goto("/__fixtures/console-and-multifile");
  const region = page.getByRole("region", {
    name: "Node assertions",
    exact: true,
  });
  await region.getByRole("button", { name: "Run code", exact: true }).click();
  await expect(region.locator(".sp-console")).toContainText(
    "PASS: extracts the filename",
  );
  await replaceCode(
    region,
    'const assert = require("assert"); assert.strictEqual(1, 2);',
  );
  await region.getByRole("button", { name: "Run code", exact: true }).click();
  await expect(region.locator(".sp-console")).toContainText("AssertionError");
});

test("exercise checks fail before repair, pass after, and mark edited results stale", async ({
  page,
}) => {
  await page.goto("/__fixtures/first-principles");
  const region = page.locator(".exercise--code .playground");
  await region
    .getByRole("button", { name: "Check solution", exact: true })
    .click();
  await expect(region.locator(".sp-tests")).toContainText("averages a list");
  await expect(region.locator(".sp-tests")).toContainText("Expected");
  await replaceCode(
    region,
    "export function average(nums) { return nums.reduce((a, b) => a + b, 0) / nums.length; }",
  );
  await expect(region).toContainText("Code changed. Run checks again.");
  await region
    .getByRole("button", { name: "Check solution", exact: true })
    .click();
  await expect(region).toContainText("3 passed, 0 failed.");
  await region
    .getByRole("button", { name: "Check solution", exact: true })
    .click();
  await expect(region).toContainText("3 passed, 0 failed.");
});

test("mobile panels fit", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/__fixtures/console-and-multifile");
  const region = page.getByRole("region", {
    name: "JavaScript timing",
    exact: true,
  });
  await region.scrollIntoViewIfNeeded();
  const code = await region.locator(".playground__code").boundingBox();
  const output = await region.locator(".playground__output").boundingBox();
  expect(output!.y).toBeGreaterThan(code!.y);
  await region.getByRole("button", { name: "Run code", exact: true }).click();
  await expect(region.locator(".sp-console")).toContainText("synchronous start");
  await expect(region.locator(".sp-console-item").first()).toHaveCSS("font-size", "13px");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "artifacts/playground-mobile.png",
    fullPage: true,
    animations: "disabled",
  });
});

test("dark theme applies to the editor and runtime; console toggle preserves logs", async ({
  page,
}) => {
  await page.goto("/__fixtures/console-and-multifile");
  await page.getByRole("button", { name: /Switch to dark mode/i }).click();
  const region = page.getByRole("region", {
    name: "React greeting",
    exact: true,
  });
  await region.getByRole("button", { name: "Run code", exact: true }).click();
  await region
    .locator(".sp-preview iframe")
    .contentFrame()
    .getByRole("button", { name: "Hello, Ada!" })
    .click();
  await expect(region.locator(".sp-console")).toContainText("Selected:");
  await region.getByRole("button", { name: "Console", exact: true }).click();
  await expect(region.locator(".playground__console")).toBeHidden();
  await region.getByRole("button", { name: "Console", exact: true }).click();
  await expect(region.locator(".sp-console")).toContainText("Selected:");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await region.scrollIntoViewIfNeeded();
  await page.screenshot({ path: "artifacts/playground-dark.png" });
});

test("React JavaScript shorthand runs without TypeScript scaffolding", async ({
  page,
}) => {
  await page.goto("/__fixtures/welcome");
  const region = page.getByRole("region", {
    name: "React greeting in JavaScript",
    exact: true,
  });
  await region.getByRole("button", { name: "Run code", exact: true }).click();
  await expect(
    region
      .locator(".sp-preview iframe")
      .contentFrame()
      .getByText("Hello, you!"),
  ).toBeVisible();
  await expect(
    region.getByRole("button", { name: "Check types", exact: true }),
  ).toHaveCount(0);
});

test("unavailable runtime provides feedback and recovers after retry", async ({
  page,
}) => {
  await page.route(/^https:\/\/[^/]*codesandbox\.io\//, (route) =>
    route.abort(),
  );
  await page.goto("/__fixtures/console-and-multifile");
  const region = page.getByRole("region", {
    name: "JavaScript timing",
    exact: true,
  });
  await region.getByRole("button", { name: "Run code", exact: true }).click();
  await expect(region.getByRole("status")).toContainText(
    "Check your connection",
  );
  await page.unrouteAll();
  await region.getByRole("button", { name: "Run code", exact: true }).click();
  await expect(region.locator(".sp-console")).toContainText(
    "synchronous start, synchronous end, microtask, timer",
  );
});
