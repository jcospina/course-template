const values: string[] = [];
export function push(value: string) { values.push(value); }
export function pop() { return values[values.length - 1]; }
