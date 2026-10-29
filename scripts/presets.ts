import { presets } from "../src/components/ui/playground/presets";
const metadata=Object.values(presets).map(({scaffold,starter,...p})=>p);
if(process.argv.includes("--json")) console.log(JSON.stringify(metadata,null,2));
else for(const p of metadata) console.log(`${p.id.padEnd(14)} ${p.status.padEnd(12)} ${p.output} | checks: ${p.capabilities.behaviorCheck || "unavailable"}; types: ${p.capabilities.semanticCheck || "unavailable"}\n  ${p.limitations.join("; ")}`);
