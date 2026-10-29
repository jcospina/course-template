import { useState, type ReactNode } from "react";

/**
 * Socratic prompt: ask the learner to commit to a prediction BEFORE revealing
 * the answer. This learner-controlled reveal encourages a prediction; a click
 * does not establish that the learner attempted it or retained the explanation.
 */
export default function Predict({
  question,
  children,
  cta = "Reveal the answer",
}: {
  question: ReactNode;
  children: ReactNode;
  cta?: string;
}) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className={`predict ${revealed ? "is-open" : ""}`}>
      <div className="predict__head">
        <span className="predict__tag">Predict first</span>
        <div className="predict__q">{question}</div>
      </div>
      {!revealed ? (
        <button
          type="button"
          className="predict__btn"
          onClick={() => setRevealed(true)}
        >
          {cta}
          <span aria-hidden="true"> →</span>
        </button>
      ) : (
        <div className="predict__answer" role="region" aria-label="Answer">
          {children}
        </div>
      )}
    </div>
  );
}
