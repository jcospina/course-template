/** A reserved response inside the sandbox supplies same-origin HTTP requests.
 * Parent code never fetches localhost or an authored port. */
export const bridgeHTML = `<!doctype html><html><body><script>
window.addEventListener('message', async event => {
 if (event.source !== parent || event.data?.type !== '__course_request') return;
 const { id, input } = event.data;
 try {
 const target = new URL(input.path, location.href);
 if (target.origin !== location.origin) throw Error('Request must stay inside the sandbox');
 const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 8000);
 try {
 const headers = {...input.headers};
 // Nodebox's server bridge stalls on fetch body streams. Buffer text into a
 // reserved transport header, then reconstruct a Node readable at the handler.
 if(!['GET','HEAD'].includes(input.method) && input.body) {
  const bytes = new TextEncoder().encode(input.body);
  if(bytes.length > 4096) throw Error('Text request bodies are limited to 4096 UTF-8 bytes by this browser bridge');
  headers['x-course-body'] = btoa(Array.from(bytes,byte=>String.fromCharCode(byte)).join(''));
 }
 const response = await fetch(target, {method:input.method,headers,signal:controller.signal});
 parent.postMessage({type:'__course_http',id,response:{status:response.status,headers:Object.fromEntries(response.headers),body:await response.text()}},event.origin);
 } finally { clearTimeout(timer); }
 } catch(error) { parent.postMessage({type:'__course_http',id,error:String(error)},event.origin); }
});
parent.postMessage({type:'__course_bridge_ready'},'*');
</script></body></html>`;
export function serverBootstrap(entry: string, sources: Record<string,string>): string {
 return `const http = require('http');
const path = require('path');
const originalRequire = require;
const sourceFiles = ${JSON.stringify(sources)};
const bridge = ${JSON.stringify(bridgeHTML)};
const serverHTTP = {...http, createServer(...args) {
 const callback = args.findIndex(arg => typeof arg === 'function');
 function intercept(listener) { return function(req,res) {
  if(req.url === '/__course_bridge') {res.setHeader('Content-Type','text/html; charset=utf-8');res.end(bridge);return;}
  const encoded = req.headers['x-course-body'];
  if(encoded) {
   const payload=require('buffer').Buffer.from(encoded,'base64');
   const headers={...req.headers,'content-length':String(payload.length)};delete headers['x-course-body'];
   const incoming=new (require('stream').PassThrough)();
   Object.assign(incoming,{method:req.method,url:req.url,headers,httpVersion:req.httpVersion,socket:req.socket,connection:req.connection});
   process.nextTick(()=>incoming.end(payload));
   return listener.call(this,incoming,res);
  }
  return listener.call(this,req,res);
 };}
 if(callback >= 0)args[callback] = intercept(args[callback]);
 const server = http.createServer(...args);
 const on = server.on;
 server.on = function(event,listener) {return on.call(this,event,event === 'request' ? intercept(listener) : listener);};
 return server;
}};
const cache = {};
function load(filename) {
 if(cache[filename])return cache[filename].exports;
 const source=sourceFiles[filename];if(source===undefined)throw Error('Missing source module: '+filename);
 if(filename.endsWith('.json'))return JSON.parse(source);
 const module = {exports:{}};cache[filename]=module;
 function sourceRequire(specifier) {
  if(specifier === 'http' || specifier === 'node:http')return serverHTTP;
  if(!specifier.startsWith('.'))return originalRequire(specifier);
  const base=path.resolve(path.dirname(filename),specifier);
  const resolved=[base,base+'.js',base+'.cjs',base+'.json',base+'/index.js'].find(p=>Object.prototype.hasOwnProperty.call(sourceFiles,p));
  if(!resolved)throw Error('Cannot resolve '+specifier+' from '+filename);
  return load(resolved);
 }
 new Function('require','module','exports','__dirname','__filename','process','Buffer','console',source)(sourceRequire,module,module.exports,'/nodebox'+path.dirname(filename),'/nodebox'+filename,process,require('buffer').Buffer,console);
 return module.exports;
}
load(${JSON.stringify(entry)});`;
}
