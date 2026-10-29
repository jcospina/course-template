const fs = require("node:fs");
const { Buffer } = require("node:buffer");
const { Readable } = require("node:stream");
const camelCase = require("lodash/camelCase");
const { filename } = require("./helper.cjs");
fs.writeFileSync("probe.txt", "virtual filesystem");
console.log(filename, fs.readFileSync("probe.txt", "utf8"), Buffer.from("buffer proof").toString(), camelCase("package proof"));
(async()=>{let value="";for await(const chunk of Readable.from(["stream ","proof"]))value+=chunk;console.log(value);})();
