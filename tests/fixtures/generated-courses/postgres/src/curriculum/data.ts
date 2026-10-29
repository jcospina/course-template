import type { Accent } from "./types";
export interface RawLesson {slug:string;title:string;blurb:string;minutes:number;objectives:string[];file:string}
export interface RawPart {id:string;number:string;title:string;tagline:string;accent:Accent;lessons:RawLesson[]}
export const PARTS: RawPart[] = [
  {
    "id": "postgres",
    "number": "01",
    "title": "PostgreSQL by evidence",
    "tagline": "Filter rows, aggregate values, and verify a bounded mutation.",
    "accent": "primary",
    "lessons": [
      {
        "slug": "start",
        "title": "Read tables and test a query",
        "blurb": "Use fresh seeded runs while separating progress from understanding.",
        "minutes": 18,
        "objectives": [
          "Use fresh seeded runs while separating progress from understanding."
        ],
        "file": "/src/lessons/course/start.mdx"
      },
      {
        "slug": "filter",
        "title": "A predicate chooses rows",
        "blurb": "Return every item matching a condition.",
        "minutes": 18,
        "objectives": [
          "Return every item matching a condition."
        ],
        "file": "/src/lessons/course/filter.mdx"
      },
      {
        "slug": "group",
        "title": "Aggregation changes the unit of a row",
        "blurb": "Explain grouping and distinguish counts from sums.",
        "minutes": 18,
        "objectives": [
          "Explain grouping and distinguish counts from sums."
        ],
        "file": "/src/lessons/course/group.mdx"
      },
      {
        "slug": "mutation",
        "title": "A mutation needs a boundary",
        "blurb": "Update one item and inspect the resulting state.",
        "minutes": 18,
        "objectives": [
          "Update one item and inspect the resulting state."
        ],
        "file": "/src/lessons/course/mutation.mdx"
      }
    ]
  }
];
