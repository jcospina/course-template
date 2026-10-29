const {total}=require("./index");
module.exports=({test,assert})=>{test("quantity zero",()=>assert.strictEqual(total(10,0),0));test("multiple units",async()=>assert.strictEqual(await Promise.resolve(total(5,3)),15));test("signed arithmetic",()=>assert.strictEqual(total(-2,3),-6));};
