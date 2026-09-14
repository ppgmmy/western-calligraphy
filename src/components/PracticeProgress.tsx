"use client";

import { usePracticeProgress } from "@/hooks/usePracticeProgress";

type SheetProgressControlsProps = {
  slug: string;
};

export function SheetProgressControls({ slug }: SheetProgressControlsProps) {
  const { state, toggleCompleted } = usePracticeProgress();
  const progress = state[slug];
  const completed = Boolean(progress?.completed);
  const downloaded = Boolean(progress?.downloaded);

  return (
    <div className="sheet-progress">
      <div className="sheet-progress__badges" aria-live="polite">
        <span className={`sheet-progress__badge${downloaded ? " is-on" : ""}`}>
          {downloaded ? "已下載" : "尚未下載"}
        </span>
        <span
          className={`sheet-progress__badge${completed ? " is-on is-done" : ""}`}
        >
          {completed ? "已完成" : "未完成"}
        </span>
      </div>
      <button
        type="button"
        className="btn btn--ghost sheet-progress__toggle"
        onClick={() => toggleCompleted(slug)}
      >
        {completed ? "取消完成標記" : "標記為已完成"}
      </button>
    </div>
  );
}

type SheetProgressBadgesProps = {
  slug: string;
};

export function SheetProgressBadges({ slug }: SheetProgressBadgesProps) {
  const { state } = usePracticeProgress();
  const progress = state[slug];
  if (!progress?.downloaded && !progress?.completed) return null;

  return (
    <span className="sheet-progress-inline">
      {progress.downloaded ? <span>已下載</span> : null}
      {progress.completed ? <span className="is-done">已完成</span> : null}
    </span>
  );
}

type PracticeProgressSummaryProps = {
  slugs: string[];
};

export function PracticeProgressSummary({
  slugs,
}: PracticeProgressSummaryProps) {
  const { state } = usePracticeProgress();
  const total = slugs.length;
  let downloaded = 0;
  let completed = 0;
  for (const slug of slugs) {
    if (state[slug]?.downloaded) downloaded += 1;
    if (state[slug]?.completed) completed += 1;
  }
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <section
      className="section progress-summary"
      aria-labelledby="progress-summary-title"
    >
      <div className="section__head">
        <p className="section__eyebrow">Local Progress</p>
        <h2 className="section__title" id="progress-summary-title">
          本機練習進度
        </h2>
        <p className="section__text">
          進度保存在這個瀏覽器（無需登入）。下載 PDF／SVG
          會記為已下載；你也可手動標記完成。
        </p>
      </div>

      <div className="progress-summary__stats">
        <div>
          <strong>{completed}</strong>
          <span>已完成／{total}</span>
        </div>
        <div>
          <strong>{downloaded}</strong>
          <span>已下載</span>
        </div>
        <div>
          <strong>{percent}%</strong>
          <span>完成率</span>
        </div>
      </div>

      <div
        className="progress-summary__bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label="練習完成率"
      >
        <span style={{ width: `${percent}%` }} />
      </div>
    </section>
  );
}
