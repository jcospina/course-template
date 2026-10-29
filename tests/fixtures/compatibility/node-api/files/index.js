const http = require('http');
http.createServer((req,res) => { res.setHeader('Content-Type','application/json'); res.end(JSON.stringify({greeting:'Hi'})); }).listen(3000);
