"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  EMPTY_PRACTICE_PROGRESS,
  loadPracticeProgress,
  markSheetDownloaded,
  setSheetCompleted,
  subscribePracticeProgress,
} from "@/lib/practiceProgress";

function getSnapshot() {
  return loadPracticeProgress();
}

function getServerSnapshot() {
  return EMPTY_PRACTICE_PROGRESS;
}

export function usePracticeProgress() {
  const state = useSyncExternalStore(
    subscribePracticeProgress,
    getSnapshot,
    getServerSnapshot,
  );

  const markDownloaded = useCallback((slug: string) => {
    markSheetDownloaded(slug);
  }, []);

  const toggleCompleted = useCallback((slug: string) => {
    const current = loadPracticeProgress()[slug]?.completed ?? false;
    setSheetCompleted(slug, !current);
  }, []);

  const setCompleted = useCallback((slug: string, completed: boolean) => {
    setSheetCompleted(slug, completed);
  }, []);

  return {
    state,
    markDownloaded,
    toggleCompleted,
    setCompleted,
  };
}
