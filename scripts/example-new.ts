import { mkdir, writeFile, realpath } from "node:fs/promises";
import { dirname, relative } from "node:path";
import { presets } from "../src/components/ui/playground/presets";
import { normalizePath } from "../src/components/ui/playground/resolve";
const args=process.argv.slice(2);const flag=(name:string)=>args[args.indexOf(name)+1];
try {
 const id=flag("--id"),key=flag("--preset");
 if(!args.includes("--id") || !args.includes("--preset") || !id || !key)throw new Error("Usage: bun run example:new --preset typescript --id algorithms/stack");
 normalizePath(id);if(id.startsWith("/") || id.split("/").some(p=>p.startsWith(".")))throw new Error("ID must be a relative non-hidden directory.");
 const preset=presets[key as keyof typeof presets];if(!preset)throw new Error("Unknown preset. Run bun run presets.");
 const directory="examples/"+id;await mkdir(dirname(directory),{recursive:true});
 const root=await realpath("examples"),parent=await realpath(dirname(directory));if(relative(root,parent).startsWith(".."))throw new Error("Example parent escapes examples root.");
 await mkdir(directory,{recursive:false});
 const file="files"+preset.instructionalFile;
 await mkdir(directory+"/"+file.slice(0,file.lastIndexOf("/")),{recursive:true});await writeFile(directory+"/"+file,preset.starter+"\n");
 await writeFile(directory+"/example.json",JSON.stringify({schemaVersion:1,preset:key,title:id,sources:{[preset.instructionalFile]:file}},null,2)+"\n");
 console.log(`Created ${directory}. Add a verification recipe and reference it with <Playground example="${id}" />.`);
}catch(error){console.error(String(error));process.exitCode=1;}
