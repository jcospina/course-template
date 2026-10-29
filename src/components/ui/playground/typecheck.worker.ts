import ts from "typescript";
import { fileText } from "./resolve";
import type { SourceFiles } from "./types";
import { checkProject } from "./typecheck";

// Real installed declarations are bundled into the on-demand worker, never a
// permissive React shim or a network request made by each learner.
const libraries = import.meta.glob<string>(
  [
    "/node_modules/typescript/lib/lib.*.d.ts",
    "/node_modules/@types/react/*.d.ts",
    "/node_modules/@types/react-dom/*.d.ts",
    "/node_modules/@types/prop-types/index.d.ts",
    "/node_modules/csstype/index.d.ts",
    "/node_modules/@types/node/**/*.d.ts",
    "/node_modules/undici-types/*.d.ts",
  ],
  { query: "?raw", import: "default", eager: true },
);

self.onmessage = (event: MessageEvent<{kind?: "transpile"; files: Record<string,string> | SourceFiles; profile: "typescript" | "react-typescript" | "node-typescript"}>) => {
  try {
    if(event.data.kind === "transpile") {
      const files: Record<string,string> = {};
      for(const [path,source] of Object.entries(event.data.files)) {
        if(path.endsWith(".d.ts")) continue;
        if(/\.tsx?$/.test(path)) {
          const compiled=ts.transpileModule(fileText(source),{fileName:path,reportDiagnostics:true,compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS,esModuleInterop:true,rewriteRelativeImportExtensions:true,sourceMap:false}});
          if(compiled.diagnostics?.length)throw new Error(compiled.diagnostics.map(d=>ts.flattenDiagnosticMessageText(d.messageText,"\n")).join("\n"));
          files[path.replace(/\.tsx?$/, ".js")]=compiled.outputText;
        } else files[path]=fileText(source);
      }
      self.postMessage({files});
    } else self.postMessage({ diagnostics: checkProject(event.data.files as Record<string,string>, libraries,event.data.profile) });
  } catch (error) {
    self.postMessage({
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
