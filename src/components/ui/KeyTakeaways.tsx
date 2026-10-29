import type { ReactNode } from "react";

export default function KeyTakeaways({
  children,
  title = "What to remember",
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <section className="takeaways" aria-label={title}>
      <p className="takeaways__title">
        <span aria-hidden="true">★</span> {title}
      </p>
      <div className="takeaways__body">{children}</div>
    </section>
  );
}
