"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  loadPracticeProgress,
  markSheetDownloaded,
  setSheetCompleted,
  subscribePracticeProgress,
  type PracticeProgressState,
} from "@/lib/practiceProgress";

function getSnapshot(): PracticeProgressState {
  return loadPracticeProgress();
}

function getServerSnapshot(): PracticeProgressState {
  return {};
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
