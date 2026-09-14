import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PracticeSheetActions } from "@/components/PracticeSheetActions";
import { PracticeSheetArt } from "@/components/PracticeSheetArt";
import { SiteHeader } from "@/components/SiteHeader";
import {
  getPracticeSheet,
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
              <span>{getStyleLabel(sheet.styleId)}</span>
              <span>{sheet.level}</span>
              <span>{sheet.tools}</span>
            </div>
            <PracticeSheetActions slug={sheet.slug} titleZh={sheet.titleZh} />
            <p className="sheet-detail__hint">
              下載後可用瀏覽器或繪圖軟體開啟；列印時選擇 A4、實際大小，並關閉頁首頁尾。
            </p>
            <Link className="sheet-detail__back" href="/resources">
              ← 返回資源庫
            </Link>
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
