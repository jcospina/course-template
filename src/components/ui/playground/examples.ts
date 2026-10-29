import type { ExampleManifest, LoadedExample } from "./types";
import { validateManifest } from "./validate";
import { normalizePath } from "./resolve";
const metadata = import.meta.glob<ExampleManifest>(["/examples/**/example.json","/tests/fixtures/compatibility/**/example.json"], {eager:true, import:"default"});
const raw = import.meta.glob<string>(["/tests/fixtures/compatibility/**/*", "!/tests/fixtures/compatibility/**/example.json", "/examples/**/*", "!/examples/**/example.json", "!/examples/**/node_modules/**", "!/examples/**/dist/**", "!/examples/**/.*/**", "!/examples/**/coverage/**", "!/examples/**/build/**", "!/examples/**/bun.lock", "!/examples/**/package-lock.json"], {query:"?raw",import:"default"});
export const exampleIds = Object.keys(metadata).filter(p => p.startsWith("/examples/")).map(p => p.slice("/examples/".length,-"/example.json".length));
export async function loadExample(id: string, variant: "starter" | "solution" | "rejected" = "starter"): Promise<LoadedExample> {
 const directory = id.startsWith("__fixtures/") ? "/tests/fixtures/compatibility" + normalizePath(id.slice(11)) : "/examples" + normalizePath(id);
 const manifest = metadata[directory + "/example.json"];
 if (!manifest) throw new Error(`Example ${id} was not found. Create examples/${id}/example.json and refresh the dev server.`);
 validateManifest(manifest);
 const read = async (path: string) => { const loader = raw[directory + normalizePath(path)]; if (!loader) throw new Error(`Example ${id}: missing source ${path}.`); return loader(); };
 const map = async (sources?: Record<string,string>) => sources ? Object.fromEntries(await Promise.all(Object.entries(sources).map(async ([virtual,path]) => [normalizePath(virtual),await read(path)]))) : undefined;
 const [sources,solution,seed,tests] = await Promise.all([map(manifest.sources),map(manifest.solutionSources),manifest.database ? read(manifest.database.seed) : Promise.resolve(""),map(manifest.checks?.sources)]);
 let attempt = sources!;
 if(variant === "solution") {if(!solution)throw new Error("No solution overlay.");attempt = {...attempt,...solution};for(const p of manifest.solutionRemoveFiles ?? [])delete attempt[normalizePath(p)];}
 if(variant === "rejected") {if(!manifest.verification?.rejectedSources)throw new Error("No rejected repair.");attempt = {...attempt,...await map(manifest.verification.rejectedSources)};}
 return {id,manifest:variant === "solution" ? {...manifest,solutionRemoveFiles:undefined} : manifest,sources:attempt,solution,seed,tests};
}
