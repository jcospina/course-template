import { lazy, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { loadExample } from "../ui/playground/examples";
import { resolveProject } from "../ui/playground/resolve";
import type { ResolvedProject } from "../ui/playground/types";
const Web = lazy(()=>import("../ui/playground/PlaygroundWorkspace"));
const SQL = lazy(()=>import("../ui/playground/sql/SQLWorkspace"));
export default function ExampleVerification() {
 const [params]=useSearchParams();const id=params.get("example") ?? "";const variant=params.get("variant") ?? "starter";
 const copies=params.get("copies") === "2" ? 2 : 1;
 const [project,setProject]=useState<ResolvedProject>();const [error,setError]=useState("");
 useEffect(()=>{let active=true;setProject(undefined);setError("");loadExample(id,variant as "starter"|"solution"|"rejected").then(e=>resolveProject({example:id},undefined,e)).then(p=>{if(active)setProject(p);}).catch(e=>{if(active)setError(String(e));});return()=>{active=false;};},[id,variant]);
 return <article className="lesson"><h1>Example verification: {id}</h1>{error && <p role="alert">{error}</p>}<Suspense fallback={<p>Loading fixture…</p>}>{project && Array.from({length:copies},(_,index)=>(project.kind==="sql" ? <SQL key={id+variant+index} project={project} title={copies===1 ? "Verification example" : `Verification example ${index+1}`}/> : <Web key={id+variant+index} project={project} title={copies===1 ? "Verification example" : `Verification example ${index+1}`}/>))}</Suspense></article>;
}
