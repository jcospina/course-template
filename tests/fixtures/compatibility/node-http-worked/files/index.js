const http=require("node:http");const {reply}=require("./reply");http.createServer(reply).listen(3000);
