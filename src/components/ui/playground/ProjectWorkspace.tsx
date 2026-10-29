import { lazy, Suspense, useEffect, useState } from "react";
import { course } from "../../../course.config";
import { loadExample } from "./examples";
import { resolveProject, snapshotIdentity } from "./resolve";
import type { PlaygroundProps, ResolvedProject } from "./types";
const WebWorkspace = lazy(() => import("./PlaygroundWorkspace"));
const SQLWorkspace = lazy(() => import("./sql/SQLWorkspace"));
export default function ProjectWorkspace(props: PlaygroundProps) {
 const [loaded,setLoaded] = useState<{id:string;project?:ResolvedProject;error?:string}>();
 useEffect(() => {
 if (!props.example) return;
 let active = true;
 loadExample(props.example).then(example => resolveProject(props,course.playground?.defaultPreset,example)).then(project => {if(active) setLoaded({id:props.example!,project});}).catch(error => {if(active) setLoaded({id:props.example!,error:String(error)});});
 return () => {active=false;};
 },[props.example,props.code,props.files,props.preset,props.dependencies,props.tests,props.typecheck,props.showPreview]);
 if (props.template) {
 if (props.preset || props.example) throw new Error("Use either legacy template or preset/example.");
 return <WebWorkspace {...props} />;
 }
 if (props.example && loaded?.id !== props.example) return <p role="status">Loading example sources…</p>;
 if (loaded?.error && props.example) throw new Error(loaded.error);
 const project = props.example ? loaded!.project! : resolveProject(props,course.playground?.defaultPreset);
 return <Suspense fallback={<p role="status">Loading editor…</p>}>
 {project.kind === "sql" ? <SQLWorkspace key={snapshotIdentity(project)} project={project} {...props}/> : <WebWorkspace key={snapshotIdentity(project)} project={project} {...props}/>}
 </Suspense>;
}
