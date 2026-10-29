import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * A thin progress bar that reflects how far down the page the reader has
 * scrolled. Resets on navigation. Purely decorative, so it's aria-hidden.
 */
export default function ReadingProgress() {
  const [pct, setPct] = useState(0);
  const location = useLocation();

  useEffect(() => {
    function update() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setPct(max > 0 ? Math.min(100, (doc.scrollTop / max) * 100) : 0);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [location.pathname]);

  return (
    <div className="readprogress" aria-hidden="true">
      <span style={{ width: `${pct}%` }} />
    </div>
  );
}
