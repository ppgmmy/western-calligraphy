export type SheetProgress = {
  downloaded?: boolean;
  completed?: boolean;
  updatedAt?: number;
};

export type PracticeProgressState = Record<string, SheetProgress>;

export const PRACTICE_PROGRESS_KEY = "scriptoria-practice-progress-v1";
export const PRINT_CHECKLIST_SKIP_KEY = "scriptoria-print-checklist-skip";

const progressListeners = new Set<() => void>();

export function subscribePracticeProgress(listener: () => void) {
  progressListeners.add(listener);
  return () => {
    progressListeners.delete(listener);
  };
}

export function notifyPracticeProgress() {
  progressListeners.forEach((listener) => listener());
}

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function loadPracticeProgress(): PracticeProgressState {
  if (!canUseStorage()) return {};
  try {
    const raw = window.localStorage.getItem(PRACTICE_PROGRESS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as PracticeProgressState;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function savePracticeProgress(state: PracticeProgressState) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(PRACTICE_PROGRESS_KEY, JSON.stringify(state));
  notifyPracticeProgress();
}

export function markSheetDownloaded(slug: string) {
  const state = loadPracticeProgress();
  const current = state[slug] ?? {};
  state[slug] = {
    ...current,
    downloaded: true,
    updatedAt: Date.now(),
  };
  savePracticeProgress(state);
  return state;
}

export function setSheetCompleted(slug: string, completed: boolean) {
  const state = loadPracticeProgress();
  const current = state[slug] ?? {};
  state[slug] = {
    ...current,
    completed,
    updatedAt: Date.now(),
  };
  savePracticeProgress(state);
  return state;
}

export function summarizeProgress(
  slugs: string[],
  state: PracticeProgressState,
) {
  let downloaded = 0;
  let completed = 0;
  for (const slug of slugs) {
    if (state[slug]?.downloaded) downloaded += 1;
    if (state[slug]?.completed) completed += 1;
  }
  return { total: slugs.length, downloaded, completed };
}

export function getPrintChecklistSkip(): boolean {
  if (!canUseStorage()) return false;
  return window.localStorage.getItem(PRINT_CHECKLIST_SKIP_KEY) === "1";
}

export function setPrintChecklistSkip(skip: boolean) {
  if (!canUseStorage()) return;
  if (skip) {
    window.localStorage.setItem(PRINT_CHECKLIST_SKIP_KEY, "1");
  } else {
    window.localStorage.removeItem(PRINT_CHECKLIST_SKIP_KEY);
  }
}
