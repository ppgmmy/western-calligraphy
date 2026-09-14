import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PracticeSheetActions } from "@/components/PracticeSheetActions";
import { PracticeSheetArt } from "@/components/PracticeSheetArt";
import { SiteHeader } from "@/components/SiteHeader";
import {
  getDifficultyLabel,
  getPracticeSheet,
  getStageLabel,
  getStyleLabel,
  practiceSheets,
} from "@/data/resources";

type ResourcePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return practiceSheets.map((sheet) => ({ slug: sheet.slug }));
}

export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const sheet = getPracticeSheet(slug);
  if (!sheet) {
    return { title: "練習紙｜Scriptoria" };
  }
  return {
    title: `${sheet.titleZh}｜Scriptoria 練習紙`,
    description: sheet.summary,
  };
}

export default async function ResourceDetailPage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const sheet = getPracticeSheet(slug);
  if (!sheet) notFound();

  const nextSheet = practiceSheets.find(
    (item) => item.stage === ((sheet.stage + 1) as 0 | 1 | 2 | 3 | 4),
  );

  return (
    <main id="top" className="inner-page sheet-detail">
      <div className="no-print">
        <SiteHeader variant="inner" />
        <section className="section sheet-detail__intro" aria-labelledby="sheet-title">
          <div className="section__head">
            <p className="section__eyebrow">Practice Sheet</p>
            <h1 className="section__title" id="sheet-title">
              {sheet.titleZh}
            </h1>
            <p className="section__text">{sheet.summary}</p>
            <div className="resource-item__meta sheet-detail__meta">
              <span>{getStageLabel(sheet.stage)}</span>
              <span>{getStyleLabel(sheet.styleId)}</span>
              <span>{sheet.level}</span>
              {sheet.difficulty ? (
                <span className="resource-item__difficulty">
                  難度 {getDifficultyLabel(sheet.difficulty)}
                </span>
              ) : null}
              <span>{sheet.tools}</span>
            </div>

            <div className="guidance-box">
              <h2 className="guidance-box__title">怎麼用這張練習紙</h2>
              <ol className="guidance-box__list">
                {sheet.guidance.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            <PracticeSheetActions slug={sheet.slug} titleZh={sheet.titleZh} />
            <p className="sheet-detail__hint">
              列印前會出現檢查清單（A4、實際大小、關閉頁首頁尾、單面）。下載
              PDF／SVG 會記入本機進度；也可手動標記已完成。
            </p>
            <div className="sheet-detail__nav">
              <Link className="sheet-detail__back" href="/resources">
                ← 返回練習本
              </Link>
              {nextSheet ? (
                <Link className="sheet-detail__next" href={`/resources/${nextSheet.slug}`}>
                  下一級推薦：{nextSheet.titleZh} →
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      </div>

      <section className="sheet-preview" aria-label="練習紙預覽">
        <div className="sheet-preview__frame">
          <PracticeSheetArt sheet={sheet} />
        </div>
      </section>
    </main>
  );
}
