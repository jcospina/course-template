import type { ReactNode } from "react";

/**
 * A framed container for an interactive demo or diagram, with an optional
 * caption. Use this to set live visualizations apart from prose.
 */
export default function Figure({
  children,
  caption,
  label,
  padded = true,
}: {
  children: ReactNode;
  caption?: ReactNode;
  label?: string;
  padded?: boolean;
}) {
  return (
    <figure className="figure">
      {label && <span className="figure__label">{label}</span>}
      <div className={`figure__stage ${padded ? "is-padded" : ""}`}>
        {children}
      </div>
      {caption && <figcaption className="figure__caption">{caption}</figcaption>}
    </figure>
  );
}
