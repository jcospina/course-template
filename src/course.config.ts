/**
 * ============================================================
 *  THE ONE FILE YOU EDIT TO REBRAND A NEW COURSE.
 * ============================================================
 *
 * Everything course-specific that *isn't* a lesson lives here:
 * the name in the sidebar, the hero copy on the home page, the
 * landing-page sections, and the localStorage namespace.
 *
 * Change these strings, write your lessons + curriculum map
 * (src/curriculum/data.ts), and you have a new course. You should
 * not need to touch the components, the layout, or the styles.
 */

export interface CourseConfig {
  /** Short brand shown in the sidebar logo, e.g. "Postgres". */
  brandName: string;
  playground?: { defaultPreset?: import("./components/ui/playground/types").PresetId };
  /** Sub-line under the brand, e.g. "From Tables to Transactions". */
  brandTagline: string;
  /** Breadcrumb text in the top bar — usually "<brand> <tagline>". */
  crumb: string;
  /** Browser tab / <title> text and meta description. */
  documentTitle: string;
  metaDescription: string;

  /**
   * Namespace for localStorage keys (theme + progress). Keep it unique
   * per course so two courses served from the same origin don't clash.
   * e.g. "postgres-course".
   */
  storagePrefix: string;

  /** The landing page. All copy lives here so the home page stays generic. */
  hero: {
    eyebrow: string;
    /** The title is split so the second clause can carry the accent gradient. */
    titleLead: string;
    titleAccent: string;
    lede: string;
    primaryCtaStart: string;
    primaryCtaResume: string;
    /** Optional secondary button. Omit `ghostCta` to hide it. */
    ghostCta?: string;
    /** Slug the ghost button links to (must exist in the curriculum). */
    ghostCtaSlug?: string;
  };

  /**
   * Optional "what this really covers" section — a list of weighted bars.
   * In the reference course this was "what the interview actually asks".
   * Reuse it for anything rankable (topic emphasis, exam weighting, …),
   * or set to `null` to hide the whole section.
   */
  spotlight: {
    heading: string;
    blurb: string;
    rows: { label: string; pct: number; note: string }[];
  } | null;

  /** Heading + blurb for the auto-generated "parts" grid. */
  pathSection: {
    heading: string;
    blurb: string;
  };

  /** Small print at the bottom of the home page. */
  footer: string;
}

export const course: CourseConfig = {
  playground: { defaultPreset: "typescript" },
  brandName: "Your Course",
  brandTagline: "Learn with runnable examples",
  crumb: "Your Course · Interactive",
  documentTitle: "Your Course — runnable examples and exercises",
  metaDescription:
    "Explore sample lessons with editable code, predictions, quizzes, and worked solutions.",

  storagePrefix: "your-course",

  hero: {
    eyebrow: "Interactive course template",
    titleLead: "Run the code.",
    titleAccent: "Explain what happens.",
    lede:
      "Trace a running total, repair an average function, and compare code output with your predictions. These sample lessons show how to teach with editable examples, feedback, and worked solutions.",
    primaryCtaStart: "Start the course",
    primaryCtaResume: "Resume where you left off",
    ghostCta: "How to use the course",
    ghostCtaSlug: "welcome",
  },

  // Set topic weights only when the course has a basis for those numbers.
  spotlight: null,

  pathSection: {
    heading: "Sample lessons",
    blurb:
      "Start with the editor controls, then explore teaching components and runtime examples. The draft entry shows how an unwritten lesson appears.",
  },

  footer:
    "Progress is saved in this browser. Code examples need network access; keep secrets out of the editors.",
};
