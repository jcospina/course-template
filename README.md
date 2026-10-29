# Interactive course template

Build a local technical course with explanations, editable code, exercises, and
worked solutions. Tell your coding agent what you want to learn, or write the
lessons yourself. [Run the sample course](#how-to-run-it) to try the editor and
teaching components.

You get three sample lessons and a draft entry to replace with your own course.
In a lesson, you can predict an output, run the code, change it, and compare your
answer with an explained solution. Examples can show a web preview, console
output, or SQL results, depending on the topic.

The app uses Vite, React, TypeScript, and MDX. Each copy holds one course. You
keep its lessons and examples as files, and run it on your machine.

## How to run it

You need [mise](https://mise.jdx.dev/getting-started.html), which installs the
Bun 1.4.2 version selected in `mise.toml`. On macOS, you can install mise with
Homebrew:

```sh
brew install mise
```

From this project directory, install the dependencies and start the course:

```sh
mise trust
mise install
mise exec -- bun install --frozen-lockfile
mise exec -- bun run dev
```

Open [localhost:5173](http://localhost:5173) and start the first sample lesson.
Choose **Run code**, change a value, and run it again. **Reset code** restores
the starter; **Stop** releases the running example.

Your theme and progress are saved in your browser. Your code edits last until
you leave or reload the lesson. Marking a lesson complete records your progress;
it does not depend on passing its checks.

## Build your course

Open this directory in your coding tool and describe what you want to learn.
Include your starting knowledge and the depth you want. For example:

> Build a TypeScript data structures course. I know functions, arrays, and basic
> types. Teach me how to implement stacks, queues, and hash tables, choose between
> them, and explain their trade-offs. Include worked examples and repair exercises.

The [agent instructions](AGENTS.md) tell your coding agent to research the topic,
write the curriculum, lessons, examples, checks, and solutions, then verify the
course and start it locally. You do not need to prepare test files or example
configuration yourself. Course generation happens in your coding tool.

If you want to write or adjust the course yourself, these are the main files:

| File or directory | What you change |
| --- | --- |
| `src/course.config.ts` | Your course name, introduction, landing-page copy, and default runtime preset |
| `src/curriculum/data.ts` | Lesson order, paths, objectives, and reading estimates |
| `src/lessons/` | Explanations and activities, written in MDX |
| `examples/` | Runnable source, checks, database seeds, and solutions |

Give your course a distinct `storagePrefix` in `src/course.config.ts` so its
saved progress stays separate from other courses. Replace the sample lessons
and remove the draft entry when you no longer need them. A curriculum entry
without a lesson file appears as a draft page.

Read the [authoring guide](docs/authoring-guide.md) for component syntax and
examples. The [course playbook](docs/course-playbook.md) helps you plan the
curriculum, and the [pedagogy guide](docs/pedagogy.md) explains how to choose
practice and feedback. For changes to the app itself, see the
[architecture](docs/architecture.md).

## Runtime compatibility

Your examples run in the browser. Choose a preset for the language or framework
you want to teach; new examples default to TypeScript. The available checks
differ by preset:

| Examples | What you can inspect | Type checking | Exercise checks |
| --- | --- | --- | --- |
| HTML/CSS | Web preview | No | No |
| JavaScript | Console output or web preview | No | Browser tests |
| TypeScript | Console output or web preview | Yes | Browser tests |
| React, with JavaScript or TypeScript | Web preview and console output | TypeScript only | Browser tests |
| Vue or Svelte, with JavaScript or TypeScript; Angular | Web preview and console output | No | No |
| Node.js, with JavaScript or TypeScript | Console output or HTTP responses | TypeScript only | Assertions and HTTP checks |
| PostgreSQL | Query results | No | Result and database-state checks |

Running TypeScript code and checking its types are separate actions. Vue,
Svelte, and Angular examples can compile TypeScript, but this template does not
provide semantic type checks for those presets. If you add third-party libraries
to a type-checked example, you must supply any declarations the checker needs.

Web and Node examples use Sandpack's hosted runtimes and need network access.
Node examples run in Nodebox, not your installed Node.js. You can use the tested
`path`, virtual `fs`, `buffer`, `stream`, `assert`, and HTTP support, but native
addons, external raw sockets, and subprocesses are unsupported. HTTP examples
use CommonJS or compiled TypeScript and accept text request bodies up to 4,096
UTF-8 bytes. Streaming uploads and server framework packages are outside the
template's verified coverage.

SQL examples use [PGlite](https://pglite.dev/docs/) to run PostgreSQL in the
browser. Each run starts from the example's seed data. This does not provide
MySQL, SQLite, or a connection to your own database.

Before choosing a runtime or adding dependencies, inspect its exact versions,
capabilities, and limits:

```sh
mise exec -- bun run presets --json
```

The preset catalog records coverage in desktop Chrome. That coverage does not
establish that every package or API will work; run your own examples before
sharing the course. Treat anything marked experimental as unverified against
the full compatibility checks. The [preset definitions](src/components/ui/playground/presets.ts)
and [browser tests](tests/browser/) describe the implementation and test coverage.

## Check your course

Run these checks after you change lessons or examples:

```sh
mise exec -- bun run validate:course --json
mise exec -- bun run verify:course
```

Validation checks the curriculum, lesson references, example files, and runtime
settings. Full verification also compiles MDX, checks application types, runs
unit tests, builds the app, and exercises it in Chrome. You need Google Chrome
installed and network access for the browser checks.

For a finished course, add `--publication` to the validation command to reject
draft lessons. Run inline and dynamically constructed examples in the browser
when validation flags them: compiling a lesson does not execute the code it
contains. For each exercise, check that the starter fails as intended, the
solution passes, and a plausible wrong repair still fails. Review keyboard
access, both themes, and narrow layouts before sharing it.

You can run individual tools with the same `mise exec --` prefix:

| Command | What it does |
| --- | --- |
| `bun run example:new --preset typescript --id stacks/push` | Creates files for a new example |
| `bun run check:mdx` | Compiles your lesson files to catch syntax errors |
| `bun run typecheck` | Checks the application's TypeScript |
| `bun run test` | Runs unit tests |
| `bun run test:browser` | Runs browser regressions in Chrome |
| `bun run verify:examples --referenced --json` | Runs the verification steps for examples referenced by your lessons |
| `bun run build` | Builds the course into `dist/` |
| `bun run preview` | Serves the built course locally |
| `bun run verify:generated-courses --json` | Checks four sample courses against the shared template |

## License

This template is licensed under the
[GNU Affero General Public License v3.0 only](LICENSE).
