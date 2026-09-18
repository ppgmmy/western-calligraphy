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
  title: "練習簿",
  description:
    "Scriptoria 西洋書法練習簿：斜體入門（熱身→小寫細草→大寫→詞語→短句）可下載 PDF；亦可下載完整全集。",
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
            西洋書法練習簿
          </h1>
          <p className="section__text">
            初學先下載「斜體入門練習簿」：熱身 → 小寫細草 → 大寫 → 詞語 → 短句。夠靚嘅示範主要喺斜體小寫；整條斜體過關，先開下一款。
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

      <section className="section full-book-section" aria-label="下載練習簿">
        <FullPracticeBookDownload />
      </section>

      <section className="section track-section" aria-labelledby="tracks-title">
        <div className="section__head">
          <p className="section__eyebrow">Practice Tracks</p>
          <h2 className="section__title" id="tracks-title">
            按順序學：一款過關再開下一款
          </h2>
          <p className="section__text">
            初學只開斜體。夠靚嘅示範主要係斜體小寫細草——先練小寫，再補大寫。整條斜體過關後，先開銅板／斯賓塞／花飾；唔好並行混練。
          </p>
        </div>

        <div className="track-grid">
          {[...practiceTracks]
            .sort((a, b) => a.sequence - b.sequence)
            .map((track) => (
            <article
              className={`track-card${track.unlock === "open" ? " track-card--open" : " track-card--later"}`}
              key={track.id}
              id={`track-${track.id}`}
            >
              <p className="track-card__badge">
                {track.unlock === "open" ? "現在學" : "斜體之後"}
              </p>
              <p className="track-card__en">{track.titleEn}</p>
              <h3 className="track-card__title">{track.titleZh}</h3>
              <p className="track-card__summary">{track.summary}</p>
              <p className="track-card__note">{track.beginnerNote}</p>
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
