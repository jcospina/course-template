import { Link } from "react-router-dom";
import { curriculum, flatLessons, totals } from "../../curriculum";
import { useCompletedSet } from "../../hooks/useProgress";
import { course } from "../../course.config";

export default function HomePage() {
  const completed = useCompletedSet();
  const firstUnfinished =
    flatLessons.find((l) => !completed.has(l.slug)) ?? flatLessons[0];
  const started = completed.size > 0;
  const { hero, spotlight, pathSection } = course;

  return (
    <div className="home">
      <section className="hero">
        <p className="hero__eyebrow">{hero.eyebrow}</p>
        <h1 className="hero__title">
          {hero.titleLead}
          <br />
          <span className="hero__title-accent">{hero.titleAccent}</span>
        </h1>
        <p className="hero__lede">{hero.lede}</p>
        <div className="hero__cta">
          <Link to={`/learn/${firstUnfinished.slug}`} className="btn btn--primary">
            {started ? hero.primaryCtaResume : hero.primaryCtaStart}
            <span aria-hidden="true"> →</span>
          </Link>
          {hero.ghostCta && hero.ghostCtaSlug && (
            <Link to={`/learn/${hero.ghostCtaSlug}`} className="btn btn--ghost">
              {hero.ghostCta}
            </Link>
          )}
        </div>
        <dl className="hero__stats">
          <div>
            <dt>Parts</dt>
            <dd>{totals.parts}</dd>
          </div>
          <div>
            <dt>Lessons</dt>
            <dd>{totals.lessons}</dd>
          </div>
          <div>
            <dt>Material</dt>
            <dd>~{Math.max(1, Math.round(totals.minutes / 60))}h</dd>
          </div>
          <div>
            <dt>Live playgrounds</dt>
            <dd>yes</dd>
          </div>
        </dl>
      </section>

      {spotlight && (
        <section className="home__section">
          <div className="home__sectionhead">
            <h2>{spotlight.heading}</h2>
            <p>{spotlight.blurb}</p>
          </div>
          <ul className="probs" role="list">
            {spotlight.rows.map((p) => (
              <li key={p.label} className="probs__row">
                <span className="probs__label">{p.label}</span>
                <span className="probs__track" aria-hidden="true">
                  <span className="probs__fill" style={{ width: `${p.pct}%` }} />
                </span>
                <span className="probs__pct">{p.pct}%</span>
                <span className="probs__note">{p.note}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="home__section">
        <div className="home__sectionhead">
          <h2>{pathSection.heading}</h2>
          <p>{pathSection.blurb}</p>
        </div>
        <div className="parts-grid">
          {curriculum.map((part) => {
            const done = part.lessons.filter((l) => completed.has(l.slug)).length;
            return (
              <Link
                key={part.id}
                to={`/learn/${part.lessons[0].slug}`}
                className="partcard"
                data-accent={part.accent}
              >
                <div className="partcard__top">
                  <span className="partcard__num">{part.number}</span>
                  <span className="partcard__count">
                    {done}/{part.lessons.length}
                  </span>
                </div>
                <h3 className="partcard__title">{part.title}</h3>
                <p className="partcard__tagline">{part.tagline}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className="home__foot">
        <p>{course.footer}</p>
      </footer>
    </div>
  );
}
