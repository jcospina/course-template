# Build a complete local course

A learner supplies a natural-language request. Build a complete, runnable course
in this clone. Supply the curriculum, explanations, examples, exercises,
feedback, solutions, validation, and local startup.

## Read and research before authoring

Read `README.md`, `docs/authoring-guide.md`, `docs/pedagogy.md`, and
`docs/course-playbook.md` before authoring. Read and follow
[docs/prose-guidance.md](docs/prose-guidance.md) for all writing, including
lessons, documentation, instructions, and feedback. Apply its editing loop
before delivering written work.

Inspect existing lessons and respect
the requested language, framework, scope, and depth. State reasonable
prerequisites and add bridge material when prior knowledge is unspecified.
Ask only when an answer materially prevents satisfying the request.

Before building the curriculum and examples, check changing claims against
current official documentation and primary sources. Match API guidance to the
versions the course will run. Follow the authoring guide's research step, record
sources and unresolved limits, and review the pedagogy research. Link sources
beside the lesson claims they support.

## Choose the course files and runtime

Use one course per clone. Edit `src/course.config.ts`, `src/curriculum/data.ts`,
`src/lessons/`, and `examples/`. Supported topics require no shared runtime edits.
Give the course a distinct `storagePrefix`. Set `playground.defaultPreset` when
the course needs a different default. TypeScript is the default for new examples.
Use explicit presets for mixed courses.

Run `mise exec -- bun run presets --json` to inspect exact versions, capabilities,
and limitations. Experimental means execution has not passed the full
compatibility contract. Promise only capabilities described in the
[README runtime compatibility note](README.md#runtime-compatibility) and preset catalog. SQL means PostgreSQL; do not silently substitute it
for a requested MySQL or SQLite course. Nodebox is a browser runtime, not the
learner's native Node installation. Native modules and external raw sockets
are outside its supported scope.

## Supply the lessons and examples

Generate ordinary example files with
`mise exec -- bun run example:new --preset typescript --id stacks/push`.
Use literal `<Playground example="stacks/push" />` or `<CodeExercise example="..."
prompt="...">walkthrough</CodeExercise>` references. Keep executable source outside
`src/`. Use the manifest schema at `schemas/example.schema.json`. Write substantive
lessons, examples, canonical solutions, and plausible rejected repairs. Supply
these technical assets yourself.

Use exact npm versions. Preserve authored source and distinguish execution,
semantic diagnostics, and behavioral feedback. Passing authored cases does not
establish mastery. Keep completion marks independent of checks.

## Validate and deliver the local course

Use Bun through mise (`mise trust`, `mise install`, then
`mise exec -- bun install --frozen-lockfile`). Validate with
`mise exec -- bun run validate:course --json`, then
`mise exec -- bun run verify:course`. Verify exercises' starter, solution, and
rejected repair. Verify observable output for worked examples. Browser execution
requires installed Chrome and network access to Sandpack. Dynamic or inline MDX
programs need explicit browser evidence; syntax compilation alone is insufficient.
Use `--publication` with validate:course for a finished course with no drafts.

Start or reuse `mise exec -- bun run dev`. Inspect the learner flow locally and
give the learner the working local address. Check both themes, keyboard access,
and narrow layouts. Deliver the complete promised course. An outline or
placeholders satisfy the request only when the learner asked for that stage.
Hosting, accounts, and a course-generation service are outside this local workflow.
