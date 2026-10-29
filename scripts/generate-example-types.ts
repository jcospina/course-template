import { compileFromFile } from "json-schema-to-typescript";
import Ajv from "ajv";
import { unlink } from "node:fs/promises";
import standalone from "ajv/dist/standalone";
const schema = await Bun.file("schemas/example.schema.json").json();
const compiler = new Ajv({allowUnionTypes:true,allErrors:true,code:{source:true,esm:true}});
const validate = compiler.compile(schema);
const temporary = "scripts/.manifest-validator.js";
await Bun.write(temporary, standalone(compiler,validate));
try {
 const bundle = await Bun.build({entrypoints:[temporary],target:"browser",format:"esm",minify:true});
 if(!bundle.success)throw new Error(String(bundle.logs));
 await Bun.write("src/components/ui/playground/manifest-validator.generated.ts", "// @ts-nocheck\n/* Generated from schemas/example.schema.json. */\n" + await bundle.outputs[0].text());
} finally {await unlink(temporary);}
await Bun.write("src/components/ui/playground/manifest.generated.ts", await compileFromFile("schemas/example.schema.json", { bannerComment: "/* Generated from schemas/example.schema.json. Run bun run schema:types. */", additionalProperties: false }));
