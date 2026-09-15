import type { Metadata } from "next";
import Link from "next/link";
import { FullPracticeBookDownload } from "@/components/FullPracticeBookDownload";
import {
  PracticeProgressSummary,
  SheetProgressBadges,
} from "@/components/PracticeProgress";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TodaysPractice } from "@/components/TodaysPractice";
import {
  getDifficultyLabel,
  getPracticeSheet,
  getStyleLabel,
  practiceSheets,
  practiceStages,
  practiceTracks,
} from "@/data/resources";

export const metadata: Metadata = {
  title: "練習本",
  description:
    "四條路線、五級門檻：熱身 → 大寫 → 小寫 → 詞語 → 短句。每級寫清過關標準，再升下一級。",
};

export default function ResourcesPage() {
  const allSlugs = practiceSheets.map((sheet) => sheet.slug);

  return (
    <main id="top" className="inner-page">
      <SiteHeader variant="inner" />

      <section className="section resources-hero" aria-labelledby="resources-title">
        <div className="section__head">
          <p className="section__eyebrow">Practice Book</p>
          <h1 className="section__title" id="resources-title">
            西洋書法練習本
          </h1>
          <p className="section__text">
            先選一條路線，再跟五級門檻往上走。每一級只問一件事：過關了沒有？過關再升，唔使一次睇晒所有練習紙。
          </p>
        </div>

        <ol className="path-steps" aria-label="五級學習門檻">
          {practiceStages.map((item) => (
            <li key={item.stage}>
              <a href={`#stage-${item.stage}`}>
                <strong>{item.titleZh}</strong>
                <span className="path-steps__focus">{item.focus}</span>
                <span className="path-steps__gate">{item.gate}</span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <TodaysPractice />

      <PracticeProgressSummary slugs={allSlugs} />

      <section className="section full-book-section" aria-label="完整練習本">
        <FullPracticeBookDownload />
      </section>

      <section className="section track-section" aria-labelledby="tracks-title">
        <div className="section__head">
          <p className="section__eyebrow">Practice Tracks</p>
          <h2 className="section__title" id="tracks-title">
            四條練習路線
          </h2>
          <p className="section__text">
            每條路線都壓成五步。左邊係本級練什麼，右邊係過關門檻——達標再點下一張。
          </p>
        </div>

        <div className="track-grid">
          {practiceTracks.map((track) => (
            <article className="track-card" key={track.id} id={`track-${track.id}`}>
              <p className="track-card__en">{track.titleEn}</p>
              <h3 className="track-card__title">{track.titleZh}</h3>
              <p className="track-card__summary">{track.summary}</p>
              <p className="track-card__tools">{track.tools}</p>
              <ol className="track-levels">
                {track.levels.map((level) => {
                  const sheet = getPracticeSheet(level.sheetSlug);
                  if (!sheet) return null;
                  return (
                    <li key={level.sheetSlug} className="track-level">
                      <div className="track-level__index" aria-hidden="true">
                        {level.step}
                      </div>
                      <div className="track-level__body">
                        <p className="track-level__meta">
                          {practiceStages.find((s) => s.stage === level.stage)?.titleZh}
                        </p>
                        <Link
                          className="track-level__title"
                          href={`/resources/${sheet.slug}`}
                        >
                          {level.titleZh}
                        </Link>
                        <p className="track-level__gate">門檻：{level.gate}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </article>
          ))}
        </div>
      </section>

      {practiceStages.map((stage) => {
        const sheets = practiceSheets.filter((sheet) => sheet.stage === stage.stage);
        return (
          <section
            className="section stage-section"
            id={`stage-${stage.stage}`}
            key={stage.stage}
            aria-labelledby={`stage-title-${stage.stage}`}
          >
            <div className="section__head">
              <p className="section__eyebrow">{stage.titleEn}</p>
              <h2 className="section__title" id={`stage-title-${stage.stage}`}>
                {stage.titleZh}
              </h2>
              <p className="section__text">{stage.focus}</p>
              <p className="stage-gate" role="note">
                {stage.gate}
              </p>
            </div>

            <div className="resource-list">
              {sheets.map((sheet, index) => (
                <article className="resource-item" key={sheet.slug}>
                  <div className="resource-item__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="resource-item__body">
                    <div className="resource-item__meta">
                      <span>{getStyleLabel(sheet.styleId)}</span>
                      <span>{sheet.level}</span>
                      {sheet.difficulty ? (
                        <span className="resource-item__difficulty">
                          難度 {getDifficultyLabel(sheet.difficulty)}
                        </span>
                      ) : null}
                      <span>{sheet.tools}</span>
                    </div>
                    <h3 className="resource-item__title">
                      {sheet.titleZh}{" "}
                      <SheetProgressBadges slug={sheet.slug} />
                    </h3>
                    <p className="resource-item__en">{sheet.titleEn}</p>
                    <p className="resource-item__summary">{sheet.summary}</p>
                    <ul className="resource-item__uses">
                      {sheet.uses.map((use) => (
                        <li key={use}>{use}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="resource-item__actions">
                    <Link className="btn btn--primary" href={`/resources/${sheet.slug}`}>
                      預覽／下載
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      <SiteFooter />
    </main>
  );
}
