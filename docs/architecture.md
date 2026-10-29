# Architecture

The app renders a curriculum of MDX lessons. Course authors change the course
configuration, curriculum, and lesson files; the components provide navigation,
progress, and interactive practice.

## Application and content

`src/main.tsx` reads the document title and description from `course.config.ts`,
then mounts the theme provider, router, and app shell. The shell contains the
sidebar, reading progress, and the current page. React Router serves the home
page at `/` and lessons at `/learn/:slug`.

`src/curriculum/data.ts` declares each lesson's path, title, description, reading
time, and objectives. `src/curriculum/index.ts` matches those paths against a
Vite glob of `src/lessons/**/*.mdx`. A matching file becomes a lazily loaded
lesson. A missing file becomes a draft page that displays the objectives. This
lets authors plan the curriculum before finishing every lesson.

Vite compiles MDX before applying the React plugin. The order matters because
MDX emits JSX, which then needs the React transform. The MDX configuration uses
`@mdx-js/react` so `MDXProvider` can supply the teaching components.

`MDXComponents.tsx` maps component names such as `Playground` and `Predict` into
lesson scope. It also maps fenced code to the static highlighter and internal
links to router links. To add a teaching component, build it under
`components/ui/` and add it to that map.

## Progress and theme

`useProgress.ts` stores completed lesson IDs with `useSyncExternalStore`. The
sidebar and lesson page subscribe to the same store. Local storage preserves the
IDs across reloads, and the browser's `storage` event synchronizes open tabs.
The store caches its serialized snapshot because React requires a stable
snapshot reference when the value has not changed.

`ThemeProvider` saves the theme and sets `data-theme` on the root HTML element.
CSS variables define the light and dark palettes. Progress and theme use the
course's storage prefix so separate courses can coexist on the same origin.

## Reading and component styles

`tokens.css` defines fonts, spacing, colors, radii, and motion values.
`global.css` styles the reading column and HTML elements. `components.css`
contains the component layouts and states.

The lesson area can reach 1024px to accommodate code and output side by side.
Narrow workbenches stack the panels, while exercise badge labels stay on one
line. Prose retains a bounded line length. Each curriculum part can use the
primary or secondary accent. Change tokens to rebrand the course without
changing the components.

Static snippets use Prism. Executable examples use Sandpack. Keeping the two
separate lets a lesson discuss code without mounting a runtime for every snippet.
`Playground.tsx` lazy-loads the workbench and catches component-loading failures,
so Sandpack stays outside the initial application chunk.

## Playground files

`playground/resolve.ts` assembles template-owned presets, exact dependencies,
ordinary manifest sources, editor metadata, and canonical solution overlays.
The schema generates both TypeScript manifest types and a browser validator.
`examples.ts` eagerly loads bounded metadata and lazily loads ordinary source
text. `files.ts` retains the legacy `template`/`code` translation; its historical
files-over-code precedence is confined to that adapter. New preset projects
reject ambiguous source declarations and conflicts with generated bootstrap files.

The editor owns the source map independently of Sandpack's generated files.
Run, Check, and semantic checking capture complete immutable project snapshots,
including effective dependencies and setup. Config changes replace the workspace;
presentation changes preserve edits. Paths are normalized and duplicates rejected.
Internal paths beginning with `/__course_` are reserved. Console formatting keeps
multi-argument logs, arrays, bigint, and circular values readable.

Test files supplied through `tests` are read-only and hidden from the learner's
editor tabs. They are still public browser assets. The `tests` prop cannot
provide secure assessment or hide a solution from a determined reader.

## Execution lifecycle

The editing provider never auto-runs. Run captures its files and mounts a
separate execution provider. Each run gets a new provider and iframe, while the
editor preserves the learner's work. This prevents old timers or component state
from affecting a rerun. It also avoids losing client-scoped console subscriptions
when a Sandpack client is recreated in place.

The runtime starts after its child iframe has registered. Deferring that start
also lets React StrictMode cancel its trial mount before it creates a duplicate
client. Stop unmounts execution without discarding edits. Reset stops execution
and restores the author's files. Leaving the lesson disposes its runtimes.

With a preview, `SandpackPreview` owns the runtime client. Without one,
`SandpackConsole standalone` owns it. A console alone cannot execute code unless
it has a client. The output panel reports runtime errors and delayed startup and
lets the learner retry. Each playground owns its providers, so results do not
mix across examples. A shared FIFO queue permits two concurrent startups;
canceled queued work is removed and release is idempotent. Type checks have a
20-second worker timeout; SQL operations and script startup have 30-second bounds.
Resolved output snapshots remain stale after edits until explicitly rerun.

Sandpack loads its browser runtime and dependencies from hosted services. Node
uses [Nodebox](https://github.com/Sandpack/nodebox-runtime), a browser runtime
that implements a subset of Node APIs. It cannot provide an entire local OS or
native Node modules. These examples run in the learner's browser, not on this
app's server. See the authoring guide for supported course presets and limits.

## Behavioral verification

Check solution runs the browser Jest runner in another provider, using the file
snapshot captured when the learner presses the button. The snapshot remains
fixed while the learner edits. A changed file marks the earlier result stale;
checking again replaces the test runtime. Browser Jest runs once after runner
initialization with watch mode disabled. Its explicit blank entry avoids injecting
a default starter that could shadow an authored TypeScript module. The provider
retains the snapshot's local files, dependencies, and JSX configuration.

The workbench reports passed and failed cases separately from test-file errors
or an empty run. The Node template rejects the browser `tests` prop. Node
exercises use named `node-assert` cases or `node-http` request expectations.
Their verdicts come from structured runner data, never printed console text.
Zero cases and runner failures cannot pass. PostgreSQL result and state checks
use fresh seeded workers; state inspections run in read-only transactions.

## Semantic type checking

`typecheck.worker.ts` loads the installed TypeScript compiler, standard library
declarations, React declarations, and Node declarations. It calls the virtual-project checker in
`typecheck.ts`, then terminates after a result or timeout. This work stays off
the main UI thread and begins only when the learner requests it.

The checker uses strict settings, resolves local imports, and reports semantic
errors without filtering diagnostic codes. It excludes test files and internal
bootstrap files. Extra package declarations must be supplied explicitly; missing
types produce diagnostics. It does not read arbitrary compiler settings from an
authored `tsconfig.json`.

Diagnostics appear in the check panel when requested. The checker does not
provide editor hover tooltips.

The compiler and declarations form a large on-demand asset. They are not part of
the initial page download. Transpiling and executing TypeScript in Sandpack does
not replace this semantic check.

## Validation tools

The authoring toolchain uses Bun 1.4.2, selected per project by `mise.toml` and
also recorded in `.bun-version` and the package manifest. Mise's shell integration
selects the executable; non-interactive commands use `mise exec -- bun ...`.
Package scripts explicitly select Bun for Vite, TypeScript, and
Playwright because `bun run` alone respects their Node shebangs. The MDX checker
also runs directly with Bun. Dependency installation uses the committed
`bun.lock` with `bun install --frozen-lockfile`.

Vite remains responsible for MDX transformation, hot updates, and production
bundling. Bun runs the tooling; it does not replace the learner's browser,
Sandpack, Nodebox, or the TypeScript web worker.

| Command | What it checks |
| --- | --- |
| `bun run check:mdx` | Compiles lessons independently with the build's MDX plugins |
| `bun run typecheck` | Checks the application's TypeScript |
| `bun run test` | File resolution, console formatting, test constraints, type diagnostics, and project isolation |
| `bun run test:browser` | Runs the lesson workflows in real Chrome against Sandpack and Nodebox |
| `bun run build` | Produces the deployable application |

Browser tests need Chrome installed and network access. They cover reruns,
errors, stopping and resetting, independent editors, React interaction, Node
assertions, type repairs, behavioral checks, and responsive layout. Screenshots
and traces go to ignored local directories. Compilation alone cannot verify
code embedded in a lesson string.

## Template-owned projects and PostgreSQL

The public contract lives in playground/types.ts. presets.ts owns versioned
scaffolds and capabilities; resolve.ts assembles the effective project and rejects
conflicting author inputs. Public component props use template-owned file types.
Legacy template calls retain a small adapter in files.ts. New inline authoring
defaults to TypeScript; the sample React calls name their environment.

Example metadata uses a bounded eager Vite glob. examples.ts lazy-loads ordinary
raw sources and solutions. The JSON Schema generates both TypeScript declarations
and a bundled standalone validator used by CLI and browser. File normalization
is shared; CLI source resolution additionally checks real paths for symlink escapes.
Heavy SQL/editor/typechecking assets remain separate chunks.

ProjectWorkspace dispatches lazily to the web and SQL workbenches. The web adapter
uses Sandpack's editor while owning source state, and captures complete files, entry,
environment, and dependency setup for execution. NodeExecution uses the same
Nodebox SDK beneath Sandpack for named assertions and the server bridge. Every
mounted execution receives a captured project; editing never mutates that run.
Behavior tests run once rather than in watch mode. Their result is scoped to the
mounted invocation and editing marks it stale.

SQLWorkspace owns source tabs, run identity, reset, and stale results. sql.worker.ts
creates a fresh in-memory PGlite database for Run or each check case. A new worker
is mounted per operation and terminated on completion, Stop, reset, timeout, or
unmount. Responses carry instance and run IDs. sql/compare.ts preserves typed
positional rows and compares multisets or ordered sequences as authored.

Use presets, example:new, validate:course, verify:examples, and verify:course to
inspect and validate supported authoring. Test discovery covers every unit file.
The `/__verify` route runs authored examples independently of curriculum pages,
including production builds. No hosted authoring application or native execution
service is added. See the [README runtime compatibility note](../README.md#runtime-compatibility)
and preset catalog for supported capabilities and limits.
