export const consoleFormatter = `
const originalMethods = {};
function format(value, seen = new WeakSet()) {
  if (typeof value === 'string') return value;
  if (typeof value === 'bigint') return String(value) + 'n';
  if (value === undefined) return 'undefined';
  if (value === null || typeof value !== 'object') return String(value);
  if (value instanceof Error) return value.stack || String(value);
  if (seen.has(value)) return '[Circular]';
  seen.add(value);
  let result;
  if (value instanceof Map) result = 'Map ' + format([...value], seen);
  else if (value instanceof Set) result = 'Set ' + format([...value], seen);
  else if (Array.isArray(value)) result = '[' + value.map(v => format(v, seen)).join(', ') + ']';
  else result = '{' + Object.entries(value).map(([k,v]) => k + ': ' + format(v, seen)).join(', ') + '}';
  seen.delete(value);
  return result;
}
for (const method of ['log', 'info', 'warn', 'error', 'debug']) {
  originalMethods[method] = console[method].bind(console);
  console[method] = (...args) => originalMethods[method](args.map(v => format(v)).join(' '));
}
`;

