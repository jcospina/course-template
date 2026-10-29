import { PGlite, types } from "@electric-sql/pglite";
import wasmURL from "/node_modules/@electric-sql/pglite/dist/pglite.wasm?url";
import initdbURL from "/node_modules/@electric-sql/pglite/dist/initdb.wasm?url";
import dataURL from "/node_modules/@electric-sql/pglite/dist/pglite.data?url";
import { compareSQL, type SQLCase, type SQLResult, type SQLValue } from "./compare";
interface Request { runId: number; instanceId: string; query: string; seed: string; checks?: {kind: "sql-result" | "sql-state"; cases: SQLCase[]} }
async function database(seed: string) {
 const [wasm,initdb,bundle] = await Promise.all([fetch(wasmURL).then(r => r.arrayBuffer()),fetch(initdbURL).then(r => r.arrayBuffer()),fetch(dataURL).then(r => r.blob())]);
 const pg = await PGlite.create({dataDir:"memory://",pgliteWasmModule:await WebAssembly.compile(wasm),initdbWasmModule:await WebAssembly.compile(initdb),fsBundle:bundle,parsers:{
 [types.NUMERIC]:(v:string) => ({type:"decimal",value:v}),
 [types.INT8]:(v:string) => ({type:"bigint",value:v}),
 [types.DATE]:(v:string) => ({type:"date",value:v}),
 [types.TIMESTAMP]:(v:string) => ({type:"date",value:v.replace(" ","T")}),
 [types.TIMESTAMPTZ]:(v:string) => ({type:"date",value:new Date(v).toISOString()}),
 }});
 try { if(seed) await pg.exec(seed); return pg; } catch(error) {await pg.close();throw new Error("Seed initialization failed: " + String(error));}
}
function encode(result: {fields: {name:string}[];rows: unknown[];affectedRows?:number}): SQLResult {
 return {columns:result.fields.map(f => f.name),rows:result.rows as SQLValue[][],affectedRows:result.affectedRows ?? 0,totalRows:result.rows.length};
}
self.onmessage = async ({data}: MessageEvent<Request>) => {
 const tag = {runId:data.runId,instanceId:data.instanceId};
 try {
 if (data.checks) {
 const verdicts = [];
 for (const c of data.checks.cases) {
 const pg = await database(data.seed);
 try {
 const results = await pg.exec(data.query,{rowMode:"array"});
 let result: SQLResult | undefined;
 if (data.checks.kind === "sql-result") result = results[c.statement! ] ? encode(results[c.statement!]) : undefined;
 else {
 await pg.exec("BEGIN READ ONLY; SET TRANSACTION READ ONLY;");
 try { result = encode(await pg.query(c.query!,[],{rowMode:"array"})); } finally {await pg.exec("ROLLBACK");}
 }
 verdicts.push(compareSQL(result,c));
 } finally {await pg.close();}
 }
 self.postMessage({...tag,kind:"checks",verdicts});
 } else {
 const pg = await database(data.seed);
 try { const results = (await pg.exec(data.query,{rowMode:"array"})).map(encode); self.postMessage({...tag,kind:"results",results:results.map(r => ({...r,rows:r.rows.slice(0,200)}))}); } finally {await pg.close();}
 }
 } catch(error) {self.postMessage({...tag,kind:"error",message:error instanceof Error ? error.message : String(error)});}
};
