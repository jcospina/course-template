import { consoleFormatter } from "./console";
import { presets, scaffoldFiles } from "./presets";
import type { LoadedExample, PlaygroundProps, ResolvedProject, SourceFiles, WebEnvironment } from "./types";
export function normalizePath(path: string): string {
 if (!path || path.includes("\\") || path.includes("\0") || path.split("/").some(p => p === ".." || p === ".") || path.includes("//")) throw new Error(`Invalid path: ${path}. Use a relative path without traversal.`);
 return path.startsWith("/") ? path : "/" + path;
}
export function normalizeFiles(files: SourceFiles): SourceFiles {
 const result: SourceFiles = {};
 for (const [input,file] of Object.entries(files)) {
 const path = normalizePath(input);
 if ((path.startsWith("/__course_") || path === "/coursebootstrap.cjs")) throw new Error("Paths starting with /__course_ are reserved.");
 if (Object.hasOwn(result,path)) throw new Error("Duplicate file path: " + path);
 result[path] = typeof file === "string" ? file : {...file};
 }
 return result;
}
export function fileText(file: SourceFiles[string]): string { return typeof file === "string" ? file : file.code; }
export function exactVersions(dependencies: Record<string,string>) {
 for (const [name,version] of Object.entries(dependencies)) if (!/^\d+\.\d+\.\d+(?:-[\w.-]+)?$/.test(version)) throw new Error(`Dependency ${name} must use an exact version, received ${version}.`);
}
export function stableStringify(value: unknown): string {
 if (Array.isArray(value)) return "[" + value.map(stableStringify).join(",") + "]";
 if (value && typeof value === "object") return "{" + Object.entries(value).filter(([,v]) => v !== undefined).sort(([a],[b]) => a.localeCompare(b)).map(([k,v]) => JSON.stringify(k) + ":" + stableStringify(v)).join(",") + "}";
 return JSON.stringify(value) ?? "null";
}
export function snapshotIdentity(value: unknown): string {
 const text = stableStringify(value); let hash = 2166136261;
 for (let i=0; i<text.length; i++) hash = Math.imul(hash ^ text.charCodeAt(i),16777619);
 return (hash >>> 0).toString(16) + ":" + text.length;
}
export function resolveProject(props: PlaygroundProps, defaultPreset: PlaygroundProps["preset"] = "typescript", example?: LoadedExample): ResolvedProject {
 if (props.template) throw new Error("Legacy template must use the legacy adapter.");
 if (props.example && !example) throw new Error(`Example ${props.example} was not loaded.`);
 if (props.example && (props.code !== undefined || props.files || props.preset || props.dependencies || props.tests)) throw new Error("An example reference cannot also specify a preset, starter, dependencies, or tests.");
 if (props.code !== undefined && props.files) throw new Error("Choose code or files, not both.");
 const manifest = example?.manifest;
 const id = manifest?.preset ?? props.preset ?? defaultPreset ?? "typescript";
 if (id !== "custom-web" && !Object.hasOwn(presets,id)) throw new Error(`Unknown preset ${id}. Run bun run presets for supported environments.`);
 const preset = id === "custom-web" ? undefined : presets[id as keyof typeof presets];
 const dependencies = {...preset?.dependencies,...manifest?.dependencies,...props.dependencies}; exactVersions(dependencies);
 const authoredFiles = normalizeFiles(example?.sources ?? props.files ?? {[preset?.instructionalFile ?? "/index.js"]: props.code ?? preset?.starter ?? ""});
 const files: SourceFiles = {...(preset ? scaffoldFiles(preset,dependencies) : {}),...authoredFiles};
 let entry = preset?.entry ?? manifest?.project?.entry ?? "/index.js";
 let environment = preset?.environment;
 let output = preset?.output ?? "console";
 let capabilities = preset?.capabilities ?? {run:true,preview:false,console:true,results:false,http:false,semanticCheck:false,behaviorCheck:false};
 if (id === "custom-web") {
 if (!manifest?.project || !authoredFiles["/package.json"]) throw new Error("custom-web requires project metadata and a pinned package.json source.");
 if (manifest.dependencies) throw new Error("custom-web dependencies must be defined only in package.json.");
 const pkg = JSON.parse(fileText(authoredFiles["/package.json"])); exactVersions({...pkg.dependencies,...pkg.devDependencies});
 Object.assign(dependencies,pkg.dependencies,pkg.devDependencies);
 environment = manifest.project.environment; output = manifest.project.output; entry = normalizePath(manifest.project.entry);
 capabilities = {...capabilities,preview:output === "preview"};
 } else {
 for (const path of Object.keys(authoredFiles)) if (path === "/package.json" || (Object.hasOwn(preset!.scaffold,path) && path !== "/styles.css")) throw new Error(`Bootstrap override ${path} requires custom-web. Edit the instructional file instead.`);
 }
 if (!Object.hasOwn(files,entry)) throw new Error(`Entry ${entry} is missing for ${id}.`);
 if (preset?.environment && !["node","static"].includes(preset.environment)) {
 files["/__course_console.js"] = {code:consoleFormatter,hidden:true,readOnly:true};
 if(Object.hasOwn(preset.scaffold,entry)) files[entry] = {code:'import "/__course_console.js";\n'+fileText(files[entry]),hidden:true,readOnly:true};
 else {files["/__course_entry.js"]={code:'import "/__course_console.js";\nimport '+JSON.stringify(entry)+';',hidden:true,readOnly:true};entry="/__course_entry.js";}
 }
 if (id === "postgres" && props.dependencies) throw new Error("PostgreSQL does not accept npm dependencies.");
 if (props.showConsole && !capabilities.console) throw new Error(`Console is unavailable for ${id}.`);
 if (props.showPreview && !capabilities.preview) throw new Error(`Preview is unavailable for ${id}.`);
 if (props.typecheck && !capabilities.semanticCheck) throw new Error(`Semantic checking is unavailable for ${id}. Framework compilation does not check types.`);
 if (props.tests && capabilities.behaviorCheck !== "browser-jest") throw new Error(`Browser Jest checks are unavailable for ${id}.`);
 if (manifest?.database && id !== "postgres") throw new Error("database seed is supported only by postgres.");
 if (manifest?.server && !["node","node-ts"].includes(id)) throw new Error("server mode is supported only by Node presets.");
 if (manifest?.requests && !manifest.server) throw new Error("requests require server mode.");
 if (manifest?.server) {
 capabilities = {...capabilities,http:true};
 }
 const checks = manifest?.checks;
 if (checks) {
 if (checks.kind.startsWith("node-") && capabilities.behaviorCheck !== "node") throw new Error(`Node checks unavailable for ${id}.`);
 if (checks.kind === "node-http" && (!manifest?.server || !checks.httpCases?.length || checks.sources || checks.cases)) throw new Error("node-http requires server and nonempty httpCases only.");
 if (checks.kind === "node-assert" && (!example?.tests || !Object.keys(example.tests).length || checks.cases || checks.httpCases)) throw new Error("node-assert requires check sources only.");
 if (!checks.kind.startsWith("node-") && checks.httpCases) throw new Error("httpCases requires node-http.");
 if (checks.kind === "browser-jest" && capabilities.behaviorCheck !== "browser-jest" || checks.kind.startsWith("sql-") && capabilities.behaviorCheck !== "sql") throw new Error(`Unsupported check ${checks.kind} for ${id}.`);
 if (checks.kind === "browser-jest" && (!example?.tests || !Object.keys(example.tests).length || checks.cases)) throw new Error("browser-jest requires check source files and no SQL cases.");
 if (checks.kind.startsWith("sql-") && (!checks.cases?.length || checks.sources)) throw new Error("SQL checks require nonempty cases and no web check sources.");
 for (const c of checks.cases ?? []) {
 if (checks.kind === "sql-result" && (c.statement === undefined || c.query !== undefined)) throw new Error("sql-result cases require statement and no query.");
 if (checks.kind === "sql-state" && (!c.query || c.statement !== undefined)) throw new Error("sql-state cases require query and no statement.");
 if (c.rows.some(row => row.length !== c.columns.length)) throw new Error(`Column/row width mismatch in ${c.name}.`);
 }
 }
 for (const [input,code] of Object.entries(example?.tests ?? props.tests ?? {})) {
 const path = normalizePath(input); if (!/\.(test|spec)\.[jt]sx?$/.test(path)) throw new Error("Test file must end in .test.js or .test.ts: " + path);
 if (Object.hasOwn(files,path)) throw new Error("Test file conflicts with source: " + path);
 files[path] = {code,hidden:true,readOnly:true};
 }
 for (const path of manifest?.editor?.hiddenFiles ?? []) {
 const key = normalizePath(path); if (!Object.hasOwn(authoredFiles,key)) throw new Error("Unknown hidden file " + key);
 files[key] = {code:fileText(files[key]),hidden:true};
 }
 for (const path of manifest?.editor?.readOnlyFiles ?? []) {
 const key = normalizePath(path); if (!Object.hasOwn(authoredFiles,key)) throw new Error("Unknown read-only file " + key);
 files[key] = {...(typeof files[key] === "string" ? {code:files[key]} : files[key]),readOnly:true};
 }
 const visibleFiles = Object.keys(authoredFiles).filter(p => typeof files[p] === "string" || !files[p].hidden);
 const activeFile = normalizePath(manifest?.editor?.activeFile ?? manifest?.project?.activeFile ?? (visibleFiles.includes(preset?.instructionalFile ?? "") ? preset!.instructionalFile : visibleFiles[0] ?? ""));
 if (!visibleFiles.includes(activeFile)) throw new Error("Active file must be a visible authored source: " + activeFile);
 const solution = example?.solution ? {...Object.fromEntries(Object.entries(authoredFiles).map(([k,v]) => [k,fileText(v)])),...Object.fromEntries(Object.entries(normalizeFiles(example.solution)).map(([k,v]) => [k,fileText(v)]))} : undefined;
 for (const path of manifest?.solutionRemoveFiles ?? []) { if (!solution || !Object.hasOwn(solution,normalizePath(path))) throw new Error("solutionRemoveFiles must name an existing solution file."); delete solution[normalizePath(path)]; }
 const base = {id:example?.id ?? "inline",preset:id as ResolvedProject["preset"],revision:preset?.revision ?? 1,authoredFiles,files,visibleFiles,activeFile,dependencies,capabilities,checks,solution};
 return id === "postgres" ? {...base,kind:"sql",provider:"pglite",dialect:"postgresql",seed:example?.seed ?? "",entry,output:"results"} : {...base,kind:"web",provider:"sandpack",environment:environment as WebEnvironment,entry,server:manifest?.server,requests:manifest?.requests,output:output as "preview" | "console"};
}
