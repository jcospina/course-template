import ts from "typescript";

export interface TypeDiagnostic {
  file?: string;
  line?: number;
  message: string;
  code: number;
}

/** Pure virtual project: no learner code executes in the parent page. */
export function checkProject(
  files: Record<string, string>,
  libraries: Record<string, string>,
  profile: "typescript" | "react-typescript" | "node-typescript" = "react-typescript",
): TypeDiagnostic[] {
  const all = { ...libraries, ...files };
  const options: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2022,
    module: profile === "node-typescript" ? ts.ModuleKind.NodeNext : ts.ModuleKind.ESNext,
    moduleResolution: profile === "node-typescript" ? ts.ModuleResolutionKind.NodeNext : ts.ModuleResolutionKind.Bundler,
    jsx: profile === "react-typescript" ? ts.JsxEmit.ReactJSX : undefined,
    strict: true,
    skipLibCheck: true,
    noEmit: true,
    esModuleInterop: true,
    allowJs: true,
    checkJs: false,
    types: profile === "node-typescript" ? ["node"] : [],
    lib: profile === "node-typescript" ? ["lib.es2022.d.ts"] : ["lib.es2022.d.ts", "lib.dom.d.ts", "lib.dom.iterable.d.ts"],
  };
  const host: ts.CompilerHost = {
    getSourceFile: (path, version) =>
      all[path] === undefined
        ? undefined
        : ts.createSourceFile(path, all[path], version, true),
    readFile: (path) => all[path],
    fileExists: (path) => all[path] !== undefined,
    directoryExists: (path) =>
      Object.keys(all).some((file) =>
        file.startsWith(path.replace(/\/$/, "") + "/"),
      ),
    getDefaultLibFileName: () =>
      "/node_modules/typescript/lib/lib.es2022.full.d.ts",
    writeFile: () => {},
    getCurrentDirectory: () => "/",
    getDirectories: () => [],
    getCanonicalFileName: (file) => file,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
  };
  const roots = Object.keys(files).filter(
    (path) =>
      /\.[jt]sx?$/.test(path) &&
      !/\.(test|spec)\.[jt]sx?$/.test(path) &&
      !path.startsWith("/__course_"),
  );
  if (!roots.length) return [{code: 0,message:"No JavaScript or TypeScript roots were checked. Framework component checking is unavailable."}];
  const program = ts.createProgram(roots, options, host);
  const result = ts.getPreEmitDiagnostics(program).map((diagnostic) => ({
    file: diagnostic.file?.fileName,
    line:
      diagnostic.file && diagnostic.start !== undefined
        ? diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start).line +
          1
        : undefined,
    message: ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
    code: diagnostic.code,
  }));
  return result;
}
