import { NavLink } from "react-router-dom";
import { curriculum, totals } from "../../curriculum";
import { useCompletedSet } from "../../hooks/useProgress";
import { course } from "../../course.config";

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const completed = useCompletedSet();
  const doneCount = completed.size;
  const pct = Math.round((doneCount / totals.lessons) * 100);

  return (
    <nav className="sidebar" aria-label="Course contents">
      <div className="sidebar__brandwrap">
        <NavLink to="/" className="sidebar__brand" onClick={onNavigate}>
          <span className="sidebar__mark" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span className="sidebar__brandtext">
            <strong>{course.brandName}</strong>
            <span>{course.brandTagline}</span>
          </span>
        </NavLink>
        <div className="sidebar__progress" title={`${doneCount} of ${totals.lessons} lessons complete`}>
          <div className="sidebar__progressbar">
            <span style={{ width: `${pct}%` }} />
          </div>
          <span className="sidebar__progresslabel">
            {doneCount}/{totals.lessons} done
          </span>
        </div>
      </div>

      <div className="sidebar__scroll">
        {curriculum.map((part) => {
          const partDone = part.lessons.filter((l) => completed.has(l.slug)).length;
          return (
            <section key={part.id} className="sidebar__part" data-accent={part.accent}>
              <header className="sidebar__parthead">
                <span className="sidebar__partnum">{part.number}</span>
                <span className="sidebar__parttitle">{part.title}</span>
                <span className="sidebar__partcount">
                  {partDone}/{part.lessons.length}
                </span>
              </header>
              <ul className="sidebar__lessons" role="list">
                {part.lessons.map((lesson) => {
                  const isDone = completed.has(lesson.slug);
                  const isDraft = lesson.status === "draft";
                  return (
                    <li key={lesson.slug}>
                      <NavLink
                        to={`/learn/${lesson.slug}`}
                        className={({ isActive }) =>
                          `sidebar__lesson${isActive ? " is-active" : ""}${
                            isDraft ? " is-draft" : ""
                          }${isDone ? " is-done" : ""}`
                        }
                        onClick={onNavigate}
                      >
                        <span className="sidebar__dot" aria-hidden="true">
                          {isDone ? "✓" : ""}
                        </span>
                        <span className="sidebar__lessontitle">{lesson.title}</span>
                        {isDraft && <span className="sidebar__soon">soon</span>}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
        <div className="sidebar__foot">
          <p>
            {totals.ready} of {totals.lessons} lessons written ·{" "}
            {Math.round(totals.minutes / 60)}h of material
          </p>
        </div>
      </div>
    </nav>
  );
}
