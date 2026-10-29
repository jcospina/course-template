import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
  SandpackTests,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { useTheme } from "../../../theme/ThemeProvider";
import { darkSandpack, lightSandpack } from "../sandpackThemes";
import { resolvePlayground, type PlaygroundProps } from "./files";
import { acquireStartup } from "./startupQueue";
import NodeExecution from "./web/node/NodeExecution";
import TypecheckPanel from "./TypecheckPanel";
import { fileText, stableStringify } from "./resolve";
import type { WebProject } from "./types";
import { EditorView } from "@codemirror/view";
import type { SourceFiles } from "./types";
import { vue } from "@codemirror/lang-vue";
import { svelte } from "@replit/codemirror-lang-svelte";

export default function PlaygroundWorkspace(props: PlaygroundProps & {project?: WebProject}) {
  const { theme } = useTheme();
  const { template, project } = props;
  const dependencies = project?.dependencies ?? props.dependencies;
  const resolved = useMemo(
    () => project ?? resolvePlayground(props),
    [project, props.code, props.files, template, props.tests],
  );
  return (
    <SandpackProvider
      template={project ? undefined : template ?? "react-ts"}
      files={resolved.files}
      theme={theme === "dark" ? darkSandpack : lightSandpack}
      customSetup={{ dependencies, entry: resolved.entry, environment: project?.environment }}
      options={{
        autorun: false,
        autoReload: false,
        recompileMode: "delayed",
        recompileDelay: 300,
        visibleFiles: resolved.visibleFiles,
        activeFile: resolved.activeFile,
      }}
    >
      <Workspace {...props} setup={{ dependencies, entry: resolved.entry, environment: project?.environment }} fileCount={resolved.visibleFiles?.length ?? 1} />
    </SandpackProvider>
  );
}

function Workspace({
  template = "react-ts",
  project,
  setup,
  layout = "row",
  editorHeight = 360,
  showPreview = project ? project.output === "preview" : template.includes("react"),
  showConsole = true,
  showTabs,
  readOnly = false,
  tests,
  typecheck = project ? !!project.capabilities.semanticCheck : template === "react-ts" || template === "vanilla-ts",
  title = "Try it yourself",
  fileCount,
}: PlaygroundProps & { fileCount: number; project?: WebProject; setup: { dependencies?: Record<string,string>; entry?: string; environment?: WebProject["environment"] } }) {
  const { sandpack } = useSandpack();
  const { theme } = useTheme();
  const sandboxTheme = theme === "dark" ? darkSandpack : lightSandpack;
  const starterFiles = useRef<SourceFiles>(project?.files ?? sandpack.files);
  const [sourceFiles,setSourceFiles] = useState<SourceFiles>(starterFiles.current);
  const editorRef=useRef<import("@codesandbox/sandpack-react").CodeEditorRef>(null);
  const activePath = useRef(sandpack.activeFile);activePath.current=sandpack.activeFile;
  // Sandpack wraps CodeMirror; the workbench owns the source used by every action.
  const editorExtensions=useMemo(()=>[EditorView.updateListener.of(update=>{
    if(!update.docChanged)return;
    const path=activePath.current,code=update.state.doc.toString();
    setSourceFiles(files=>fileText(files[path]) === code ? files : {...files,[path]:{...(typeof files[path] === "string" ? {} : files[path]),code}});
  })],[]);
  const [run, setRun] = useState<{ id: number; snapshot: string }>();
  const runId = useRef(0);
  const [status, setStatus] = useState("Ready when you are");
  const [consoleVisible, setConsoleVisible] = useState(
    showConsole || !showPreview,
  );
  const [testSnapshot, setTestSnapshot] = useState<string>();
  const [testRun, setTestRun] = useState(0);
  const [testSummary, setTestSummary] = useState("");
  const hasTests = !!project?.checks || (!!tests && Object.keys(tests).length > 0);
  const snapshot = stableStringify({files:sourceFiles,setup,preset:project?.preset,revision:project?.revision});
  const stale = run !== undefined && run.snapshot !== snapshot;
  const runtimeFiles = useMemo(
    () => (run ? JSON.parse(run.snapshot).files : {}),
    [run],
  );
  const testFiles = useMemo(
    () => (testSnapshot ? JSON.parse(testSnapshot).files : {}),
    [testSnapshot],
  );

  function execute() {
    setStatus("Starting runtime…");
    setRun({ id: ++runId.current, snapshot });
  }
  function stop() {
    setRun(undefined);
    setTestSnapshot(undefined);
    setTestSummary("");
    setStatus("Stopped. Your code is still here.");
  }

  return (
    <section
      className="playground"
      aria-label={title}
      data-layout={layout}
      style={
        {
          "--editor-height": Math.max(editorHeight, 240) + "px",
        } as CSSProperties
      }
      onKeyDown={(event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
          event.preventDefault();
          execute();
        }
      }}
    >
      <header className="playground__toolbar">
        <div>
          <strong>{title}</strong>
          <span className="playground__language">
            {project?.preset ?? (template === "node" ? "Node.js" : template)}
          </span>
        </div>
        <div className="playground__actions">
          <button type="button" className="playground__run" onClick={execute}>
            Run code
          </button>
          <button
            type="button"
            onClick={stop}
            disabled={!run && testSnapshot === undefined}
          >
            Stop
          </button>
          <button
            type="button"
            onClick={() => {
              stop();
              sandpack.resetAllFiles();
              setSourceFiles(starterFiles.current);
              setStatus("Starter restored. Ready to run.");
            }}
          >
            Reset code
          </button>
          {showPreview && (
            <button
              type="button"
              aria-pressed={consoleVisible}
              onClick={() => setConsoleVisible((value) => !value)}
            >
              Console
            </button>
          )}
        </div>
      </header>
      <div className="playground__status" role="status">
        {stale ? "Code changed. Run to see the result." : status}{" "}
        <span>Ctrl / ⌘ + Enter to run · Esc, then Tab to leave the editor</span>
      </div>
      <div className="playground__panels">
        <div className="playground__code" aria-label="Code editor">
          <SandpackCodeEditor
            ref={editorRef}
            extensions={editorExtensions}
            showTabs={showTabs ?? fileCount > 1}
            showLineNumbers
            showInlineErrors
            showRunButton={false}
            wrapContent
            readOnly={readOnly}
            initMode="immediate"
            additionalLanguages={project?.preset.startsWith("vue") ? [{name:"vue",extensions:["vue"],language:vue()}] : project?.preset.startsWith("svelte") ? [{name:"svelte",extensions:["svelte"],language:svelte()}] : undefined}
          />
        </div>
        <div className="playground__output">
          {run && project && (project.environment === "node" && project.output === "console") ? <NodeExecution key={run.id} project={project} files={runtimeFiles} onStatus={setStatus}/> : run ? (
            <SandpackProvider
              key={run.id}
              theme={sandboxTheme}
              template={project ? undefined : template}
              customSetup={setup}
              files={runtimeFiles}
              options={{ autorun: false }}
            >
              <Runtime
                showPreview={showPreview}
                consoleVisible={consoleVisible}
                onStatus={setStatus}
              />
            </SandpackProvider>
          ) : (
            <>
              <div className="playground__panel-label">
                {showPreview ? "Preview & console" : "Console"}
              </div>
              <p className="playground__empty">
                Run the code to see logs and errors here.
              </p>
            </>
          )}
        </div>
      </div>
      {typecheck && <TypecheckPanel files={Object.fromEntries(Object.entries(sourceFiles).map(([p,f]) => [p,fileText(f)]))} profile={project?.capabilities.semanticCheck || "react-typescript"} onNavigate={(file,line) => {sandpack.openFile(file);if(line)requestAnimationFrame(()=>editorRef.current?.getCodemirror()?.dispatch({selection:{anchor:editorRef.current!.getCodemirror()!.state.doc.line(Math.min(line,editorRef.current!.getCodemirror()!.state.doc.lines)).from},scrollIntoView:true}));}} /> }
      {hasTests && (
        <div className="playground__checks" role="group" aria-label="Behavior checks">
          <button
            type="button"
            onClick={() => {
              setTestRun((value) => value + 1);
              setTestSnapshot(snapshot);
              setTestSummary("Checking…");
            }}
          >
            Check solution
          </button>
          <span role="status">
            {testSnapshot !== undefined && snapshot !== testSnapshot
              ? "Code changed. Run checks again."
              : testSummary ||
                "Check the behavior before revealing the solution."}
          </span>
          {testSnapshot !== undefined && project && (project.environment === "node" && project.output === "console") ? <NodeExecution key={testRun} project={project} files={testFiles} check onStatus={setTestSummary} onSummary={setTestSummary}/> : testSnapshot !== undefined && (
            <SandpackProvider
              key={testRun}
              theme={sandboxTheme}
              files={{...testFiles,"/__course_test_entry.js":{code:"export {};",hidden:true,readOnly:true}}}
              customSetup={{dependencies: setup.dependencies,environment:"parcel",entry:"/__course_test_entry.js"}}
              options={{ autorun: false }}
            >
              <TestRunner onSummary={setTestSummary} />
            </SandpackProvider>
          )}
        </div>
      )}
    </section>
  );
}

function Runtime({
  showPreview,
  consoleVisible,
  onStatus,
}: {
  showPreview: boolean;
  consoleVisible: boolean;
  onStatus: (status: string) => void;
}) {
  const { sandpack, listen } = useSandpack();
  const consoleRef = useRef<{ reset: () => void }>(null);
  useStartRuntime(onStatus);
  useEffect(() => {
    const timer = setTimeout(
      () =>
        onStatus(
          "The runtime is taking longer than expected. Check your connection, then run again.",
        ),
      30000,
    );
    const unsubscribe = listen((message) => {
      if (message.type === "done" || message.type === "stdout") {
        clearTimeout(timer);
        onStatus("Runtime ready. Inspect the output.");
      }
    });
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [listen, onStatus]);
  useEffect(()=>{if(sandpack.error)onStatus("Runtime failed: "+sandpack.error.message);},[sandpack.error,onStatus]);
  return (
    <>
      {sandpack.error && (
        <div className="playground__notice" role="alert">
          {sandpack.error.message}
        </div>
      )}
      {showPreview && (
        <div className="playground__preview" aria-label="Preview">
          <div className="playground__panel-label">Preview</div>
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
            showOpenNewtab={false}
          />
        </div>
      )}
      <div
        className="playground__console"
        hidden={!consoleVisible}
        aria-label="Console output"
      >
        <div className="playground__panel-label">
          Console{" "}
          <button type="button" onClick={() => consoleRef.current?.reset()}>
            Clear output
          </button>
        </div>
        <SandpackConsole
          ref={consoleRef}
          standalone={!showPreview}
          showHeader={sandpack.environment === "node"}
          showSyntaxError
          showResetConsoleButton={false}
          showRestartButton={false}
          resetOnPreviewRestart
          maxMessageCount={200}
        />
      </div>
    </>
  );
}

function useStartRuntime(onStatus: (status: string) => void) {
  const { sandpack, listen } = useSandpack();
  const start = useRef(sandpack.runSandpack);
  useEffect(() => {
    // Child iframe registration finishes before startup; StrictMode's trial
    // mount cancels this task before it can create a duplicate client.
    let active = true;
    const controller=new AbortController();let release: (()=>void)|undefined;
    const unsubscribe=listen(message=>{if(message.type === "done") {release?.();release=undefined;}});
    const startupTimer=setTimeout(()=>{release?.();release=undefined;},30000);
    const timer = setTimeout(() => {
      void acquireStartup(controller.signal,()=>onStatus("Queued. Waiting for another runtime to start.")).then(unlock=>{
        if(!active){unlock();return;}release=unlock;return start.current();
      }).catch(error=>{release?.();release=undefined;if(active)onStatus("Could not start runtime: " + String(error));});
    }, 0);
    return () => {
      active = false;controller.abort();release?.();unsubscribe();
      clearTimeout(timer);clearTimeout(startupTimer);
    };
  }, [onStatus]);
}

interface TestGroup {
  error?: unknown;
  tests: Record<string, { status: string }>;
  describes: Record<string, TestGroup>;
}
function countTests(groups: Record<string, TestGroup>): {
  passed: number;
  failed: number;
  errors: number;
} {
  return Object.values(groups).reduce(
    (sum, group) => {
      const nested = countTests(group.describes);
      return {
        passed:
          sum.passed +
          nested.passed +
          Object.values(group.tests).filter((test) => test.status === "pass")
            .length,
        failed:
          sum.failed +
          nested.failed +
          Object.values(group.tests).filter((test) => test.status === "fail")
            .length,
        errors: sum.errors + nested.errors + (group.error ? 1 : 0),
      };
    },
    { passed: 0, failed: 0, errors: 0 },
  );
}
function TestRunner({ onSummary }: { onSummary: (summary: string) => void }) {
  useStartRuntime(onSummary);
  const { sandpack,listen,dispatch } = useSandpack();
  const latest = useRef(sandpack);latest.current=sandpack;
  const started=useRef(false);
  const dispose=()=>{for(const id of Object.keys(latest.current.clients))latest.current.unregisterBundler(id);};
  const active = useRef(false);
  const completed = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    active.current = true;
    timer.current=setTimeout(()=>{onSummary("Checks timed out. Check again to retry.");dispose();},30000);
    return()=>{active.current=false;clearTimeout(timer.current);};
  },[onSummary]);
  useEffect(()=>listen(message=>{
    if(message.type === "test" && message.event === "initialize_tests" && !started.current){
      started.current=true;
      queueMicrotask(()=>{if(active.current)dispatch({type:"run-all-tests"});});
    }
  }),[listen,dispatch]);
  return (
    <>
      {sandpack.error && <p role="alert">{sandpack.error.message}</p>}
      <SandpackTests
        watchMode={false}
        showWatchButton={false}
        verbose
        onComplete={(specs) => {
          if(completed.current)return;completed.current=true;
          clearTimeout(timer.current);
          const { passed, failed, errors } = countTests(specs);
          queueMicrotask(() => {
            if (active.current) {
              onSummary(
                errors
                  ? "A test file could not run. Read the error below."
                  : passed + failed
                    ? passed + " passed, " + failed + " failed."
                    : "No checks ran. Check the test files.",
              );
              dispose();
            }
          });
        }}
      />
    </>
  );
}
