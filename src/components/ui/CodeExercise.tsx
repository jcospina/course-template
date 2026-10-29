import { useEffect, useState, type ReactNode } from "react";
import type { PlaygroundProps } from "./playground/types";
import { loadExample } from "./playground/examples";
import { presets } from "./playground/presets";
import { resolveProject } from "./playground/resolve";
import Playground from "./Playground";
import { StaticCode } from "./CodeBlock";
export interface CodeExerciseProps extends Omit<PlaygroundProps,"code" | "title"> {
 title?: string; prompt: ReactNode; difficulty?: "warm-up" | "core" | "stretch";
 buggy?: string; solution?: string; solutionLang?: string; children: ReactNode; hint?: string;
}
export default function CodeExercise({title="Your turn",prompt,difficulty,buggy,solution,solutionLang,children,hint="Fix it in the editor, run it, then reveal the solution to compare.",...props}: CodeExerciseProps) {
 const [open,setOpen]=useState(false);const [solutions,setSolutions]=useState<Record<string,string>>();const [error,setError]=useState("");const [active,setActive]=useState("");
 useEffect(()=>{
 if(!open || !props.example)return;
 let mounted=true;
 loadExample(props.example).then(e=>resolveProject({example:props.example},undefined,e)).then(p=>{if(mounted){if(!p.solution)throw new Error("This exercise has no solutionSources.");setSolutions(p.solution);setActive(Object.keys(p.solution)[0]);}}).catch(e=>{if(mounted)setError(String(e));});
 return()=>{mounted=false;};
 },[open,props.example]);
 const lang = solutionLang ?? (active.split(".").pop() || ((props.preset && props.preset !== "custom-web" ? presets[props.preset].instructionalFile.split(".").pop() : props.template ? "tsx" : "ts")));
 return <section className="exercise exercise--code"><header className="exercise__head"><span className="exercise__badge">{title}</span>{difficulty && <span className={`exercise__diff exercise__diff--${difficulty}`}>{difficulty}</span>}<span className="exercise__hint">{hint}</span></header>
 <div className="exercise__prompt">{prompt}</div><div className="exercise__editor"><Playground {...props} code={buggy} editorHeight={props.editorHeight ?? 320}/></div>
 <button type="button" className="exercise__toggle" onClick={()=>setOpen(o=>!o)} aria-expanded={open}>{open ? "Hide solution" : "Reveal solution & walkthrough"}</button>
 {open && <div className="exercise__solution">{error && <p role="alert">{error}</p>}{solutions ? <><div className="sql-tabs" role="tablist" aria-label="Solution files">{Object.keys(solutions).map(path=><button type="button" role="tab" aria-selected={active===path} key={path} onClick={()=>setActive(path)}>{path}</button>)}</div><StaticCode code={solutions[active]} lang={lang} label={active}/></> : solution!==undefined ? <StaticCode code={solution} lang={lang} label="solution"/> : props.example ? <p role="status">Loading solution…</p> : <p role="alert">This exercise has no solution.</p>}{children}</div>}
 </section>;
}
