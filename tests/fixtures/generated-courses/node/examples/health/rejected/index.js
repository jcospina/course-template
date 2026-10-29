const http=require("node:http");http.createServer((req,res)=>{res.setHeader("content-type","application/json");res.end("{\"ok\":true}");}).listen(3000);
