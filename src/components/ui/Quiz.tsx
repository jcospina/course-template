import { useState, type ReactNode } from "react";

export interface Choice {
  /** The answer text. */
  label: ReactNode;
  correct?: boolean;
  /** Shown after selection — explain WHY right or wrong. */
  feedback: ReactNode;
}

/**
 * Single-answer multiple choice with per-option feedback. The point isn't the
 * score — it's the feedback on every option, which teaches the misconception
 * behind each wrong answer.
 */
export default function Quiz({
  question,
  choices,
}: {
  question: ReactNode;
  choices: Choice[];
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;

  return (
    <div className="quiz">
      <p className="quiz__q">
        <span className="quiz__tag">Check yourself</span>
        {question}
      </p>
      <ul className="quiz__choices" role="list">
        {choices.map((c, i) => {
          const isPicked = picked === i;
          const state = !answered
            ? "idle"
            : c.correct
              ? "correct"
              : isPicked
                ? "wrong"
                : "muted";
          return (
            <li key={i}>
              <button
                type="button"
                className={`quiz__choice quiz__choice--${state}`}
                onClick={() => !answered && setPicked(i)}
                disabled={answered}
                aria-pressed={isPicked}
              >
                <span className="quiz__marker" aria-hidden="true">
                  {answered && c.correct
                    ? "✓"
                    : answered && isPicked
                      ? "✕"
                      : String.fromCharCode(65 + i)}
                </span>
                <span className="quiz__label">{c.label}</span>
              </button>
              {answered && (isPicked || c.correct) && (
                <p className={`quiz__feedback quiz__feedback--${state}`}>
                  {c.feedback}
                </p>
              )}
            </li>
          );
        })}
      </ul>
      {answered && (
        <button
          type="button"
          className="quiz__reset"
          onClick={() => setPicked(null)}
        >
          Try again
        </button>
      )}
    </div>
  );
}
