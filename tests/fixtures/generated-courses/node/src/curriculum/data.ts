import type { Accent } from "./types";
export interface RawLesson {slug:string;title:string;blurb:string;minutes:number;objectives:string[];file:string}
export interface RawPart {id:string;number:string;title:string;tagline:string;accent:Accent;lessons:RawLesson[]}
export const PARTS: RawPart[] = [
  {
    "id": "node",
    "number": "01",
    "title": "Node requests and contracts",
    "tagline": "Build and test a small HTTP API with explicit route behavior.",
    "accent": "primary",
    "lessons": [
      {
        "slug": "start",
        "title": "Separate a script from a server",
        "blurb": "Run browser Node code and inspect its limits.",
        "minutes": 18,
        "objectives": [
          "Run browser Node code and inspect its limits."
        ],
        "file": "/src/lessons/course/start.mdx"
      },
      {
        "slug": "functions",
        "title": "Make a small contract executable",
        "blurb": "Repair a pure function before using it in a handler.",
        "minutes": 18,
        "objectives": [
          "Repair a pure function before using it in a handler."
        ],
        "file": "/src/lessons/course/functions.mdx"
      },
      {
        "slug": "routes",
        "title": "A route is a request contract",
        "blurb": "Return JSON at /health and reject unknown paths.",
        "minutes": 18,
        "objectives": [
          "Return JSON at /health and reject unknown paths."
        ],
        "file": "/src/lessons/course/routes.mdx"
      },
      {
        "slug": "transfer",
        "title": "Test the negative space",
        "blurb": "Design route cases before implementing a new endpoint.",
        "minutes": 18,
        "objectives": [
          "Design route cases before implementing a new endpoint."
        ],
        "file": "/src/lessons/course/transfer.mdx"
      }
    ]
  }
];
