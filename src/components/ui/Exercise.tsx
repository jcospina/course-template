import { useState, type ReactNode } from "react";

/**
 * "Your turn" — a task to attempt before revealing a worked solution.
 * The reveal is deliberately gated so the learner builds the muscle first.
 */
export default function Exercise({
  title = "Your turn",
  prompt,
  children,
  difficulty,
}: {
  title?: string;
  prompt: ReactNode;
  /** The reveal-able solution / walkthrough. */
  children: ReactNode;
  difficulty?: "warm-up" | "core" | "stretch";
}) {
  const [open, setOpen] = useState(false);
  return (
    <section className="exercise">
      <header className="exercise__head">
        <span className="exercise__badge">{title}</span>
        {difficulty && (
          <span className={`exercise__diff exercise__diff--${difficulty}`}>
            {difficulty}
          </span>
        )}
      </header>
      <div className="exercise__prompt">{prompt}</div>
      <button
        type="button"
        className="exercise__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {open ? "Hide solution" : "Reveal solution & walkthrough"}
      </button>
      {open && <div className="exercise__solution">{children}</div>}
    </section>
  );
}
