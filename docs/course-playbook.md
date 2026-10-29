# Course playbook

Start with the capability the reader needs. An interview candidate may need to
explain and repair a stale closure under time pressure. A product engineer may
need to build a reliable streaming interface. Those goals require different
examples, depth, and practice even when they share some topics.

Write the destination in one sentence: what can the reader do at the end that
they cannot do now? Put that promise in `course.config.ts` and use it to decide
which topics belong in the course.

## Establish the prerequisites

Name the knowledge the course assumes. Check whether the opening examples
actually fit that boundary. If a lesson depends on an idea introduced later,
move the idea earlier or teach the necessary part where it is first used.

Keep an orientation lesson that explains how to use the course, what the editor
can run, and what progress marks mean. Readers should know when to seek help and
how to check understanding without treating a completed page as proof of mastery.

## Research checkable claims

For APIs, versions, prices, limits, standards, and other facts that may change,
record primary sources before writing the lesson. A small `research/` directory
can hold one note per domain. Each note should identify the claim, source,
verification date, and unresolved limits.

Use official documentation and original research where available. If a source
cannot be verified, describe that limit or omit the claim. Do not turn an
uncertain research note into a confident lesson statement. Stable mechanisms
still need accurate examples; they do not need a citation for every sentence.

For teaching decisions, start with [pedagogy.md](pedagogy.md).
Check whether the study's learners and tasks resemble yours. Keep the study's
finding separate from the design choice you infer from it. Label preprints as
provisional and revisit the evidence when stronger findings become available.

## Map the curriculum

Edit `src/curriculum/data.ts`. Group related lessons into parts and order them
so readers can use earlier ideas in later work. A part's accent controls its
navigation color; it does not indicate teaching depth.

Choose where depth belongs. A central mechanism may need several examples,
smaller practice steps, and later applications. A supporting topic may need one
example and a short exercise. Equal word counts and component quotas rarely
match those differences.

Each lesson entry needs these fields:

| Field | What to write |
| --- | --- |
| `slug` | A unique, stable URL identifier. Changing it breaks links and changes the saved completion identity. |
| `title` | A concrete subject or claim, such as "State is a snapshot" |
| `blurb` | The lesson's promise in one sentence |
| `minutes` | An estimate that includes practice time, not just reading |
| `objectives` | Observable actions, such as "trace which value this callback captures" |
| `file` | The matching MDX path under `src/lessons/` |

Write objectives before drafting the lesson. "Understand hooks" does not tell
you what to assess. "Repair an effect that uses a stale value and explain the
repair" gives you an example, task, and feedback target.

## Plan practice across lessons

For each central objective, plan a demonstration, an attempt with feedback, and
a later question or changed task. The later activity should require recalling
the mechanism without displaying the previous answer first.

Use a worked example when the learner needs instruction before attempting the
task. Offer smaller hints where useful, and keep the full explanation available.
If AI assistance is allowed, distinguish assisted practice from an unaided check.
Passing the supplied tests establishes behavior on those cases, not retained
understanding.

For a pilot, define an assessment rubric before collecting results. Check
correctness on new cases, the explanation of the mechanism, and the ability to
locate a fault. Record assistance separately. Compare immediate and delayed
performance, and get consent before adding learner analytics. The
[pedagogy guide](pedagogy.md#evaluate-learning-and-revise-the-course) explains
how to choose evaluation checkpoints and interpret the results.

## Write and verify one lesson at a time

Begin with the lessons that carry the course's main promise. Unwritten lessons
can remain visible as drafts with their objectives. Follow [pedagogy.md](pedagogy.md)
when choosing activities and [authoring guide](authoring-guide.md) when writing
prose and embedding components.

Read the surrounding lesson before revising a passage. Introduce the terms the
reader needs, connect each new idea to what came before, and remove paragraphs
that add no mechanism, example, boundary, or task. Read the prose aloud, then
run its examples and compare the explanation with their actual behavior.

For a coding exercise, verify that the starter fails the intended case, a valid
repair passes, and a plausible wrong repair still fails. Check the console,
reset, rerun, and narrow-screen layout. MDX compilation only checks the page's
syntax; it does not execute the code inside strings.

## Publishing checklist

- State the course destination and prerequisites.
- Set the brand, storage prefix, curriculum, and lesson paths.
- Source checkable claims and record unresolved uncertainty.
- Connect each central objective to practice, feedback, and later recall.
- Apply the prose editing pass to lessons and supporting documents.
- Run `bun run validate:course --publication` and `bun run verify:course`.
  The latter builds a production preview and runs independent browser regressions
  plus the course's declared example recipes with Chrome and network access.
- Execute every new or changed example and check both failing and repaired cases.
- Review the reader experience on a narrow screen and in both themes.
- Replace or remove sample material that no longer belongs in the course.

Keep the documentation current when the course changes. If a runtime, component,
or teaching convention changes, update the examples and authoring instructions
in the same pass so the next author follows the behavior that actually ships.
Replace obsolete instructions instead of appending change notes. Each document
should present the current guidance without a revision log or comparisons with
earlier versions.
