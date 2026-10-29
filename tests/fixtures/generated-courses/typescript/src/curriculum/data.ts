import type { Accent } from "./types";
export interface RawLesson {slug:string;title:string;blurb:string;minutes:number;objectives:string[];file:string}
export interface RawPart {id:string;number:string;title:string;tagline:string;accent:Accent;lessons:RawLesson[]}
export const PARTS: RawPart[] = [
  {
    "id": "typescript",
    "number": "01",
    "title": "Data structures in TypeScript",
    "tagline": "Trace invariants and repair a stack, queue, and binary search.",
    "accent": "primary",
    "lessons": [
      {
        "slug": "start",
        "title": "Work with evidence",
        "blurb": "Separate execution, types, tests, and independent understanding.",
        "minutes": 18,
        "objectives": [
          "Separate execution, types, tests, and independent understanding."
        ],
        "file": "/src/lessons/course/start.mdx"
      },
      {
        "slug": "stack",
        "title": "A stack preserves the last unfinished task",
        "blurb": "Repair LIFO removal and explain its invariant.",
        "minutes": 18,
        "objectives": [
          "Repair LIFO removal and explain its invariant."
        ],
        "file": "/src/lessons/course/stack.mdx"
      },
      {
        "slug": "queue",
        "title": "A queue keeps arrival order",
        "blurb": "Compare FIFO behavior with storage costs.",
        "minutes": 18,
        "objectives": [
          "Compare FIFO behavior with storage costs."
        ],
        "file": "/src/lessons/course/queue.mdx"
      },
      {
        "slug": "search",
        "title": "Binary search needs a shrinking interval",
        "blurb": "Repair the search boundary and explain termination.",
        "minutes": 18,
        "objectives": [
          "Repair the search boundary and explain termination."
        ],
        "file": "/src/lessons/course/search.mdx"
      }
    ]
  }
];
