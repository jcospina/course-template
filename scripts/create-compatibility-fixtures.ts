import { presets } from "../src/components/ui/playground/presets";
import { mkdir, writeFile } from "node:fs/promises";
for(const preset of Object.values(presets)) {
 const dir=`tests/fixtures/compatibility/${preset.id}`;const source="files"+preset.instructionalFile;
 await mkdir(dir+"/"+source.slice(0,source.lastIndexOf("/")),{recursive:true});await writeFile(dir+"/"+source,preset.starter+"\n");
 const steps=preset.output==="preview" && preset.id!=="html-css" ? [{action:"preview",text:"Count: 0"},{action:"click",role:"button",name:"Count: 0"},{action:"preview",text:"Count: 1"}] : [{action:preset.output==="results" ? "sql" : preset.output === "preview" ? "preview" : "console",text:preset.id==="node" ? "intro.js" : preset.id==="node-ts" ? "intro.ts" : preset.id === "html-css" ? "Hello HTML" : preset.id==="postgres" ? "Hello PostgreSQL" : preset.id==="typescript" ? "Hello TypeScript" : "Hello JavaScript"}];
 await writeFile(dir+"/example.json",JSON.stringify({schemaVersion:1,preset:preset.id,title:preset.id,sources:{[preset.instructionalFile]:source},verification:{steps}},null,2)+"\n");
}
