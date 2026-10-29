import type { Accent } from "./types";
export interface RawLesson {slug:string;title:string;blurb:string;minutes:number;objectives:string[];file:string}
export interface RawPart {id:string;number:string;title:string;tagline:string;accent:Accent;lessons:RawLesson[]}
export const PARTS: RawPart[] = [
  {
    "id": "vue",
    "number": "01",
    "title": "Vue from state to view",
    "tagline": "Build reactive state and derive a view without duplicating data.",
    "accent": "primary",
    "lessons": [
      {
        "slug": "start",
        "title": "Observe a changing view",
        "blurb": "Use browser output while distinguishing compilation from type checking.",
        "minutes": 18,
        "objectives": [
          "Use browser output while distinguishing compilation from type checking."
        ],
        "file": "/src/lessons/course/start.mdx"
      },
      {
        "slug": "state",
        "title": "A ref connects a value to rendering",
        "blurb": "Change reactive state and explain template unwrapping.",
        "minutes": 18,
        "objectives": [
          "Change reactive state and explain template unwrapping."
        ],
        "file": "/src/lessons/course/state.mdx"
      },
      {
        "slug": "derive",
        "title": "Keep derived data derived",
        "blurb": "Use a computed value instead of a second independently maintained total.",
        "minutes": 18,
        "objectives": [
          "Use a computed value instead of a second independently maintained total."
        ],
        "file": "/src/lessons/course/derive.mdx"
      },
      {
        "slug": "transfer",
        "title": "Repair a stale derived value",
        "blurb": "Apply the state dependency model without the previous implementation.",
        "minutes": 18,
        "objectives": [
          "Apply the state dependency model without the previous implementation."
        ],
        "file": "/src/lessons/course/transfer.mdx"
      }
    ]
  }
];
