const values: string[] = [];let head = 0;
const enqueue=(value:string)=>values.push(value);
const dequeue=()=>head < values.length ? values[head++] : undefined;
enqueue("A");enqueue("B");console.log(dequeue(),dequeue(),dequeue());
