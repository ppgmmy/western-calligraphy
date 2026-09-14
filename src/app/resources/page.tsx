import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import {
  getStyleLabel,
  practiceSheets,
} from "@/data/resources";

export const metadata: Metadata = {
  title: "資源庫｜Scriptoria 西洋書法練習紙",
  description:
    "下載並列印西洋書法練習紙：銅板體導引線、橢圓練習、斜體字筆寬格線、哥德體垂直格線等。",
};

export default function ResourcesPage() {
  return (
    <main id="top" className="inner-page">
      <SiteHeader variant="inner" />

      <section className="section resources-hero" aria-labelledby="resources-title">
        <div className="section__head">
          <p className="section__eyebrow">Resources</p>
          <h1 className="section__title" id="resources-title">
            西洋書法練習紙資源庫
          </h1>
          <p className="section__text">
            下載 SVG 或直接列印成 A4 練習紙，用筆尖在紙上反覆練習。適合入門熱身、對齊字高，以及每日短練。
          </p>
        </div>
      </section>

      <section className="section" aria-label="練習紙列表">
        <div className="resource-list">
          {practiceSheets.map((sheet, index) => (
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
                <h2 className="resource-item__title">{sheet.titleZh}</h2>
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
    </main>
  );
}
