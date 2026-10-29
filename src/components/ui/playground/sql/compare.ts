import type { ExampleManifest } from "../types";
import { stableStringify } from "../resolve";
export type SQLCase = NonNullable<NonNullable<ExampleManifest["checks"]>["cases"]>[number];
export type SQLValue = SQLCase["rows"][number][number];
export interface SQLResult { columns: string[]; rows: SQLValue[][]; affectedRows: number; totalRows: number; }
export interface CheckVerdict { name: string; passed: boolean; message: string; }
export function validateValue(value: SQLValue): void {
 if (typeof value === "number" && (!Number.isFinite(value) || Math.abs(value) > Number.MAX_SAFE_INTEGER)) throw new Error("Unsafe SQL number; use a tagged decimal or bigint.");
 if (value && typeof value === "object") {
 if (!["bigint","decimal","date"].includes(value.type) || typeof value.value !== "string") throw new Error("Unsupported SQL expectation value; use a scalar or tagged bigint, decimal, or date.");
 if (value.type === "bigint" && !/^-?\d+$/.test(value.value)) throw new Error("Invalid tagged bigint.");
 if (value.type === "decimal" && !/^[+-]?\d+(?:\.\d+)?(?:e[+-]?\d+)?$/i.test(value.value)) throw new Error("Invalid tagged decimal.");
 if (value.type === "date" && !/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(value.value)) throw new Error("Invalid tagged date. Use ISO format.");
 }
}
function key(value: SQLValue): unknown {
 validateValue(value);
 if (value && typeof value === "object" && value.type === "bigint") return {type:"bigint",value:BigInt(value.value).toString()};
 if (value && typeof value === "object" && value.type === "decimal") {
 const [mantissa,exp] = value.value.toLowerCase().split("e");
 const negative = mantissa.startsWith("-"); const clean = mantissa.replace(/^[+-]/,"");
 const [whole,fraction=""] = clean.split("."); let digits = (whole + fraction).replace(/^0+/,"") || "0";
 let power = BigInt(exp ?? 0)-BigInt(fraction.length);
 while(digits.length>1 && digits.endsWith("0")) { digits=digits.slice(0,-1);power++; }
 return {type:"decimal",value:(negative && digits !== "0" ? "-" : "")+digits+"e"+(digits === "0" ? 0 : power)};
 }
 return value;
}
export function compareSQL(result: SQLResult | undefined, expected: SQLCase): CheckVerdict {
 if (!result) throw new Error(`Missing result statement for ${expected.name}.`);
 const serialize = (rows: SQLValue[][]) => rows.map(row => stableStringify(row.map(key)));
 const actual = serialize(result.rows); const wanted = serialize(expected.rows);
 if (!expected.ordered) {actual.sort();wanted.sort();}
 const passed = stableStringify(result.columns) === stableStringify(expected.columns) && stableStringify(actual) === stableStringify(wanted);
 return {name:expected.name,passed,message:passed ? "Matched columns and typed rows." : "Columns or rows differ from the expected result."};
}
export function displayValue(value: SQLValue): string {
 if (value === null) return "NULL";
 return typeof value === "object" ? (["bigint","decimal","date"].includes(value.type) ? value.value : stableStringify(value)) : String(value);
}
