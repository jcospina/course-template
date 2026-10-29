import type { SandpackFiles, SandpackPredefinedTemplate } from "@codesandbox/sandpack-react";
import type { PlaygroundProps } from "./types";
export type { PlaygroundProps } from "./types";
// Sandpack's console drops the visual grouping of multi-argument logs. Preserve
// it inside the sandbox, before lesson modules execute (from the ElevenLabs fix).
export { consoleFormatter } from "./console";
import { consoleFormatter } from "./console";

const entries: Partial<Record<SandpackPredefinedTemplate, [string, string]>> = {
  react: ["/App.js", "/index.js"],
  "react-ts": ["/App.tsx", "/index.tsx"],
  "vite-react": ["/App.jsx", "/index.jsx"],
  "vite-react-ts": ["/App.tsx", "/index.tsx"],
  vanilla: ["/index.js", "/index.js"],
  "vanilla-ts": ["/index.ts", "/index.ts"],
  node: ["/index.js", "/index.js"],
};

export function resolvePlayground({
  code,
  files,
  template = "react-ts",
  tests,
}: PlaygroundProps) {
  const react = template.includes("react");
  const entry = entries[template];
  if (code !== undefined && !entry) {
    throw new Error(
      "Use files instead of code for the " + template + " template.",
    );
  }
  if (template === "node" && tests && Object.keys(tests).length) {
    throw new Error(
      'Node exercises use require("assert") in their files. The tests prop uses the browser Jest runner.',
    );
  }
  const inputFiles: SandpackFiles =
    files ??
    (code !== undefined
      ? {
          [entry![0]]:
            react && !/export\s+(?:default|\{[^}]*\bdefault\b)/.test(code)
              ? code + "\n\nexport default function App() { return null; }\n"
              : code,
        }
      : {});
  const authorFiles: SandpackFiles = {};
  for (const [path, file] of Object.entries(inputFiles)) {
    const normalized = path.startsWith("/") ? path : "/" + path;
    if (normalized.startsWith("/__course_"))
      throw new Error(
        "Paths starting with /__course_ are reserved for the course runtime.",
      );
    if (Object.hasOwn(authorFiles, normalized))
      throw new Error("Duplicate file path: " + normalized);
    authorFiles[normalized] = file;
  }
  const resolved: SandpackFiles = { ...authorFiles };
  const formatterPath = "/__course_console.js";
  const browser = template !== "node" && !template.startsWith("vite");
  if (browser && entry) {
    resolved[formatterPath] = {
      code: consoleFormatter,
      hidden: true,
      readOnly: true,
    };
    const importFormatter = 'import "./__course_console.js";\n';
    if (react && !Object.hasOwn(authorFiles, entry[1])) {
      resolved[entry[1]] = {
        hidden: true,
        readOnly: true,
        code:
          importFormatter +
          `import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';
createRoot(document.getElementById('root')${template.endsWith("-ts") ? " as HTMLElement" : ""}).render(<App />);`,
      };
    } else if (!react && Object.hasOwn(authorFiles, entry[1])) {
      // Keep the authored entry untouched in the editor; a hidden bootstrap
      // imports it after the formatter. No edits to line numbers or source text.
      resolved["/__course_entry.js"] = {
        hidden: true,
        readOnly: true,
        code: importFormatter + 'import "' + entry[1] + '";',
      };
    }
  }
  for (const [inputPath, testCode] of Object.entries(tests ?? {})) {
    const path = inputPath.startsWith("/") ? inputPath : "/" + inputPath;
    if (!/\.(test|spec)\.[jt]sx?$/.test(path))
      throw new Error(
        "Test file must end in .test.js, .test.ts, .spec.js, or .spec.ts: " +
          path,
      );
    if (Object.hasOwn(resolved, path))
      throw new Error("Test file conflicts with an authored file: " + path);
    resolved[path] = { code: testCode, hidden: true, readOnly: true };
  }
  const visibleFiles = Object.entries(authorFiles)
    .filter(([, file]) => typeof file === "string" || !file.hidden)
    .map(([path]) => path);
  return {
    files: resolved,
    visibleFiles: visibleFiles.length ? visibleFiles : undefined,
    activeFile:
      visibleFiles.find(
        (path) =>
          typeof authorFiles[path] !== "string" && authorFiles[path].active,
      ) ?? visibleFiles[0],
    entry: resolved["/__course_entry.js"] ? "/__course_entry.js" : undefined,
  };
}
