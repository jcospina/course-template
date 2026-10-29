# Pedagogy for self-paced technical courses

A course should leave the learner able to explain a mechanism and use it in a
new situation. Choose that capability first, then align the explanation,
examples, practice, feedback, and later assessment with it. Interactive
components serve that purpose; their presence alone says little about learning.

Use the [authoring guide](authoring-guide.md) for component APIs, the
[prose guidance](prose-guidance.md) when editing explanations, and the
[course playbook](course-playbook.md) for curriculum and publishing workflows.

## Define the capability and prerequisites

Write objectives as observable actions: trace a captured value, repair an
incorrect update, select a suitable algorithm, or explain why a type narrows.
"Understand closures" is too broad to guide an assessment. "Identify which
binding a callback captures and explain its later value" gives you a task and
criteria for evaluating the answer.

For each central objective, plan a demonstration, an attempt with feedback,
and a later independent task. If the objective requires implementation, a
multiple-choice question alone is insufficient. If it requires explanation,
passing code checks alone is insufficient. This alignment is a course design
principle; it is not an effect size established for this product.

State the assumed knowledge and check that the opening task fits it. A learner
who has used loops may follow an accumulator directly; a learner unfamiliar
with assignment needs a trace first. Add bridge material where prerequisites
are missing. A short, low-stakes diagnostic can identify the starting point;
do not treat an incorrect answer before instruction as a learner failure.

Calibrate depth to the course destination. A central mechanism may need several
examples and smaller steps, while a supporting idea may need one explanation
and one task. Avoid uniform word counts and component quotas. Include practice
time in lesson estimates.

## Explain the mechanism, its purpose, and its boundary

Give a rule a reason the learner can inspect. For an accumulator, explain how
each iteration reads and updates the result left by the previous iteration.
Then show why resetting inside the loop discards earlier contributions. A
slogan or warning cannot replace that causal explanation.

Begin with familiar information and connect it to the new idea. Introduce
technical terms before asking the learner to reason with them, and keep terms
consistent. Use concrete values and intermediate states. An analogy can provide
an entry point, but state where it stops working: a shopping subtotal illustrates
accumulation, but does not explain assignment syntax.

Write in the voice of a warm, confident tutor. Use "you" for a learner action and
"we" for a shared walkthrough. Put the actor in the subject and the action in
the verb. Keep one point per paragraph, connect sentences, and use lists for
parallel items or steps. Name difficulty without claiming everyone experiences
it. Words such as "obviously" and "trivially" do not supply a missing explanation.

## Model the work, then reduce support

A worked example includes the problem, a complete solution, its observable
result, and the reasons for the important decisions. Label meaningful purposes
such as "initialize the result," "update for each input," and "return the result."
Explain what a step accomplishes rather than merely paraphrasing its syntax.

Margulieux, Morrison, and Decker's peer-reviewed
[2020 introductory-programming study](https://link.springer.com/article/10.1186/s40594-020-00222-7)
compared subgoal-oriented and typical instruction across 265 students. The
subgoal group performed better on formative quizzes and had fewer withdrawals
or failures, but did not have higher average exam scores. It was a classroom
quasi-experiment, so avoid treating it as definitive randomized evidence or a
guarantee of long-term transfer.

For a novice, begin with a small explained example, then ask for a focused
completion or repair, then an independent implementation. Reduce
supplied steps as the learner demonstrates readiness; restore help when a
missing prerequisite prevents progress. Keep unrelated files, dependencies,
and framework conventions out of the first example. This is our practical
scaffolding choice, not a fixed progression tested in every course.

Use a trace table or diagram when it makes changing state, ordering, or
relationships easier to inspect. Place the relevant explanation near the code
or figure. Provide a text explanation of essential visual information and avoid
requiring color, animation, hover, or mouse use to understand a mechanism.
These are presentation and accessibility requirements for the course.

## Choose an activity that exposes the learner's reasoning

A useful starting sequence is **example, prediction, edit, explanation,
independent attempt, later recall**. Adjust it to prior knowledge and the
objective; a lesson does not need every activity.

| Activity | Learning purpose | Author's responsibility |
| --- | --- | --- |
| Worked example | Follow a complete solution and its decisions | Show the result, explain the mechanism, and identify its boundary. |
| `Predict` | Commit to an outcome and a reason before observing it | Ask a meaningful question, then explain likely wrong reasoning. A reveal cannot verify an attempt. |
| `Playground` | Test an explanation by changing something | Name the edit, what to observe, and the comparison to make. |
| `Quiz` | Distinguish plausible alternatives | Make distractors represent misconceptions and give specific feedback for each. |
| `CodeExercise` | Repair or build runnable code | State the behavior, supply an honest starter and useful checks, and explain a valid solution. |
| `Exercise` | Explain, trace, sketch, or compare | Supply a model answer with reasoning and criteria for comparison. |
| Later independent task | Recall a taught mechanism and apply it again | Use a changed case without first displaying the earlier answer. Record help separately. |

Retrieval recalls something already learned. Prediction anticipates a result
that may be unfamiliar. Self-explanation connects steps to reasons. These are
different activities even when they share a reveal component. Ask for the
reasoning that matters; an extra click or pause is not evidence of learning.

### Use an initial attempt when instruction can build on it

An attempt before instruction can expose competing approaches or a
misconception. Follow it with an explanation that compares those approaches
and supplies the missing mechanism. Set a clear stopping point and make help
available. Unsupported struggle and an indefinite solution lock do not provide
this instructional sequence.

An attempt followed by instruction has support beyond programming. Sinha and
Kapur's peer-reviewed
[2021 meta-analysis](https://journals.sagepub.com/doi/10.3102/00346543211019105)
covered 53 studies and 166 comparisons. Problem solving followed by instruction
had a moderate average advantage over the reverse order, with stronger effects
when designs followed productive-failure principles. This does not establish
that every learner or concept benefits from starting with an unsolved problem.

The programming-specific [study by Suriyaarachchi, Denny, and Nanayakkara](https://arxiv.org/abs/2411.11227),
accepted at SIGCSE 2025, compared only 20 learners studying Python lists. Initial
outcomes did not differ, while delayed similar tasks favored productive failure.
The small sample and narrow topic limit generalization. When prerequisites are
missing, an explained example followed by a small repair remains our default.

## Ask for self-explanation

Ask the learner to explain a causal connection: "Why must initialization happen
before the loop?" or "What would this callback read if that binding changed?"
Request an intermediate state, a contrasting case, or a counterexample when it
helps assess the explanation. "Did you understand?" gives little usable evidence.

Bisra and colleagues examined this approach in their peer-reviewed
[2018 meta-analysis of self-explanation prompts](https://link.springer.com/article/10.1007/s10648-018-9434-x)
which included 69 effect sizes from 64 reports and found an average benefit of
g = 0.55. It spans multiple subjects and instructional conditions; it does not
establish that any request to explain will improve programming transfer.

Put a focused explanation prompt after an important example or repair. Give a
model explanation that names the relevant state, operation, and
consequence. If the learner can repeat the rule but cannot justify it, return
to a trace or contrast before adding a harder problem. Do not interrupt every
line with a prompt; choose the decisions that carry the objective.

## Give feedback that improves the next attempt

State success criteria before the task. For a failed check, identify the
observed behavior and relevant input: "Returns the final input instead of the
sum for multiple values" is more useful than "Test 2 failed." Keep the cause and
worked repair in the explanation so the starter still invites diagnosis.

The kind of feedback affects what learners gain from it. Wisniewski, Zierer,
and Hattie's peer-reviewed
[2020 feedback meta-analysis](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2019.03087/full)
covered 435 studies and more than 61,000 participants. Feedback helped on
average, with substantial variation; its information content mattered. A
red or green verdict is therefore only one part of the feedback we provide,
not an instructional explanation by itself.

When a check fails, say what the task required, what the code did, and where the
learner could inspect the difference. For a quiz distractor, explain the
misconception that would produce it. For code, test visible behavior and relevant
boundary cases rather than a
particular implementation. Explain alternative solutions that satisfy the same
contract. Runner failures, syntax errors, and semantic diagnostics should not
be mislabeled as conceptual mistakes.

Offer help in stages when useful: where to inspect, which concept applies, then
a worked solution. Encourage an attempt without a forced timer or blocking
access to instruction. After using help, ask for a changed task with less
support. A learner-controlled reveal makes instruction available, but does not
prove the learner attempted the task first.

## Retrieve important ideas after a delay

Plan review when writing the first lesson. Bring a mechanism back after
intervening material and in a later session. Ask for recall or a new application
before showing the original explanation. Reviewing a closure in a different
component is more informative than rereading the same paragraph.

Classroom studies support asking learners to retrieve taught ideas. Agarwal,
Nunes, and Blunt's peer-reviewed
[2021 classroom retrieval-practice review](https://pdf.poojaagarwal.com/Agarwal_etal_2021_EDPR.pdf)
covered 50 experiments with 5,374 learners. Retrieval benefited learning across
many classroom settings. This supports recalling taught ideas with corrective
feedback; it does not turn guessing unfamiliar code into retrieval practice.

Mawson and Kang's peer-reviewed
[2025 classroom spacing meta-analysis](https://www.mdpi.com/2076-328X/15/6/771)
covered 22 reports, 31 effects, and more than 3,000 learners. Distributed
practice outperformed massed practice on average (d = 0.54, 95% confidence
interval [0.31, 0.77]). The available studies limited moderator analysis and
do not establish an optimal schedule for coding courses.

Franzoi and colleagues' peer-reviewed
[2025 primary-school study](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1632206/full)
found an advantage for retrieval with feedback over rereading history material,
but no significant benefit from the spacing-interval manipulation. This is a
different population and task; it illustrates why an average spacing benefit
does not guarantee that every schedule or implementation will help.

Revisit central objectives in subsequent lessons and provide optional return
tasks for later sessions. Choose practical intervals and assess
delayed performance. Next-day and one-week checks are possible pilot checkpoints,
not validated universal intervals. Keep reviews low-stakes and make corrective
explanations available after the attempt.

## Vary problems and teach when a mechanism applies

First help the learner recognize the mechanism in a manageable case. Then
change an input, context, or constraint so copying the earlier solution is
insufficient. Include a case where the mechanism is inappropriate and ask why.
Changing variable names alone offers little evidence of broader transfer.

Interleaving mixes related problem types so the learner must choose an approach;
spacing separates practice in time. Do not assume they are interchangeable.

Brunmair and Richter's peer-reviewed
[2019 interleaving meta-analysis](https://pubmed.ncbi.nlm.nih.gov/31556629/)
covered 59 studies and found that effects depended on learning materials and
their similarities. It supports a conditional use of mixed practice, not a
blanket rule to alternate every topic.

Once the learner can carry out the basic procedures, mix tasks that require
discriminating between them, such as selecting accumulation, filtering, or
mapping from a stated output contract. Ask the learner to justify the choice.
If mixed practice exposes missing prerequisites, return to a focused example.
Treat success on a similar task as evidence of near transfer; a substantially
different application requires its own assessment.

## Separate assisted performance from independent learning

If a course permits AI help, ask for the learner's prediction, plan, or
explanation before a generated solution. Have the learner inspect and verify
generated code against the task's contract. Follow assistance with a changed
problem completed independently. Record what help was used so assisted
completion and unaided performance can be interpreted separately.

The peer-reviewed studies show why the design of the help matters. Bastani and
colleagues'
[2025 high-school mathematics trial](https://www.pnas.org/doi/10.1073/pnas.2422633122)
found that unrestricted AI improved assisted practice but reduced subsequent
unassisted performance; a tutor designed with safeguards largely mitigated that
harm. Kestin and colleagues'
[2025 undergraduate physics trial](https://www.nature.com/articles/s41598-025-97652-6)
found better immediate learning with a structured AI tutor than with the
compared active classroom lessons. These different interventions and settings
do not establish a universal benefit or harm, or long-term coding transfer.

Recent programming studies are still provisional. Shen and Tamkin's
[2026 preprint](https://arxiv.org/abs/2601.20245)
reports weaker conceptual understanding, code reading, and debugging on average
when developers learned an unfamiliar async library with AI assistance.
Observed interaction patterns differed, but those pattern comparisons were
not themselves randomized causal tests.

Chung and colleagues'
[2026 adaptive-sequencing preprint](https://arxiv.org/abs/2608.16907)
reports a 0.15-standard-deviation improvement on an unassisted final exam in a
five-month Python course across ten high schools. Both groups used the tutoring
platform; the randomized comparison concerns adaptive versus fixed sequencing,
not AI versus no AI.

Eastwood and colleagues'
[September 2026 preprint](https://arxiv.org/abs/2609.29995)
compared four AI-assistant designs with 132 introductory-programming students.
The Socratic assistant with full context received lower perceived task-support
ratings. Comprehension, stress, and outside-tool-use differences were descriptive
and not statistically significant. It does not establish a learning advantage
for direct instruction.

Evaluate help by what learners can explain and do afterward, as well as whether
stuck learners can use it. Do not equate restrictive or
Socratic assistance with better learning. Adaptive scheduling and AI hints are
candidates for evaluation; this template provides authored feedback and does
not currently supply an AI tutor or adaptive learning system.

## Distinguish the evidence each check provides

| Signal | What it establishes | What it does not establish |
| --- | --- | --- |
| Run code | Observed execution for that run and input | Semantic type validity, general correctness, or learning |
| Check types | Semantic diagnostics within the configured project and checker | Runtime behavior or conceptual understanding |
| Check solution | Behavior on the author's supplied cases | Correctness on every input or retained understanding |
| Explanation and changed task | Evidence of reasoning and application on that task | Broad mastery of an entire topic |
| Delayed unaided task | Evidence of retained learning under the stated conditions | Guaranteed transfer to every future setting |
| Completion mark | Progress through the material | A learning assessment |

Keep completion independent of checks. Transpilation does not establish
semantic type validity. A passing suite does not prove correctness outside its
cases. Use later unaided tasks and explanations before describing a concept as
secure, and state the scope of that conclusion.

## Make examples and the study interface honest

Verify observable output for every worked example. Verify that an exercise's
starter fails the intended behavior, a canonical solution passes, and a
plausible incorrect repair still fails. Browser execution is needed for embedded
programs; compiling an MDX page does not execute its code strings. Use the
authoring guide's verification workflow and report runtime limitations accurately.

Show the output and explanation in a worked example. Let running or revealing
disclose a prediction's answer. In a repair task, state the required behavior
without embedding the diagnosis in starter comments. Never invent console
results or attribute an execution failure to learning without inspecting it.

The following interface choices support those teaching purposes. They are
design inferences, not effects measured in the cited studies:

- Keep Run explicit so the learner can predict before seeing output.
- Keep relevant code, logs, errors, and feedback close together.
- Keep solutions available through a learner-controlled reveal.
- Check the learner's edited code and identify earlier results as stale after edits.
- Report execution, semantic diagnostics, and behavioral checks separately.
- Use a small relevant study surface and preserve keyboard access and readable
  layouts in both themes and on narrow screens.

## Evaluate learning and revise the course

For a pilot, choose two or three central objectives and write the rubric before
collecting results. Use an unaided prerequisite task, an immediate task with an
explanation, and a delayed changed task. Define permitted tools and assistance
for each. If API lookup is part of the real-world objective, distinguish it
from access to the worked solution or generated repair.

Assess correct behavior on new cases, explanation of the mechanism, selection
of an appropriate approach, and ability to locate a fault. Record help
separately. A rubric might distinguish a correct guess, a partial causal
explanation, and a correct explanation supported by a trace or counterexample;
choose descriptors appropriate to the objective rather than a universal score.

Compare immediate and delayed performance. Satisfaction, time on page,
completion, and speed to passing checks are useful experience signals but do
not substitute for a learning outcome. For lesson comparisons, hold content
and assessment constant, account for prior knowledge and attrition, and avoid
causal claims from an uncontrolled pilot. Obtain consent before collecting
learner analytics; this template does not currently collect them.

## Use research within its limits

The evidence here comes from a targeted online review of retrieval, spacing,
self-explanation, worked examples, feedback, productive failure, interleaving,
and AI-assisted learning. Searches included recent 2025–2026 work and checks of
the existing citations. Sources are original studies, original research
syntheses, publisher records, and author-hosted papers. The search did not exhaust
education databases, pool new effect sizes, or assess every study's risk of bias.
The template itself has not been experimentally validated.

Some claims were checked against accessible abstracts or indexed publisher
text rather than complete articles. Keep those claims within what the record
reports; do not invent subgroup findings or mechanisms. Prefer peer-reviewed
evidence for general guidance and label preprints as provisional. Publication
recency alone does not establish study quality.

Effect sizes describe particular comparisons, not promised improvements for
this course. Check the learners, task, comparison condition, help available,
assessment, and retention interval before applying a finding. Distinguish a
study's result from the course design choice inferred from it. Reassess the
evidence when the audience or objective changes, or stronger replications and
published versions become available.

## Review each lesson before publishing

- Name the capability and ensure the prerequisites support the first task.
- Explain the mechanism, show a concrete example, and state its boundary.
- Choose practice that requires the action named in the objective.
- Provide specific feedback and an explained solution, with help available.
- Plan later recall and a changed independent task for central objectives.
- Verify actual outputs and exercise variants against the stated contract.
- Keep completion, checks, assisted work, and learning evidence distinct.
- Cite checkable claims and preserve the research's scope and uncertainty.
- Check keyboard access, visual explanations, both themes, and narrow layouts.
