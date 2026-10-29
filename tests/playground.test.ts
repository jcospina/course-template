import { describe, expect, test } from "bun:test";
import { readFileSync, readdirSync } from "node:fs";
import {
  resolvePlayground,
  consoleFormatter,
} from "../src/components/ui/playground/files";
import { checkProject } from "../src/components/ui/playground/typecheck";

const libraries: Record<string, string> = {};
for (const dir of [
  "typescript/lib",
  "@types/react",
  "@types/react-dom",
  "@types/prop-types",
  "csstype",
]) {
  for (const file of readdirSync("node_modules/" + dir).filter((file) =>
    file.endsWith(".d.ts"),
  )) {
    libraries["/node_modules/" + dir + "/" + file] = readFileSync(
      "node_modules/" + dir + "/" + file,
      "utf8",
    );
  }
}

describe("lesson files", () => {
  test.each([
    ["react", "/App.js"],
    ["react-ts", "/App.tsx"],
    ["vanilla", "/index.js"],
    ["vanilla-ts", "/index.ts"],
    ["node", "/index.js"],
  ] as const)("%s uses the right entry", (template, path) => {
    const result = resolvePlayground({ template, code: "console.log(42)" });
    expect(result.visibleFiles).toEqual([path]);
    expect(result.files[path]).toBeTruthy();
    if (!template.includes("react"))
      expect(result.files[path]).not.toContain("function App");
  });
  test("preserves authored files and marks tests read-only", () => {
    const result = resolvePlayground({
      files: {
        "/App.tsx": "export default () => null",
        "/helpers.ts": "export const a = 1",
      },
      tests: { "/helpers.test.ts": 'test("a", () => {});' },
    });
    expect(result.visibleFiles).toEqual(["/App.tsx", "/helpers.ts"]);
    expect(result.files["/helpers.test.ts"]).toMatchObject({
      hidden: true,
      readOnly: true,
    });
  });
  test("normalizes relative paths and rejects duplicates or reserved files", () => {
    expect(
      resolvePlayground({ files: { "index.tsx": "custom" } }).files[
        "/index.tsx"
      ],
    ).toBe("custom");
    expect(() =>
      resolvePlayground({ files: { "/a.ts": "", "a.ts": "" } }),
    ).toThrow("Duplicate");
    expect(() =>
      resolvePlayground({ files: { "/__course_console.js": "" } }),
    ).toThrow("reserved");
  });
  test("does not overwrite a custom React entry", () => {
    expect(
      resolvePlayground({ files: { "/index.tsx": "custom entry" } }).files[
        "/index.tsx"
      ],
    ).toBe("custom entry");
  });
  test("rejects incompatible or conflicting test configuration", () => {
    expect(() =>
      resolvePlayground({ template: "node", tests: { "/x.test.js": "" } }),
    ).toThrow("Node exercises");
    expect(() => resolvePlayground({ tests: { "/x.js": "" } })).toThrow(
      "Test file",
    );
    expect(() =>
      resolvePlayground({
        files: { "/x.test.js": "" },
        tests: { "/x.test.js": "" },
      }),
    ).toThrow("conflicts");
  });
  test("console keeps arguments, circular values, bigint and repeated objects readable", () => {
    const logs: string[] = [];
    const localConsole = Object.fromEntries(
      ["log", "info", "warn", "error", "debug"].map((method) => [
        method,
        (value: string) => logs.push(value),
      ]),
    );
    new Function(
      "console",
      consoleFormatter +
        '; const a = { n: 1n }; a.self = a; console.log("value", a, a); console.warn(undefined, new Set([1,2]));',
    )(localConsole);
    expect(logs[0]).toBe(
      "value {n: 1n, self: [Circular]} {n: 1n, self: [Circular]}",
    );
    expect(logs[1]).toBe("undefined Set [1, 2]");
  });
});

describe("real TypeScript verification", () => {
  test("reports semantic errors even when JavaScript would run", () => {
    expect(
      checkProject(
        { "/index.ts": 'const count: number = "two"; console.log(count);' },
        libraries,
      ),
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: 2322, file: "/index.ts", line: 1 }),
      ]),
    );
  });
  test("resolves cross-file types and does not hide missing exports", () => {
    const result = checkProject(
      {
        "/index.ts": 'import { missing } from "./math";',
        "/math.ts": "export const add = (n: number) => n + 1;",
      },
      libraries,
    );
    expect(result.some((item) => item.code === 2305)).toBe(true);
  });
  test("uses actual React declarations", () => {
    const good = {
      "/App.tsx":
        'import { useState } from "react"; export default function App() { const [n, setN] = useState(0); return <button onClick={() => setN(n + 1)}>{n}</button>; }',
    };
    expect(checkProject(good, libraries)).toEqual([]);
    expect(
      checkProject(
        {
          "/App.tsx": good["/App.tsx"].replace("setN(n + 1)", 'setN("wrong")'),
        },
        libraries,
      ).some((item) => item.code === 2345),
    ).toBe(true);
  });
  test("keeps separate projects isolated", () => {
    checkProject({ "/index.ts": 'const n: number = "bad";' }, libraries);
    expect(
      checkProject({ "/index.ts": "const n: number = 1;" }, libraries),
    ).toEqual([]);
  });
});
