import { Suspense, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { getLesson, getNeighbors, partOf } from "../../curriculum";
import { MDXScope } from "../mdx/MDXComponents";
import { useIsComplete, useToggleComplete } from "../../hooks/useProgress";

function NotFound() {
  return (
    <article className="lesson">
      <div className="lesson__inner">
        <p className="lesson__eyebrow">Lost</p>
        <h1 className="lesson__title">That lesson doesn't exist</h1>
        <p className="prose">
          Pick one from the sidebar, or <Link to="/">start at the beginning</Link>.
        </p>
      </div>
    </article>
  );
}

function DraftView({ objectives }: { objectives: string[] }) {
  return (
    <div className="draft">
      <aside className="callout callout--note" role="note">
        <div className="callout__bar" aria-hidden="true" />
        <div className="callout__body">
          <div className="callout__content">
            <p>
              <strong>This lesson is on the roadmap but not written yet.</strong>{" "}
              The objectives below describe the planned work. Choose a written
              lesson from the sidebar to continue.
            </p>
          </div>
        </div>
      </aside>
      <h2>What this lesson will cover</h2>
      <ul>
        {objectives.map((o) => (
          <li key={o}>{o}</li>
        ))}
      </ul>
    </div>
  );
}

export default function LessonPage() {
  const { slug = "" } = useParams();
  const lesson = getLesson(slug);
  const toggle = useToggleComplete();
  const done = useIsComplete(slug);
  const { prev, next } = getNeighbors(slug);
  const part = partOf(slug);

  if (!lesson) return <NotFound />;

  const Component = lesson.Component;
  let body: ReactNode;
  if (lesson.status === "ready" && Component) {
    body = (
      <Suspense fallback={<div className="lesson__loading">Loading lesson…</div>}>
        <MDXScope>
          <Component />
        </MDXScope>
      </Suspense>
    );
  } else {
    body = <DraftView objectives={lesson.objectives} />;
  }

  return (
    <article className="lesson">
      <div className="lesson__inner">
        <header className="lesson__header">
          <p className="lesson__eyebrow">
            <span className="lesson__partnum">{part?.number}</span>
            {part?.title}
            <span className="lesson__time">· {lesson.minutes} min</span>
          </p>
          <h1 className="lesson__title">{lesson.title}</h1>
          <p className="lesson__blurb">{lesson.blurb}</p>

          <details className="lesson__objectives" open>
            <summary>In this lesson, you'll be able to…</summary>
            <ul>
              {lesson.objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </details>
        </header>

        <div className="lesson__content prose">{body}</div>

        <footer className="lesson__footer">
          <button
            type="button"
            className={`lesson__complete${done ? " is-done" : ""}`}
            onClick={() => toggle(slug)}
          >
            {done ? "✓ Completed — click to unmark" : "Mark this lesson complete"}
          </button>

          <nav className="lesson__nav" aria-label="Lesson navigation">
            {prev ? (
              <Link
                to={`/learn/${prev.slug}`}
                className="lesson__navlink lesson__navlink--prev"
              >
                <span className="lesson__navdir">← Previous</span>
                <span className="lesson__navtitle">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={`/learn/${next.slug}`}
                className="lesson__navlink lesson__navlink--next"
              >
                <span className="lesson__navdir">Next →</span>
                <span className="lesson__navtitle">{next.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </footer>
      </div>
    </article>
  );
}
