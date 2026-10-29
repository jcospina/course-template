import { Component, lazy, Suspense, type ReactNode } from "react";
import type { PlaygroundProps } from "./playground/files";
export type { PlaygroundProps } from "./playground/files";

const PlaygroundWorkspace = lazy(
  () => import("./playground/ProjectWorkspace"),
);

class PlaygroundBoundary extends Component<
  { children: ReactNode },
  { error: string | null }
> {
  state = { error: null as string | null };
  static getDerivedStateFromError(error: Error) {
    return { error: error.message };
  }
  render() {
    return this.state.error ? (
      <div className="playground__notice" role="alert">
        This playground could not load: {this.state.error} Reload the lesson to
        retry.
      </div>
    ) : (
      this.props.children
    );
  }
}

export default function Playground(props: PlaygroundProps) {
  return (
    <PlaygroundBoundary>
      <Suspense
        fallback={
          <div className="playground__notice" role="status">
            Loading code editor…
          </div>
        }
      >
        <PlaygroundWorkspace {...props} />
      </Suspense>
    </PlaygroundBoundary>
  );
}
