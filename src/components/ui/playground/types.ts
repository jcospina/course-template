import type { ExampleManifest } from "./manifest.generated";
export type { ExampleManifest } from "./manifest.generated";
export type SourceFiles = Record<string, string | { code: string; hidden?: boolean; readOnly?: boolean; active?: boolean }>;
export type PresetId = ExampleManifest["preset"];
export type WebEnvironment = NonNullable<ExampleManifest["project"]>["environment"];
export interface PlaygroundProps {
  example?: string; preset?: PresetId; code?: string; files?: SourceFiles;
  /** Migration adapter; use preset for new content. */
  template?: "static" | "angular" | "react" | "react-ts" | "solid" | "svelte" | "test-ts" | "vanilla-ts" | "vanilla" | "vue" | "vue-ts" | "node" | "nextjs" | "vite" | "vite-react" | "vite-react-ts" | "vite-preact" | "vite-preact-ts" | "vite-vue" | "vite-vue-ts" | "vite-svelte" | "vite-svelte-ts" | "astro";
  dependencies?: Record<string,string>; layout?: "row" | "column";
  editorHeight?: number; showPreview?: boolean; showConsole?: boolean;
  showTabs?: boolean; readOnly?: boolean; tests?: Record<string,string>;
  typecheck?: boolean; title?: string;
}
export interface Capabilities {
 run: boolean; preview: boolean; console: boolean; results: boolean; http: boolean;
 semanticCheck: false | "typescript" | "react-typescript" | "node-typescript";
 behaviorCheck: false | "browser-jest" | "sql" | "node";
}
interface BaseProject {
 id: string; preset: PresetId; revision: number; authoredFiles: SourceFiles;
 files: SourceFiles; visibleFiles: string[]; activeFile: string;
 dependencies: Record<string,string>; capabilities: Capabilities;
 checks?: ExampleManifest["checks"]; solution?: Record<string,string>;
}
export interface WebProject extends BaseProject {
 kind: "web"; provider: "sandpack"; environment: WebEnvironment; entry: string;
 output: "preview" | "console";
 server?: ExampleManifest["server"]; requests?: ExampleManifest["requests"];
}
export interface SQLProject extends BaseProject {
 kind: "sql"; provider: "pglite"; dialect: "postgresql"; seed: string;
 entry: string; output: "results";
}
export type ResolvedProject = WebProject | SQLProject;
export interface LoadedExample { id: string; manifest: ExampleManifest; sources: Record<string,string>; solution?: Record<string,string>; seed: string; tests?: Record<string,string> }
