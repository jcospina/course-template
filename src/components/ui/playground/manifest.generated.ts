/* Generated from schemas/example.schema.json. Run bun run schema:types. */

export interface ExampleManifest {
  schemaVersion: 1;
  preset:
    | "html-css"
    | "javascript"
    | "typescript"
    | "react"
    | "react-ts"
    | "vue"
    | "vue-ts"
    | "svelte"
    | "svelte-ts"
    | "angular"
    | "node"
    | "node-ts"
    | "postgres"
    | "custom-web";
  title?: string;
  sources: {
    [k: string]: string;
  };
  solutionSources?: {
    [k: string]: string;
  };
  solutionRemoveFiles?: string[];
  dependencies?: {
    [k: string]: string;
  };
  editor?: {
    activeFile?: string;
    hiddenFiles?: string[];
    readOnlyFiles?: string[];
  };
  database?: {
    seed: string;
  };
  checks?: {
    kind: "browser-jest" | "sql-result" | "sql-state" | "node-assert" | "node-http";
    sources?: {
      [k: string]: string;
    };
    /**
     * @minItems 1
     */
    cases?: [
      {
        name: string;
        statement?: number;
        query?: string;
        columns: string[];
        rows: (
          | (string | boolean | null)
          | number
          | {
              type: "decimal" | "bigint" | "date";
              value: string;
            }
        )[][];
        ordered?: boolean;
      },
      ...{
        name: string;
        statement?: number;
        query?: string;
        columns: string[];
        rows: (
          | (string | boolean | null)
          | number
          | {
              type: "decimal" | "bigint" | "date";
              value: string;
            }
        )[][];
        ordered?: boolean;
      }[]
    ];
    /**
     * @minItems 1
     * @maxItems 20
     */
    httpCases?:
      | [
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          }
        ]
      | [
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          }
        ]
      | [
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          }
        ]
      | [
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          }
        ]
      | [
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          }
        ]
      | [
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          }
        ]
      | [
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          }
        ]
      | [
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          }
        ]
      | [
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          }
        ]
      | [
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          }
        ]
      | [
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          }
        ]
      | [
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          }
        ]
      | [
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          }
        ]
      | [
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          }
        ]
      | [
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          }
        ]
      | [
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          }
        ]
      | [
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          }
        ]
      | [
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          }
        ]
      | [
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          }
        ]
      | [
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          },
          {
            name: string;
            request: {
              method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
              path: string;
              headers?: {
                [k: string]: string;
              };
              body?: string;
            };
            status: number;
            headers?: {
              [k: string]: string;
            };
            body?: string;
          }
        ];
  };
  project?: {
    environment: "static" | "parcel" | "create-react-app" | "vue-cli" | "angular-cli" | "svelte" | "node";
    entry: string;
    activeFile: string;
    output: "preview" | "console";
  };
  verification?: {
    starterChecks?: "pass" | "fail";
    rejectedSources?: {
      [k: string]: string;
    };
    /**
     * @maxItems 30
     */
    steps?: {
      action: "console" | "preview" | "click" | "checks" | "sql" | "http";
      text?: string;
      role?: "button" | "link" | "checkbox" | "textbox";
      name?: string;
      outcome?: "pass" | "fail";
      request?: {
        method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
        path: string;
        headers?: {
          [k: string]: string;
        };
        body?: string;
      };
      status?: number;
      headers?: {
        [k: string]: string;
      };
      body?: string;
    }[];
  };
  server?: {
    port: number;
    startPath?: string;
  };
  /**
   * @minItems 1
   * @maxItems 20
   */
  requests?:
    | [
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        }
      ]
    | [
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        }
      ]
    | [
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        }
      ]
    | [
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        }
      ]
    | [
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        }
      ]
    | [
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        }
      ]
    | [
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        }
      ]
    | [
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        }
      ]
    | [
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        }
      ]
    | [
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        }
      ]
    | [
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        }
      ]
    | [
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        }
      ]
    | [
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        }
      ]
    | [
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        }
      ]
    | [
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        }
      ]
    | [
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        }
      ]
    | [
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        }
      ]
    | [
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        }
      ]
    | [
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        }
      ]
    | [
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        },
        {
          method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
          path: string;
          headers?: {
            [k: string]: string;
          };
          body?: string;
        }
      ];
}
