# Authoring guide

Write lessons as MDX files under `src/lessons/`. A file becomes available when
its path matches the entry in `src/curriculum/data.ts`; no registration import
is needed. Run `bun run check:mdx` while writing to catch syntax errors.

[pedagogy.md](pedagogy.md) covers activity selection, feedback, and the research
behind those choices. The sample
lessons demonstrate the components and runtime options described here.

Read and follow [prose-guidance.md](prose-guidance.md) for all writing, including
lessons, documentation, instructions, and feedback. Apply its editing loop before
delivering written work.

## Research before building the course

Before drafting the curriculum, lessons, or executable examples, identify the
claims the course depends on. Check APIs, package versions, standards, prices,
service limits, and other changing facts against current official documentation.
Use original papers for research claims. Search results and summaries can help
locate a source; read the source before using it to support a claim.

Run `mise exec -- bun run presets --json` to identify the versions and capabilities
the examples will use. Read documentation for those versions, including release
notes or migration guides when behavior has changed. If current documentation
describes a newer version, explain the relevant difference. Use exact npm versions
and check the [README runtime compatibility note](../README.md#runtime-compatibility) before promising runtime support. Official
documentation describes the library or platform; browser execution establishes
whether the example works in this template.

Keep research notes under `research/`. For each claim, record the source URL,
the relevant version or publication date, the date you checked it, and any
unresolved limits. When sources disagree, investigate the version, environment,
or assumptions behind the difference. If you cannot verify a claim, state the
limit or omit the claim. Place source links beside the claims they support in
the lesson.

Review [pedagogy.md](pedagogy.md) before choosing learning
activities. Check whether the evidence covers similar learners and tasks.
Distinguish a study's findings from the teaching choices you infer from them,
and label preprints as provisional. The
[course playbook](course-playbook.md#research-checkable-claims) connects this
research to curriculum planning. Recheck affected claims when a dependency,
example, or lesson changes, then run the examples to compare the explanation
with their actual behavior.

## Write prose that carries the explanation

These principles draw on [the prose guidance](prose-guidance.md): name the actor
and action, connect familiar information to new ideas, and use concrete language.
The guidance below is self-contained. See
[pedagogy.md](pedagogy.md#use-research-within-its-limits) for how to interpret
evidence about learning outcomes.

Write every lesson and supporting document as an authoritative description of
the current course. Replace superseded guidance in place. Omit revision dates,
change summaries, and comparisons with earlier document versions. Keep source
publication dates when they help readers assess research evidence.

Put the actor in the subject and the action in the verb. "The callback reads the
saved value" tells the reader who does what. "The retrieval of the saved value
occurs during callback execution" hides the action in nouns. Keep the subject
close to its verb so an aside does not interrupt the main thought.

Begin with information the reader has and end with the new point. If the previous
paragraph introduced a callback, use that callback to introduce the value it
captures. Do not make the reader infer a new connection at every sentence.
Each paragraph should add a reason, mechanism, example, boundary, or task.

Use concrete values, names, and actions. Define technical terms where they
become necessary and keep using the same term for the same thing. Decorative
synonyms make a mechanism harder to follow. Preserve the target lesson's local
context: a concept discussed with an author in chat is not automatically
something the reader has already learned.

### Revise the explanation, not its punctuation

An abstract explanation:

> The implementation of asynchronous scheduling facilitates the postponement
> of execution, enabling the realization of a more responsive experience.

A concrete explanation:

> `setTimeout` schedules the callback for a later task. The current code finishes
> before that callback runs, so the callback reads the value that exists then.

The concrete explanation names an API, describes the ordering, and connects it
to a result the learner can inspect. Removing a dash or shortening each sentence
would not have repaired the missing mechanism.

Keep passive voice when the affected thing is the topic or the actor does not
matter. Keep a qualification when it expresses a real limit. Short sentences
help with a difficult step; longer ones can show how two ideas depend on each
other. There is no universal word limit, paragraph size, or punctuation ban that
makes an explanation clear.

Use prose for reasoning, numbered steps for a sequence, bullets for parallel
items, and tables for comparisons with repeated fields. Do not force every
section into three bullets or give every paragraph the same length. Bold only
what helps navigation or identifies the central point.

Cut sentences that announce, praise, or repeat the explanation without adding
to it. Replace claims of importance with the concrete consequence. Avoid vague
attribution such as "experts say"; name and link the source. Avoid a manufactured
contrast unless the rejected alternative is a mistake the learner may actually
make. Keep headings in sentence case without skipping levels. Check for unfilled
placeholders and remove ornamental separators and emoji from explanatory prose.

### The editing pass

1. Read the surrounding lesson and its prerequisites before rewriting a passage.
2. State the paragraph's new contribution in a few words. Remove it if it adds none.
3. Find the actor and action, then check the links between sentences.
4. Replace abstract claims with one observable example and explain its limit.
5. Read aloud for rhythm. Keep useful detail; cut repetition and narration about
   how carefully the material was written.
6. Run the example and compare the explanation with what actually happens.

## Teaching components

`MDXComponents.tsx` makes these components available in lessons without imports.
Use the component that fits the learning task; a lesson does not need all of them.

| Component | Main props | What the reader sees |
| --- | --- | --- |
| `Lead` | Children | A larger introductory paragraph |
| `Callout` | `variant`, optional `title` | An explanation or aside with a labeled purpose |
| `Predict` | `question`, optional `cta`, answer as children | A question followed by a learner-controlled reveal |
| `Quiz` | `question`, `choices` | Choices with feedback; each choice has `label`, `feedback`, and optional `correct` |
| `Exercise` | `prompt`, optional `title` and `difficulty`, solution as children | A conceptual task and worked explanation |
| `CodeExercise` | `prompt`, `buggy` or `files`, `solution`, explanation as children | An editable starter and a solution to compare with |
| `Playground` | `code` or `files`, runtime and presentation options below | Code, output, and optional verification controls |
| `Figure` | Optional `caption` and `label`, visual as children | A separated diagram or interactive illustration |
| `KeyTakeaways` | Children, usually a short list | The points to revisit later |
| `Term` | Children | A marked term that the surrounding prose defines |

`difficulty` accepts `warm-up`, `core`, or `stretch`. `CodeExercise` accepts
`template`, `dependencies`, `showConsole`, `showPreview`, `editorHeight`, `tests`,
and `typecheck` for its editor. Set `solutionLang` to the language of the revealed
code, such as `js` or `tsx`; it defaults to `tsx`. The optional `hint` prop is
short guidance displayed above the editor.

### Callouts

| Variant | Purpose |
| --- | --- |
| `why` | Explain the reason behind a rule |
| `insight` | Identify the mechanism the reader should carry forward |
| `pitfall` | Explain a likely mistake |
| `interview` | Connect the concept to the reader's practical goal |
| `analogy` | Introduce a comparison and its limits |
| `note` | Add a relevant aside |

Change the labels in `Callout.tsx` if the course needs different wording.
For example, a course about shipping products may use a different label for
`interview` while retaining its styling.

### Exercise starters

Use `CodeExercise` when the learner should run and change code. Use `Exercise`
when the task asks for an explanation, design comparison, or verbal analysis.
Both reveal the worked solution when the learner chooses; neither verifies
that an attempt happened first.

A debugging starter should display the faulty behavior without diagnosing it in
a comment. Describe the required result in the prompt. If choosing an algorithm
is the task, do not spell that algorithm out in a TODO. Put the diagnosis and
repair in the worked explanation. A complete, explained solution belongs in a
worked example, where the reader needs those details to follow the mechanism.

## Runnable code and verification

The workbench uses Sandpack's editor and isolated runtimes. It waits for
**Run code**, keeps logs beside the code, and leaves existing output unchanged
while you edit. **Stop** disposes the runtime; **Reset code** also restores the
starter. A rerun starts a fresh runtime with the current files. Edits are held
in memory and disappear when the lesson unmounts or reloads.

For new content use the presets and file manifests described below. `template`
is a migration adapter for existing examples. Its original React-TS default,
React no-op export fallback, and files-over-code precedence apply only to legacy
calls. New examples use the course default, reject source conflicts, and require
the actual React component export.

```mdx
<Playground title="Count the attempts" preset="typescript"
  code={`const attempts: number = 3;
console.log("Next attempt:", attempts + 1);`} />

<Playground title="A Node path" preset="node"
  code={`const path = require("path");
console.log(path.basename("/lessons/intro.js"));`} />
```

Node runs through Sandpack's browser-based Nodebox runtime, with its supported
subset of Node APIs. It is not a local OS process or a complete replacement for
installed Node. Keep the default CommonJS `index.js` for small examples. Check
package compatibility in the browser before publishing. Do not put secrets in
sandbox files; they are delivered to the learner and the hosted runtime.

### Behavioral checks

Pass a `tests` map to `Playground` or `CodeExercise`. Each path must end in
`.test.js`, `.test.ts`, `.spec.js`, `.spec.ts`, or their JSX/TSX forms. The files
are read-only and hidden from editor tabs, but they are shipped to the browser:
this is learning feedback, not secure exam grading. Test files cannot overwrite
an authored file. They run in a separate browser Jest sandbox against a snapshot
of the learner's code. Later edits mark that result stale.

```mdx
<CodeExercise preset="javascript" solutionLang="js"
  prompt="Fix double so it multiplies any number by two. Run checks before comparing the solution."
  buggy={`export function double(n) { return n + 2; }`}
  tests={{ "/double.test.js": `import { double } from "./index";
test("doubles a positive value", () => expect(double(3)).toBe(6));
test("doubles zero", () => expect(double(0)).toBe(0));
test("doubles a negative value", () => expect(double(-2)).toBe(-4));` }}
  solution={`export function double(n) { return n * 2; }`}>
  Adding two changes the value by a fixed amount. Multiplication scales it,
  including zero and negative inputs. Try a decimal to check the same rule.
</CodeExercise>
```

Tests can import a React component or a shared TypeScript module. Add required
browser testing dependencies through `dependencies`. Choose assertions that
exercise visible behavior; do not depend on a particular implementation.
Tests of pure exported functions are the smallest starting point.

The `tests` prop is for browser Jest on JavaScript, TypeScript, and React.
Node exercises use manifest `node-assert` or `node-http` checks, documented below.
A script can print assertions for instruction, but console text never supplies
a structured check verdict.

### Type checking

`Check types` defaults on for TypeScript presets with a semantic-check capability; authors can set
`typecheck` explicitly. The checker runs in an on-demand Web Worker against all
project source files, including local imports, with strict TypeScript settings
and real installed React declarations. It does not execute learner code.

DOM and standard JavaScript libraries are bundled for browser TypeScript.
Node declarations are bundled for node-ts. Third-party types are not fetched automatically: provide needed `.d.ts` files in `files` or use
the appropriate external build tool. Missing declarations are reported, not
silently suppressed. The checker uses its documented compiler settings rather
than interpreting an arbitrary authored `tsconfig.json`. Test files are excluded
from this check and validated by the test runner when executed.

Sandpack transpilation and runtime syntax errors are not semantic type checking.
A type error may still run; demonstrate the difference when it is the lesson.

### Presentation options

| Prop | Default | Purpose |
| --- | --- | --- |
| `title` | `"Try it yourself"` | Accessible name and visible workbench label |
| `showPreview` | Preset output mode | Render UI beside the editor; set true for a browser DOM demo |
| `showConsole` | `true` | Initially expose logs; always visible for console-only examples |
| `layout` | `"row"` | Use `"column"` to stack; narrow workbenches stack automatically |
| `editorHeight` | `360` | Editor height in pixels, minimum 240 |
| `showTabs` | More than one visible authored file | Switch between files |
| `readOnly` | `false` | Prevent learner edits |
| `dependencies` | None added | Extra npm packages; pin versions in published lessons |

Ctrl/Command + Enter runs the editor. Escape followed by Tab leaves its keyboard
focus. Logs are capped at 200 messages. Console output is visible in both themes;
long results scroll inside the workbench. React and browser logic presets format
multi-argument logs into readable lines, including arrays and circular objects.
Custom entry files control their own console instrumentation.

Sandpack's hosted bundler and Nodebox require network access. The UI reports slow
startup and runtime errors and lets learners retry. Type checking uses local
bundled assets after they load. Stop disposes the iframe; it is not a guaranteed
interrupt for hostile code that blocks the browser process. These editors are
for authored study examples, not a security boundary for adversarial execution.

### Verify an example before publishing

Run each starter in the lesson. Inspect the actual preview, logs, and errors.
For an exercise, establish that the starter fails the intended case, a valid
repair passes, and a plausible incorrect repair still fails. Try rerun, reset,
and another playground on the same page. Check console examples on a narrow
screen. `check:mdx` validates lesson syntax only.

Keep external dependencies small. Escape backticks and `${}` inside a template
literal used for `code` or `files`. Keep examples accessible and consistent with
the practices the lesson teaches. See the
[executable sample lesson](../src/lessons/02-deep-dive/console-and-multifile.mdx).

## MDX syntax

MDX combines Markdown and JSX. Use `##` and `###` for lesson headings because the
page supplies the title from the curriculum. Component names are case-sensitive.
A bare `<` starts JSX, so escape a literal comparison symbol in prose or put the
expression in inline code.

Use a string for a plain prompt, or a fragment for a prompt with markup:

```mdx
<Predict question={<>What value does <code>total</code> hold after the loop?</>}>
  Explain the result and show how each iteration changes the value.
</Predict>
```

Inside JSX text, write literal braces as `{"{"}` and `{"}"}`. Use entities such
as `&lt;` where a character would otherwise begin markup. Inside a JavaScript
string passed to `code`, normal string escaping applies; do not HTML-escape the
program. Keep author comments outside component opening tags, using an MDX
comment expression such as `{/* Explain this example's purpose. */}`.

Internal links use `[text](/learn/lesson-slug)`. External Markdown links open in a
new tab. Use source links next to the claims they support.

## Add a lesson

1. Add an `L(...)` entry to the appropriate part in `src/curriculum/data.ts`.
   Supply its slug, title, blurb, minutes, objectives, and folder.
2. Create the MDX file at the declared path. A missing file displays a draft page
   with the lesson's objectives.
3. Write the explanation and practice task, then run `bun run check:mdx`.
4. Open the lesson, run its examples, and verify any failing and repaired cases.
5. Apply the prose editing pass and connect the idea to later recall.

## A small lesson example

This example uses a prediction and a conceptual follow-up. Add a coding exercise
when the objective requires the learner to implement or repair something.

```mdx
<Lead>
  A running total changes once for each input. Tracing those changes helps you
  find a missing or repeated update in a loop.
</Lead>

## Follow the value through the loop

`total` starts at zero. Each iteration adds the current number to the previous
total, and the next iteration receives that updated value.

<Predict question="What will total hold when this loop finishes? Explain each step before running it.">
  The values are 2, then 6, then 12. Each step adds one input to the value left
  by the previous step.
</Predict>

<Playground preset="javascript" code={`let total = 0;
for (const n of [2, 4, 6]) total += n;
console.log(total);`} />

Change one input to a negative number. Predict its effect, run the code, and
explain why the total changed by that amount.

<Exercise prompt="Without looking back, explain what happens if total is reset to zero inside each iteration.">
  Each iteration discards the earlier sum before adding its input. The last
  input remains when the loop finishes. Move the initialization above the loop
  when the total must accumulate across inputs.
</Exercise>

<KeyTakeaways>
  - The next iteration sees the total left by the previous iteration.
  - Initializing inside the loop discards that accumulated value.
</KeyTakeaways>
```

## Presets and ordinary example files

New authoring uses `preset` or a literal `example` reference. The course default
is `course.playground.defaultPreset`, falling back to `typescript`. Existing
`template` calls use a migration adapter with their original file precedence;
do not combine that adapter with the new selectors. An explicit preset wins over
the course default. An example owns its complete configuration, so do not add
`code`, `files`, `preset`, `template`, `dependencies`, or `tests` to its reference.

```mdx
<Playground preset="typescript" code={`console.log([3, 1, 2].sort());`} />
<Playground example="vue-counter" />
<CodeExercise example="sql-filter" prompt="Return the names of customers in Bogotá.">
  WHERE selects the matching rows before SELECT returns their names.
</CodeExercise>
```

The simple inline API preserves source text. React code must default-export its
component. `code` and `files` are mutually exclusive in this API. Use
`bun run presets --json` for environment IDs, exact versions, supported checks,
and limitations. Framework compilation does not imply semantic validation.
Unsupported check/preview requests fail with an actionable local error.

For substantial projects run `bun run example:new --preset vue-ts --id vue-counter`.
The command refuses to overwrite an existing directory. Author normal source
files in `examples/vue-counter/files/`; its `example.json` maps virtual runtime
paths to those real files. Sources are never compiled by the host React plugins.
Adding files needs a development refresh or rebuild. Nested example IDs work.

The single schema is `schemas/example.schema.json`. Types and a browser validator
are generated with `bun run schema:types`. Metadata is eager; source loading is
lazy. Do not reference dotfiles, secrets, node_modules, caches, or build output.
Paths cannot traverse or escape their example directory through symlinks.

Use `solutionSources` as a source overlay and `solutionRemoveFiles` to remove
starter modules. Reveal shows separate solution tabs without changing the attempt.
For exercises supply `verification.starterChecks`, a plausible
`verification.rejectedSources` overlay, and checks. The verifier checks all three
variants; a solution must pass and the rejected repair must fail.

`dependencies` overrides preset versions with exact versions. Generated
bootstraps and package.json are protected. To supply an entire compatible project,
use the experimental `custom-web` manifest with all source files, a pinned
package.json, and `project.environment`, `entry`, `activeFile`, and `output`.
Allowed provider environments are enumerated in the schema. No implicit scaffold
or extra dependency overrides apply. Custom checks are unavailable.

### PostgreSQL checks

`database.seed` names a SQL file. The `/query.sql` source is executed in full by
PostgreSQL's parser; queries are never split on semicolons by the template.
Each Run starts from the seed. `checks.kind: "sql-result"` compares a zero-based
`statement` result. `sql-state` cases supply a single `query` to inspect the
resulting database in a read-only transaction; every case uses a fresh instance.
Do not supply both query and statement in a case.

Cases define `name`, `columns`, positional `rows`, and optional `ordered`.
Unordered rows form a multiset: duplicates count. Simple values are null, strings,
booleans, and safe finite numbers. Large integers, decimals, and dates use
`{"type":"bigint|decimal|date","value":"..."}`. Decimal trailing zeroes are
normalized for comparison; dates are ISO strings. See `examples/sql-filter`.
Missing result statements, failed seeds, SQL errors, and timeouts are errors.

### Node checks and HTTP

`node` runs CommonJS scripts; `node-ts` transpiles in a local TypeScript worker and supplies
Node declarations for semantic checks. Use `server: {"port":3000,"startPath":"/hello"}`
for an HTTP example. Optional `requests` supply method, path, headers, and body.
The learner edits requests in the panel and inspects status, headers, and body.
The declared port exists inside the sandbox and can be reused by other examples.
HTTP mode supports CommonJS and compiled `node-ts` handlers. Text/JSON request
bodies are buffered and limited to 4,096 UTF-8 bytes. A template-owned bridge
reconstructs the readable body for the handler because Nodebox's native fetch
body transport stalls. Streaming uploads, native `IncomingMessage` identity,
ESM HTTP servers, and server framework packages are outside verified coverage.
Node declarations describe types; they do not establish complete Node 22 API
coverage. See the [README runtime compatibility note](../README.md#runtime-compatibility) for the tested built-ins and transport.

A `node-assert` check maps ordinary `.test.js` files in `checks.sources`.
Each file exports a registration function receiving `{test, assert}`. Register
named cases with `test(name, asyncOrSyncFunction)`. See `examples/node-double`.
The harness rejects zero cases and reports runner errors separately. A
`node-http` check supplies `httpCases` with name, request, expected status, optional
selected headers, and optional exact body. See `examples/node-api`.

### Verification commands

Run `validate:course --json` for config, curriculum, lesson references, manifests,
source files, and capability errors. Intentional drafts are warnings; add
`--publication` to reject them. Diagnostics include code, file, lesson/example,
location where available, and repair guidance. Dynamic MDX and inline programs
are explicitly reported as requiring execution verification.

Use `verify:examples --example sql-filter --json` or `--referenced --json` to run
Chrome recipes. Worked examples declare `verification.steps` with console text,
preview text, accessible clicks, SQL cells, checks with an expected outcome,
or HTTP requests. For example, an HTTP step can be
`{"action":"http","request":{"method":"GET","path":"/hello"},"status":200,"body":"Hello"}`.
Optional `headers` compare selected response headers.
Use explicit browser tests for complex workflows. `COURSE_VERIFY_URL` can target
an existing dev or production-preview server. `verify:course` runs validation,
MDX compilation, app types, all unit files, production build, independent browser
regressions, and authored example verification against the production preview. Browser infrastructure failures remain failures, not successful
course checks. Read the [README runtime compatibility note](../README.md#runtime-compatibility) and preset catalog for supported capabilities and limits.
