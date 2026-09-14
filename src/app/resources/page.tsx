import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { TodaysPractice } from "@/components/TodaysPractice";
import {
  getStyleLabel,
  practiceSheets,
  practiceStages,
} from "@/data/resources";

export const metadata: Metadata = {
  title: "資源庫｜Scriptoria 西洋書法練習本",
  description:
    "按級下載並列印西洋書法練習紙：字母家族分冊、筆畫方向、A4 PDF、今日練習建議。",
};

export default function ResourcesPage() {
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
            按級前進：熱身格線 → 字母家族分冊 → 總覽複習 → 詞語 → 短句。
            每張紙含用法說明與筆畫方向；可下載 A4 PDF／SVG，或直接列印。
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
                      <span>{sheet.tools}</span>
                    </div>
                    <h3 className="resource-item__title">{sheet.titleZh}</h3>
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
