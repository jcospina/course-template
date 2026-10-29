import { Highlight, type PrismTheme } from "prism-react-renderer";
import { useState, type ReactNode } from "react";
import { useTheme } from "../../theme/ThemeProvider";

const lightTheme: PrismTheme = {
  plain: { color: "#2c2a26", backgroundColor: "transparent" },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#9c968c", fontStyle: "italic" } },
    { types: ["punctuation"], style: { color: "#6f6a62" } },
    { types: ["property", "tag", "constant", "symbol", "deleted"], style: { color: "#0d8f86" } },
    { types: ["boolean", "number"], style: { color: "#b8590a" } },
    { types: ["selector", "attr-name", "string", "char", "builtin", "inserted"], style: { color: "#1f7a4d" } },
    { types: ["operator", "entity", "url"], style: { color: "#6f6a62" } },
    { types: ["atrule", "attr-value", "keyword"], style: { color: "#9333a8" } },
    { types: ["function", "class-name"], style: { color: "#2563b8" } },
    { types: ["regex", "important", "variable"], style: { color: "#b4232a" } },
  ],
};

const darkTheme: PrismTheme = {
  plain: { color: "#d7d5cd", backgroundColor: "transparent" },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#6a6760", fontStyle: "italic" } },
    { types: ["punctuation"], style: { color: "#98948c" } },
    { types: ["property", "tag", "constant", "symbol", "deleted"], style: { color: "#4fd6c9" } },
    { types: ["boolean", "number"], style: { color: "#f0915b" } },
    { types: ["selector", "attr-name", "string", "char", "builtin", "inserted"], style: { color: "#7fd99a" } },
    { types: ["operator", "entity", "url"], style: { color: "#98948c" } },
    { types: ["atrule", "attr-value", "keyword"], style: { color: "#c792ea" } },
    { types: ["function", "class-name"], style: { color: "#82aaff" } },
    { types: ["regex", "important", "variable"], style: { color: "#ff6b72" } },
  ],
};

function extract(node: ReactNode): { code: string; lang: string } {
  // MDX maps a fenced block to <pre><code className="language-x">…</code></pre>.
  const el = node as {
    props?: { className?: string; children?: string };
  };
  const className = el?.props?.className ?? "";
  const match = /language-(\w+)/.exec(className);
  const raw = el?.props?.children ?? "";
  return { code: String(raw).replace(/\n$/, ""), lang: match?.[1] ?? "tsx" };
}

/**
 * Syntax-highlighted, read-only code with a copy button. Shared by the MDX
 * `<pre>` renderer and by `CodeExercise` (for the revealed solution), so both
 * surfaces look identical.
 */
export function StaticCode({
  code,
  lang = "tsx",
  label,
}: {
  code: string;
  lang?: string;
  /** Optional override for the little language tag in the corner. */
  label?: string;
}) {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard may be unavailable */
    }
  }

  return (
    <div className="codeblock">
      <div className="codeblock__top">
        <span className="codeblock__lang">{label ?? lang}</span>
        <button type="button" className="codeblock__copy" onClick={copy}>
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <Highlight
        code={code}
        language={lang === "vue" || lang === "svelte" ? "markup" : lang}
        theme={theme === "dark" ? darkTheme : lightTheme}
      >
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="codeblock__pre">
            <code>
              {tokens.map((line, i) => (
                <span key={i} {...getLineProps({ line })} className="codeblock__line">
                  <span className="codeblock__ln" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="codeblock__lc">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </span>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}

export function Pre({ children }: { children?: ReactNode }) {
  const { code, lang } = extract(children);
  return <StaticCode code={code} lang={lang} />;
}
