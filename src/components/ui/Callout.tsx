import type { ReactNode } from "react";

type Variant = "why" | "insight" | "pitfall" | "interview" | "note" | "analogy";

const META: Record<Variant, { label: string; icon: string }> = {
  why: { label: "Why this matters", icon: "✦" },
  insight: { label: "Key insight", icon: "◆" },
  pitfall: { label: "Common trap", icon: "▲" },
  interview: { label: "In the interview", icon: "◎" },
  note: { label: "Note", icon: "•" },
  analogy: { label: "Analogy", icon: "❋" },
};

export default function Callout({
  variant = "note",
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: ReactNode;
}) {
  const meta = META[variant];
  return (
    <aside className={`callout callout--${variant}`} role="note">
      <div className="callout__bar" aria-hidden="true" />
      <div className="callout__body">
        <p className="callout__label">
          <span className="callout__icon" aria-hidden="true">
            {meta.icon}
          </span>
          {title ?? meta.label}
        </p>
        <div className="callout__content">{children}</div>
      </div>
    </aside>
  );
}
