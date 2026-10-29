import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { PlaygroundProps, SQLProject } from "../types";
import { fileText, snapshotIdentity } from "../resolve";
import { displayValue, type CheckVerdict, type SQLResult } from "./compare";
import { acquireStartup } from "../startupQueue";
import SQLEditor from "./SQLEditor";
export default function SQLWorkspace({project,title=project.id === "inline" ? "Try it yourself" : project.id,layout="row",editorHeight=360,readOnly=false}: PlaygroundProps & {project:SQLProject}) {
 const [sources,setSources]=useState(()=>Object.fromEntries(Object.entries(project.authoredFiles).map(([p,f])=>[p,fileText(f)])));
 const [active,setActive]=useState(project.activeFile);
 const [status,setStatus]=useState("Ready when you are"); const [results,setResults]=useState<SQLResult[]>();
 const [verdicts,setVerdicts]=useState<CheckVerdict[]>(); const [error,setError]=useState("");
 const [captured,setCaptured]=useState<string>();const [checked,setChecked]=useState<string>();const [busy,setBusy]=useState(false);
 const release=useRef<()=>void>();const controller=useRef<AbortController>();
 const worker=useRef<Worker>();const timer=useRef<ReturnType<typeof setTimeout>>();const runId=useRef(0);const instanceId=useRef(crypto.randomUUID());
 const identity=snapshotIdentity({sources,seed:project.seed,checks:project.checks,preset:project.preset,revision:project.revision});
 function dispose(){controller.current?.abort();release.current?.();release.current=undefined;runId.current++;worker.current?.terminate();worker.current=undefined;clearTimeout(timer.current);}
 useEffect(()=>()=>dispose(),[]);
 async function execute(check=false) {
 dispose();const id=runId.current;setBusy(true);setError("");setStatus(check ? "Checking solution…" : "Starting PostgreSQL…");
 if(check){setChecked(identity);setVerdicts(undefined);}else{setCaptured(identity);setResults(undefined);}
 try {
 const abort=new AbortController();controller.current=abort;
 const unlock=await acquireStartup(abort.signal,()=>setStatus("Queued. Waiting for another runtime to start."));
 if(id!==runId.current){unlock();return;}release.current=unlock;
 const next=new Worker(new URL("./sql.worker.ts",import.meta.url),{type:"module"});worker.current=next;
 const finish=()=>{release.current?.();release.current=undefined;next.terminate();clearTimeout(timer.current);if(worker.current===next)worker.current=undefined;setBusy(false);};
 next.onmessage=({data})=>{
 if(id!==runId.current || data.runId!==id || data.instanceId!==instanceId.current || worker.current!==next)return;
 if(data.kind==="error"){setError(data.message);setStatus("Failed. Repair the query and retry.");}
 else if(data.kind==="checks"){setVerdicts(data.verdicts);setStatus("Checks complete.");}
 else{setResults(data.results);setStatus("Complete. Each Run starts from the seed.");}
 finish();
 };
 next.onerror=(event)=>{if(id!==runId.current)return;setError(event.message || "PostgreSQL worker could not load.");setStatus("Failed to load PostgreSQL. Retry Run.");finish();};
 timer.current=setTimeout(()=>{if(id!==runId.current)return;dispose();setBusy(false);setError("Execution timed out after 30 seconds.");setStatus("Timed out. Try a smaller query.");},30000);
 next.postMessage({runId:id,instanceId:instanceId.current,query:sources[project.entry],seed:project.seed,checks:check ? project.checks : undefined});
 }catch(e){if(id!==runId.current)return;dispose();setBusy(false);setError(String(e));setStatus("Could not start PostgreSQL.");}
 }
 const stale=captured!==undefined && captured!==identity;
 return <section className="playground" aria-label={title} data-layout={layout} style={{"--editor-height":Math.max(editorHeight,240)+"px"} as CSSProperties} onKeyDown={event=>{if((event.ctrlKey||event.metaKey)&&event.key==="Enter"){event.preventDefault();execute();}}}>
 <header className="playground__toolbar"><div><strong>{title}</strong><span className="playground__language">PostgreSQL</span></div><div className="playground__actions">
 <button type="button" className="playground__run" onClick={()=>execute()}>Run code</button>
 <button type="button" disabled={!busy} onClick={()=>{dispose();setBusy(false);setStatus("Stopped. Your query is still here.");}}>Stop</button>
 <button type="button" onClick={()=>{dispose();setBusy(false);setSources(Object.fromEntries(Object.entries(project.authoredFiles).map(([p,f])=>[p,fileText(f)])));setResults(undefined);setVerdicts(undefined);setCaptured(undefined);setChecked(undefined);setError("");setStatus("Starter restored. Ready to run.");}}>Reset code</button></div></header>
 <div className="playground__status" role="status">{stale ? "Code changed. Run to see the result." : status} <span>Fresh seed on every Run · Ctrl / ⌘ + Enter to run · Esc, then Tab to leave</span></div>
 <div className="playground__panels"><div className="playground__code" aria-label="Code editor">
 <div className="sql-tabs" role="tablist" aria-label="SQL source files">{project.visibleFiles.map(p=><button key={p} type="button" role="tab" aria-selected={active===p} onClick={()=>setActive(p)}>{p}</button>)}</div>
 <SQLEditor code={sources[active]} readOnly={readOnly || (typeof project.files[active]!=="string" && !!project.files[active].readOnly)} onChange={code=>setSources(s=>({...s,[active]:code}))}/></div>
 <div className="playground__output" aria-label="SQL results"><div className="playground__panel-label">Results</div>
 {error && <pre className="playground__notice" role="alert">{error}</pre>}
 {results?.length===0 && <p>No statement results were returned.</p>}
 {results ? results.map((r,i)=><div className="sql-result" key={i}><p>Statement {i+1}: {r.columns.length ? `${r.totalRows} rows` : `${r.affectedRows} affected rows`}</p>{r.columns.length>0 && <div className="sql-table-scroll"><table><thead><tr>{r.columns.map((c,j)=><th key={j} scope="col">{c}</th>)}</tr></thead><tbody>{r.rows.map((row,j)=><tr key={j}>{row.map((v,k)=><td key={k} className={v===null ? "sql-null" : undefined}>{displayValue(v).slice(0,2000)}{displayValue(v).length>2000 ? "… [cell truncated]" : ""}</td>)}</tr>)}</tbody></table>{r.totalRows===0 && <p>Empty result set.</p>}{r.totalRows>r.rows.length && <p>Showing {r.rows.length} of {r.totalRows} rows.</p>}</div>}</div>) : <p className="playground__empty">Run the query to see tables or errors here.</p>}
 </div></div>
 {project.checks && <div className="playground__checks" role="group" aria-label="Behavior checks"><button type="button" onClick={()=>execute(true)}>Check solution</button><span role="status">{checked!==undefined && checked!==identity ? "Code changed. Run checks again." : verdicts ? `${verdicts.filter(v=>v.passed).length} passed, ${verdicts.filter(v=>!v.passed).length} failed.` : "Check the result before revealing the solution."}</span>{verdicts && <ul>{verdicts.map(v=><li key={v.name}>{v.passed ? "Passed" : "Failed"}: {v.name} — {v.message}</li>)}</ul>}</div>}
 </section>;
}
