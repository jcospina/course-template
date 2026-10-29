import { useCallback, useEffect, useSyncExternalStore } from "react";
import { course } from "../course.config";

/**
 * Tiny global store for "which lessons are done", persisted to localStorage.
 * We use useSyncExternalStore so every component (sidebar, lesson page,
 * progress bar) stays in sync without a context provider.
 */

const KEY = `${course.storagePrefix}:progress:v1`;

type ProgressSet = Set<string>;

function read(): ProgressSet {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

let current: ProgressSet = read();
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify([...current]));
  } catch {
    /* storage may be unavailable; progress is best-effort */
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

// Cache the serialized snapshot so getSnapshot is referentially stable
// between renders (required by useSyncExternalStore).
let snapshot = serialize(current);
function serialize(set: ProgressSet) {
  return [...set].sort().join("|");
}
function getSnapshot() {
  return snapshot;
}

function setProgress(next: ProgressSet) {
  current = next;
  snapshot = serialize(current);
  persist();
  emit();
}

export function useCompletedSet(): ProgressSet {
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  // `current` is the live set; snapshot drives re-renders.
  return current;
}

export function useIsComplete(slug: string): boolean {
  const set = useCompletedSet();
  return set.has(slug);
}

export function useToggleComplete() {
  return useCallback((slug: string, value?: boolean) => {
    const next = new Set(current);
    const shouldComplete = value ?? !next.has(slug);
    if (shouldComplete) next.add(slug);
    else next.delete(slug);
    setProgress(next);
  }, []);
}

export function resetProgress() {
  setProgress(new Set());
}

/** Sync across browser tabs. */
export function useCrossTabSync() {
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === KEY) {
        current = read();
        snapshot = serialize(current);
        emit();
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
}
