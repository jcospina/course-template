import type { Accent } from "./types";

/**
 * ============================================================
 *  THE COURSE MAP — your second-most-edited file (after lessons).
 * ============================================================
 *
 * Every lesson declares its intended MDX `file`. A lesson is
 * automatically "ready" the moment that file exists on disk (see
 * index.ts); until then it renders a placeholder listing its
 * objectives. So the workflow is:
 *
 *   1. Add an L(...) entry here under the right part.
 *   2. Create the .mdx file at the path it points to.
 *   3. It lights up. No registration, no imports.
 *
 * The three parts below are a worked example. Replace them with
 * your own — keep `00-orientation` as the on-ramp, then order parts
 * so each builds on the last. See docs/COURSE-PLAYBOOK.md.
 */

export interface RawLesson {
  slug: string;
  title: string;
  blurb: string;
  minutes: number;
  objectives: string[];
  file: string;
}
export interface RawPart {
  id: string;
  number: string;
  title: string;
  tagline: string;
  accent: Accent;
  lessons: RawLesson[];
}

const L = (
  slug: string,
  title: string,
  blurb: string,
  minutes: number,
  objectives: string[],
  folder: string,
): RawLesson => ({
  slug,
  title,
  blurb,
  minutes,
  objectives,
  file: `/src/lessons/${folder}/${slug}.mdx`,
});

export const PARTS: RawPart[] = [
  {
    id: "orientation",
    number: "00",
    title: "Orientation",
    tagline: "How to use the examples, feedback, and progress controls.",
    accent: "primary",
    lessons: [
      L(
        "welcome",
        "Start here",
        "Run examples, use feedback, and check what you retained.",
        8,
        [
          "Run, stop, and reset an example in the lesson.",
          "Use predictions and feedback to revise an explanation.",
          "Distinguish saved progress from independent understanding.",
        ],
        "00-orientation",
      ),
    ],
  },
  {
    id: "foundations",
    number: "01",
    title: "Foundations",
    tagline: "Connect an explanation to practice and feedback.",
    accent: "primary",
    lessons: [
      L(
        "first-principles",
        "Teach with examples and feedback",
        "Trace a mechanism, repair a function, and see how the teaching components fit.",
        14,
        [
          "Explain how a running total carries values between iterations.",
          "Repair an average function and check it against several inputs.",
          "Choose a teaching component for a concrete learning task.",
        ],
        "01-foundations",
      ),
      // A draft lesson: no file exists for it yet, so it renders the
      // placeholder. Delete this entry or write its .mdx to make it real.
      L(
        "going-further",
        "Going further (draft demo)",
        "See how a planned lesson displays its objectives before it is written.",
        10,
        [
          "Demonstrate the draft placeholder state.",
          "Navigate to a planned lesson and read its objectives.",
        ],
        "01-foundations",
      ),
    ],
  },
  {
    id: "deep-dive",
    number: "02",
    title: "Runtime examples",
    tagline: "Compare console logs, type errors, query results, and HTTP responses.",
    accent: "secondary",
    lessons: [
      L(
        "console-and-multifile",
        "Run code and check its results",
        "Run browser, Node.js, and PostgreSQL examples; inspect output and check repairs.",
        12,
        [
          "Run a logic example and compare its output with a prediction.",
          "Check TypeScript types across multiple files.",
          "Distinguish runtime output, type diagnostics, and behavioral checks.",
        ],
        "02-deep-dive",
      ),
    ],
  },
];
