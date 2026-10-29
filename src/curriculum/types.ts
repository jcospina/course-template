import type { ComponentType, LazyExoticComponent } from "react";

export type LessonStatus = "ready" | "draft";
/**
 * How heavily a part is weighted. Purely informational today (use it in
 * authoring to decide depth), but kept in the type so tooling can surface it.
 */
export type Weight = "core" | "deep" | "breadth";
/** Which of the two theme accents a part uses for its highlights. */
export type Accent = "primary" | "secondary";

export interface Lesson {
  /** Unique slug — used in the URL as /learn/:slug */
  slug: string;
  title: string;
  /** One-line description shown in cards and tooltips. */
  blurb: string;
  /** Estimated focused-reading minutes. */
  minutes: number;
  /** What you'll be able to do after this lesson. Shown as the intro. */
  objectives: string[];
  status: LessonStatus;
  /** Vite glob key for the MDX module, present when status === "ready". */
  file?: string;
  /** Lazily-resolved MDX component, wired up in index.ts. */
  Component?: LazyExoticComponent<ComponentType<Record<string, unknown>>>;
}

export interface Part {
  id: string;
  /** Display number, e.g. "01". */
  number: string;
  title: string;
  tagline: string;
  accent: Accent;
  lessons: Lesson[];
}

export interface FlatLesson extends Lesson {
  partId: string;
  partNumber: string;
  partTitle: string;
  accent: Accent;
  /** Global index across the whole curriculum, for prev/next. */
  index: number;
}
