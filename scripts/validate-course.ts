import { readFile, access } from "node:fs/promises";
import { PARTS } from "../src/curriculum/data";
import { course } from "../src/course.config";
import { presets } from "../src/components/ui/playground/presets";
import { resolveProject, normalizePath } from "../src/components/ui/playground/resolve";
import { walk, readExample, parseMDX, visit, literal, type Issue } from "./course-lib";
export async function validateCourse() {
 const issues:Issue[]=[];const references=new Set<string>();
 const issue=(code:string,file:string,message:string,extra:Partial<Issue>={})=>issues.push({code,file,message,suggestion:"See docs/authoring-guide.md; repair the named property or source.",severity:"error",...extra});
 if(!course.storagePrefix?.trim() || !course.brandName?.trim())issue("COURSE_CONFIG","src/course.config.ts","Set brandName and a distinct storagePrefix.");
 if(course.playground?.defaultPreset && !presets[course.playground.defaultPreset as keyof typeof presets])issue("DEFAULT_PRESET","src/course.config.ts","Choose a built-in default preset.");
 const slugs=new Set<string>(),parts=new Set<string>(),paths=new Set<string>();
 for(const part of PARTS) {
 if(parts.has(part.id))issue("DUPLICATE_PART","src/curriculum/data.ts",part.id);parts.add(part.id);
 for(const lesson of part.lessons) {
 if(slugs.has(lesson.slug))issue("DUPLICATE_SLUG","src/curriculum/data.ts",lesson.slug);slugs.add(lesson.slug);
 try {normalizePath(lesson.file);}catch(e){issue("LESSON_PATH","src/curriculum/data.ts",String(e));}
 if(!lesson.file.startsWith("/src/lessons/") || !lesson.file.endsWith(".mdx"))issue("LESSON_PATH","src/curriculum/data.ts",lesson.file);
 if(paths.has(lesson.file))issue("DUPLICATE_LESSON_PATH","src/curriculum/data.ts",lesson.file);paths.add(lesson.file);
 if(!lesson.objectives.length || lesson.minutes<=0)issue("LESSON_METADATA","src/curriculum/data.ts",`Missing objectives or invalid duration: ${lesson.slug}`);
 }
 }
 if(course.hero.ghostCtaSlug && !slugs.has(course.hero.ghostCtaSlug))issue("BROKEN_HERO_LINK","src/course.config.ts",course.hero.ghostCtaSlug);
 const teaching:Record<string,string[]>= {
 Playground:["example","preset","code","files","template","dependencies","layout","editorHeight","showPreview","showConsole","showTabs","readOnly","tests","typecheck","title"],
 CodeExercise:["example","preset","buggy","files","template","dependencies","layout","editorHeight","showPreview","showConsole","showTabs","readOnly","tests","typecheck","title","prompt","difficulty","solution","solutionLang","hint"],
 Lead:[],Callout:["variant","title"],Predict:["question","cta"],Quiz:["question","choices"],Exercise:["prompt","title","difficulty"],Figure:["caption","label"],KeyTakeaways:[],Term:[]
 };
 for(const part of PARTS)for(const lesson of part.lessons) {
 const file=lesson.file.slice(1);let source:string;
 try{source=await readFile(file,"utf8");}catch{issue("DRAFT_LESSON",file,"Intentional draft: no lesson file.",{lesson:lesson.slug,severity:process.argv.includes("--publication")?"error":"warning"});continue;}
 try{
 visit(parseMDX(source),node=>{
 const extra={lesson:lesson.slug,line:node.position?.start.line};
 if(node.type==="link" && node.url.startsWith("/learn/") && !slugs.has(node.url.slice(7)))issue("BROKEN_LINK",file,node.url,extra);
 if(!node.type?.startsWith("mdxJsx") || !node.name)return;
 if(!teaching[node.name]){if(/^[A-Z]/.test(node.name))issue("UNKNOWN_COMPONENT",file,`Unknown teaching component ${node.name}; import a custom component explicitly or correct its name.`,{...extra,severity:source.includes("import ") ? "warning" : "error"});return;}
 const props:Record<string,any>={};let dynamic=false;
 for(const attr of node.attributes ?? []) {
 if(attr.type!=="mdxJsxAttribute"){dynamic=true;continue;}
 if(!teaching[node.name].includes(attr.name))issue("UNKNOWN_PROP",file,`${node.name}.${attr.name}`,extra);
 try{props[attr.name]=literal(attr);}catch{dynamic=true;}
 }
 if(dynamic)issue("DYNAMIC_MDX",file,"An expression cannot be statically validated; verify it explicitly.",{...extra,severity:"warning"});
 if(["Playground","CodeExercise"].includes(node.name)) {
 if(props.example){if(typeof props.example!=="string")issue("EXAMPLE_REFERENCE",file,"example must be a literal string.",extra);else references.add(props.example);}
 if(node.name==="CodeExercise" && !props.example && props.solution===undefined)issue("EXERCISE_SOLUTION",file,"Supply solution or example.solutionSources.",extra);
 if(!dynamic){try{const {buggy,...input}=props;if(!input.example && !input.template)resolveProject({...input,code:buggy ?? input.code},course.playground?.defaultPreset);if(input.example && ["preset","buggy","files","dependencies","tests","template","code"].some(k=>props[k]!==undefined))throw new Error("example cannot be combined with starter/runtime props.");}catch(e){issue("PLAYGROUND_PROPS",file,String(e),extra);}}
 if(!props.example)issue("INLINE_UNVERIFIED",file,"Inline execution requires explicit browser evidence.",{...extra,severity:"warning"});
 }
 });
 }catch(e){issue("MDX_PARSE",file,String(e),{lesson:lesson.slug});}
 }
 const manifests=(await walk("examples")).filter(p=>p.endsWith("/example.json"));const ids=new Set(manifests.map(p=>p.slice(9,-13)));
 for(const id of ids)try{const e=await readExample(id);if(e.manifest.solutionSources)await readExample(id,"solution");if(e.manifest.verification?.rejectedSources)await readExample(id,"rejected");if(e.manifest.checks && (!e.solution || !e.manifest.verification?.rejectedSources || !e.manifest.verification.starterChecks))issue("EXERCISE_RECIPE",`examples/${id}/example.json`,"Checks require solution, rejected repair, and starterChecks.",{example:id});}catch(e){issue("EXAMPLE_INVALID",`examples/${id}/example.json`,String(e),{example:id});}
 for(const id of references)if(!ids.has(id))issue("MISSING_EXAMPLE",`examples/${id}/example.json`,"Referenced example does not exist.",{example:id});
 return {ok:!issues.some(i=>i.severity==="error"),issues,references:[...references]};
}
if(import.meta.main){const result=await validateCourse();console.log(JSON.stringify(result,null,2));if(!result.ok)process.exitCode=1;}
