import { lazy } from "react";
import type { ComponentType } from "react";
import { PARTS } from "./data";
import type { FlatLesson, Lesson, Part } from "./types";

/**
 * Eagerly-known set of MDX modules. Vite turns this glob into a static map of
 * `path -> () => import(path)`. A lesson becomes "ready" the moment its file
 * exists here, so authoring is just: drop in the .mdx, and it lights up.
 */
const mdxModules = import.meta.glob("/src/lessons/**/*.mdx");

type MdxLoader = () => Promise<{ default: ComponentType<Record<string, unknown>> }>;

export const curriculum: Part[] = PARTS.map((part) => ({
  ...part,
  lessons: part.lessons.map((raw): Lesson => {
    const loader = mdxModules[raw.file] as MdxLoader | undefined;
    return {
      slug: raw.slug,
      title: raw.title,
      blurb: raw.blurb,
      minutes: raw.minutes,
      objectives: raw.objectives,
      file: raw.file,
      status: loader ? "ready" : "draft",
      Component: loader ? lazy(loader) : undefined,
    };
  }),
}));

/** Flat, ordered list of every lesson — the reading order of the course. */
export const flatLessons: FlatLesson[] = curriculum.flatMap((part) =>
  part.lessons.map((lesson, i) => ({
    ...lesson,
    partId: part.id,
    partNumber: part.number,
    partTitle: part.title,
    accent: part.accent,
    // index assigned after the flatMap so it's globally sequential
    index: i,
  })),
);
// Re-assign a true global index for prev/next.
flatLessons.forEach((l, i) => {
  l.index = i;
});

const bySlug = new Map(flatLessons.map((l) => [l.slug, l]));

export function getLesson(slug: string): FlatLesson | undefined {
  return bySlug.get(slug);
}

export function getNeighbors(slug: string): {
  prev?: FlatLesson;
  next?: FlatLesson;
} {
  const lesson = bySlug.get(slug);
  if (!lesson) return {};
  return {
    prev: flatLessons[lesson.index - 1],
    next: flatLessons[lesson.index + 1],
  };
}

export const totals = {
  parts: curriculum.length,
  lessons: flatLessons.length,
  ready: flatLessons.filter((l) => l.status === "ready").length,
  minutes: flatLessons.reduce((sum, l) => sum + l.minutes, 0),
};

export function partOf(slug: string): Part | undefined {
  return curriculum.find((p) => p.lessons.some((l) => l.slug === slug));
}
