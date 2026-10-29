import { useEffect, useRef, useState } from "react";
import type { TypeDiagnostic } from "./typecheck";

export default function TypecheckPanel({files: source, profile, onNavigate}: {files: Record<string,string>; profile: "typescript" | "react-typescript" | "node-typescript"; onNavigate: (file:string,line?:number) => void}) {
  const [result, setResult] = useState<TypeDiagnostic[]>();
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [checked, setChecked] = useState<string>();
  const worker = useRef<Worker>();
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const files = JSON.stringify(source);
  useEffect(
    () => () => {
      worker.current?.terminate();
      clearTimeout(timer.current);
    },
    [],
  );

  function check() {
    worker.current?.terminate();
    clearTimeout(timer.current);
    setResult(undefined);
    setChecked(files);
    setBusy(true);
    setStatus("Checking types…");
    try {
      const next = new Worker(
        new URL("./typecheck.worker.ts", import.meta.url),
        { type: "module" },
      );
      worker.current = next;
      const finish = (message: string) => {
        if(worker.current !== next)return;worker.current=undefined;
        next.terminate();
        clearTimeout(timer.current);
        setBusy(false);
        setStatus(message);
      };
      next.onmessage = (event) => {
        if (worker.current !== next) return;
        if (event.data.error) {
          finish("Type checking unavailable: " + event.data.error);
          return;
        }
        setResult(event.data.diagnostics);
        finish(
          event.data.diagnostics.length
            ? "Type errors found."
            : "No type errors in this project.",
        );
      };
      next.onerror = () => finish("Type checking could not load. Try again.");
      timer.current = setTimeout(
        () => finish("Type checking timed out. Try a smaller example."),
        20000,
      );
      next.postMessage({files: JSON.parse(files), profile});
    } catch (error) {
      setBusy(false);
      setStatus("Type checking unavailable: " + String(error));
    }
  }
  const stale = checked !== undefined && checked !== files;
  return (
    <div className="playground__checks">
      <button type="button" onClick={check} disabled={busy}>
        Check types
      </button>
      <span role="status">
        {stale
          ? "Code changed. Check types again."
          : status ||
            "Check project types. Use Run code to observe behavior."}
      </span>
      {!stale && !!result?.length && (
        <ul className="playground__diagnostics">
          {result.map((item, index) => (
            <li key={index}>
              {item.file && (
                <button
                  type="button"
                  onClick={() => onNavigate(item.file!,item.line)}
                >
                  {item.file}:{item.line}
                </button>
              )}
              {" TS" + item.code + ": " + item.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
