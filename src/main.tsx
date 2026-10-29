import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeProvider";
import AppShell from "./components/layout/AppShell";
import HomePage from "./components/pages/HomePage";
import LessonPage from "./components/pages/LessonPage";
import { course } from "./course.config";
import "./styles/global.css";
import "./styles/components.css";

const FixtureLesson = lazy(() => import("./components/pages/FixtureLesson"));
const ExampleVerification = lazy(() => import("./components/pages/ExampleVerification"));

// Title + meta description come from the one config file, so index.html
// stays generic and you never hand-edit it per course.
document.title = course.documentTitle;
document
  .querySelector('meta[name="description"]')
  ?.setAttribute("content", course.metaDescription);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="__verify" element={<Suspense fallback={<p>Loading verification…</p>}><ExampleVerification /></Suspense>} />
            <Route path="__fixtures/:slug" element={<Suspense fallback={<p>Loading fixture…</p>}><FixtureLesson /></Suspense>} />
            <Route path="learn/:slug" element={<LessonPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
