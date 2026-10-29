import validate from "./manifest-validator.generated";
import type { ExampleManifest } from "./types";
import { normalizePath } from "./resolve";
import { validateValue } from "./sql/compare";
export function validateManifest(input: unknown): asserts input is ExampleManifest {
 const validator = validate as typeof validate & {errors: {instancePath:string;message:string}[]};
 if (!validator(input)) throw new Error(validator.errors.map((e: {instancePath:string;message:string})=>`${e.instancePath || "/"}: ${e.message}`).join("; "));
 const manifest=input as ExampleManifest;
 for (const map of [manifest.sources,manifest.solutionSources,manifest.checks?.sources,manifest.verification?.rejectedSources]) {
 const paths=new Set<string>();
 for(const [virtual,source] of Object.entries(map ?? {})) {
 const path=normalizePath(virtual);if(paths.has(path))throw new Error("Duplicate normalized source path: "+path);paths.add(path);
 normalizePath(source);if(source.startsWith("/") || source.split("/").some(p=>p.startsWith(".") || ["node_modules","dist","build","coverage","bun.lock","package-lock.json"].includes(p)))throw new Error("Source references must be relative non-hidden files.");
 }
 }
 for(const c of manifest.checks?.cases ?? [])for(const row of c.rows)for(const value of row)validateValue(value);
 if (manifest.solutionRemoveFiles && !manifest.solutionSources) throw new Error("solutionRemoveFiles requires solutionSources.");
 if (manifest.verification?.starterChecks && !manifest.checks) throw new Error("starterChecks requires checks.");
 for(const step of manifest.verification?.steps ?? []) {
 if(step.action==="http" && (!manifest.server || !step.request || step.status===undefined))throw new Error("HTTP steps require server, request, and expected status.");
 if(step.action==="checks" && !step.outcome)throw new Error("Check verification steps require outcome.");
 if(step.action==="click" && (!step.role || !step.name))throw new Error("Click steps require role and accessible name.");
 if(["console","preview","sql"].includes(step.action) && !step.text)throw new Error("Output verification steps require text.");
 }
}
