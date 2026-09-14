import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { FullPracticeBookDownload } from "@/components/FullPracticeBookDownload";
import {
  PracticeProgressSummary,
  SheetProgressBadges,
} from "@/components/PracticeProgress";
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
  title: "資源庫｜Scriptoria 西洋書法練習本",
  description:
    "斜體主線與銅板／斯賓塞尖筆平行進程；詞語與短句分易／中／難；可下載 A4 PDF。",
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
            三條路線可並行：斜體字主線、銅板體尖筆線、斯賓塞體尖筆線。
            第 3／4 級詞語與短句已分易／中／難；支援本機進度、列印檢查清單，以及完整練習本打包下載。
          </p>
        </div>

        <ol className="path-steps" aria-label="練習進程">
          {practiceStages.map((item) => (
            <li key={item.stage}>
              <a href={`#stage-${item.stage}`}>
                <strong>{item.titleZh}</strong>
                <span>{item.goal}</span>
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
            三條練習路線
          </h2>
          <p className="section__text">
            斜體走闊尖筆；銅板與斯賓塞走尖筆。可專心一條，也可一週穿插尖筆熱身。
          </p>
        </div>

        <div className="track-grid">
          {practiceTracks.map((track) => (
            <article className="track-card" key={track.id}>
              <p className="track-card__en">{track.titleEn}</p>
              <h3 className="track-card__title">{track.titleZh}</h3>
              <p className="track-card__summary">{track.summary}</p>
              <p className="track-card__tools">{track.tools}</p>
              <ol className="track-card__steps">
                {track.sheetSlugs.map((slug) => {
                  const sheet = getPracticeSheet(slug);
                  if (!sheet) return null;
                  return (
                    <li key={slug}>
                      <Link href={`/resources/${sheet.slug}`}>{sheet.titleZh}</Link>
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
              <p className="section__text">{stage.goal}</p>
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
    </main>
  );
}
