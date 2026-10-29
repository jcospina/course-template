const http = require('http');
http.createServer((req,res) => { res.setHeader('Content-Type','application/json'); if(req.url === '/hello') { res.end(JSON.stringify({greeting:'Hello'})); } else { res.statusCode=404; res.end(JSON.stringify({error:'Not found'})); } }).listen(3000);
