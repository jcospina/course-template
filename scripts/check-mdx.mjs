// Compile MDX files in isolation to catch syntax/escaping errors fast,
// without a whole-project build. Usage:
//   bun scripts/check-mdx.mjs [glob-or-path ...]
// With no args, checks every lesson under src/lessons.
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { readFile } from "node:fs/promises";
import { glob } from "node:fs/promises";

const args = process.argv.slice(2);
const patterns = args.length ? args : ["src/lessons/**/*.mdx"];

async function expand(patterns) {
  const out = new Set();
  for (const p of patterns) {
    if (p.includes("*")) {
      for await (const f of glob(p)) out.add(f);
    } else {
      out.add(p);
    }
  }
  return [...out].sort();
}

const files = await expand(patterns);
let ok = 0;
const failures = [];

for (const file of files) {
  try {
    const source = await readFile(file, "utf8");
    await compile(source, {
      providerImportSource: "@mdx-js/react",
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    });
    ok++;
  } catch (err) {
    failures.push({ file, message: err?.message ?? String(err) });
  }
}

console.log(`\nMDX check: ${ok}/${files.length} compiled cleanly.`);
if (failures.length) {
  console.log(`\n${failures.length} FAILED:\n`);
  for (const f of failures) {
    console.log(`✗ ${f.file}`);
    console.log(`  ${f.message.split("\n")[0]}`);
    const line = f.message.split("\n").find((l) => /\d+:\d+/.test(l));
    if (line && line !== f.message.split("\n")[0]) console.log(`  ${line.trim()}`);
    console.log("");
  }
  process.exit(1);
}
