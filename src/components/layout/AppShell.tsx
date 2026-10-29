import { useEffect, useState, type MouseEvent } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ReadingProgress from "./ReadingProgress";
import { useTheme } from "../../theme/ThemeProvider";
import { useCrossTabSync } from "../../hooks/useProgress";
import { course } from "../../course.config";

export default function AppShell() {
  const { theme, toggle } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useCrossTabSync();

  // Delegated handler so any internal <a href="/..."> (including the literal
  // anchors authored inside MDX callouts) navigates client-side instead of
  // triggering a full page reload. React Router <Link> clicks already
  // preventDefault, so we skip those via e.defaultPrevented.
  function handleInternalLinks(e: MouseEvent<HTMLElement>) {
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const anchor = (e.target as HTMLElement).closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (!href || !href.startsWith("/")) return;
    if (anchor.target === "_blank") return;
    e.preventDefault();
    navigate(href);
  }

  // Close the mobile drawer + scroll to top on route change.
  useEffect(() => {
    setDrawerOpen(false);
    document.querySelector(".content")?.scrollTo({ top: 0 });
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className={`shell${drawerOpen ? " drawer-open" : ""}`}>
      <button
        type="button"
        className="shell__scrim"
        aria-label="Close menu"
        tabIndex={drawerOpen ? 0 : -1}
        onClick={() => setDrawerOpen(false)}
      />

      <aside className="shell__sidebar">
        <Sidebar onNavigate={() => setDrawerOpen(false)} />
      </aside>

      <div className="shell__main">
        <header className="topbar">
          <button
            type="button"
            className="topbar__menu"
            aria-label="Open course menu"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((o) => !o)}
          >
            <span /> <span /> <span />
          </button>
          <span className="topbar__crumb">{course.crumb}</span>
          <ReadingProgress />
          <button
            type="button"
            className="topbar__theme"
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </header>

        <main className="content" id="content" onClick={handleInternalLinks}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
