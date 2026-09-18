"use client";

import { createRoot, type Root } from "react-dom/client";
import { jsPDF } from "jspdf";
import { useMemo, useState } from "react";
import { PracticeSheetArt } from "@/components/PracticeSheetArt";
import {
  getPracticeBookSheets,
  practiceBooks,
  type PracticeBook,
} from "@/data/practiceBooks";
import { getStageLabel, type PracticeSheet } from "@/data/resources";
import { svgElementToJpeg } from "@/lib/exportPracticeSheet";
import { markSheetDownloaded } from "@/lib/practiceProgress";

async function waitForPaint() {
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

async function renderSheetJpeg(sheet: PracticeSheet): Promise<string> {
  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText =
    "position:fixed;left:-12000px;top:0;width:794px;pointer-events:none;opacity:0;";
  document.body.appendChild(host);

  let root: Root | null = null;
  try {
    root = createRoot(host);
    root.render(<PracticeSheetArt sheet={sheet} />);
    await document.fonts.ready;
    await waitForPaint();
    await new Promise((resolve) => window.setTimeout(resolve, 80));

    const svg = host.querySelector<SVGSVGElement>(".practice-sheet-svg");
    if (!svg) throw new Error(`Missing SVG for ${sheet.slug}`);
    return await svgElementToJpeg(svg, { scale: 2, quality: 0.92 });
  } finally {
    root?.unmount();
    host.remove();
  }
}

function drawCover(pdf: jsPDF, book: PracticeBook, sheetCount: number) {
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  pdf.setFillColor(232, 238, 243);
  pdf.rect(0, 0, pageW, pageH, "F");
  pdf.setDrawColor(154, 134, 88);
  pdf.setLineWidth(0.45);
  pdf.rect(12, 12, pageW - 24, pageH - 24);

  pdf.setTextColor(36, 92, 84);
  pdf.setFont("times", "italic");
  pdf.setFontSize(20);
  pdf.text("Scriptoria", pageW / 2, 46, { align: "center" });

  pdf.setTextColor(26, 31, 36);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(26);
  pdf.text(book.titleZh, pageW / 2, 78, { align: "center" });

  pdf.setFont("times", "italic");
  pdf.setFontSize(14);
  pdf.setTextColor(58, 68, 80);
  pdf.text(book.titleEn, pageW / 2, 92, { align: "center" });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.setTextColor(91, 101, 112);
  pdf.text(book.subtitleZh, pageW / 2, 112, { align: "center" });
  pdf.text(book.spineZh, pageW / 2, 128, { align: "center" });
  pdf.text(`共 ${sheetCount} 張練習紙`, pageW / 2, 148, { align: "center" });

  pdf.setFontSize(10);
  pdf.text(
    `產生日期 ${new Date().toLocaleDateString("zh-HK")}`,
    pageW / 2,
    pageH - 28,
    { align: "center" },
  );
}

function drawGuidePage(pdf: jsPDF, book: PracticeBook) {
  pdf.addPage();
  const pageW = pdf.internal.pageSize.getWidth();
  pdf.setFillColor(247, 245, 241);
  pdf.rect(0, 0, pageW, pdf.internal.pageSize.getHeight(), "F");

  pdf.setTextColor(36, 92, 84);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("點樣用呢本練習簿", 18, 28);

  pdf.setTextColor(26, 31, 36);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);

  let y = 48;
  for (const line of book.guideLinesZh) {
    const wrapped = pdf.splitTextToSize(line, pageW - 36);
    pdf.text(wrapped, 18, y);
    y += wrapped.length * 7 + 4;
  }
}

function drawContents(pdf: jsPDF, sheets: PracticeSheet[]) {
  pdf.addPage();
  const pageW = pdf.internal.pageSize.getWidth();
  pdf.setFillColor(247, 245, 241);
  pdf.rect(0, 0, pageW, pdf.internal.pageSize.getHeight(), "F");

  pdf.setTextColor(36, 92, 84);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("目錄", 18, 28);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(26, 31, 36);

  let pageNo = 4;
  let y = 42;
  let lastStage: number | null = null;

  for (const sheet of sheets) {
    if (y > 280) {
      pdf.addPage();
      pdf.setFillColor(247, 245, 241);
      pdf.rect(0, 0, pageW, pdf.internal.pageSize.getHeight(), "F");
      y = 28;
    }

    if (lastStage !== sheet.stage) {
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(36, 92, 84);
      pdf.text(getStageLabel(sheet.stage), 18, y);
      y += 7;
      lastStage = sheet.stage;
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(58, 68, 80);
    }

    pdf.text(sheet.titleZh, 22, y, { maxWidth: pageW - 50 });
    pdf.text(String(pageNo), pageW - 18, y, { align: "right" });
    y += 6;
    pageNo += 1;
  }
}

async function buildPracticeBookPdf(
  book: PracticeBook,
  sheets: PracticeSheet[],
  onStatus: (message: string) => void,
) {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  onStatus("整緊封面同目錄…");
  drawCover(pdf, book, sheets.length);
  drawGuidePage(pdf, book);
  drawContents(pdf, sheets);

  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  for (let index = 0; index < sheets.length; index += 1) {
    const sheet = sheets[index];
    onStatus(`渲染 ${index + 1}/${sheets.length}：${sheet.titleZh}`);
    const jpeg = await renderSheetJpeg(sheet);
    pdf.addPage();
    pdf.addImage(jpeg, "JPEG", 0, 0, pageW, pageH);
    markSheetDownloaded(sheet.slug);
  }

  pdf.save(book.fileName);
}

function PracticeBookCard({ book }: { book: PracticeBook }) {
  const sheets = useMemo(() => getPracticeBookSheets(book), [book]);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  async function handleDownload() {
    if (busy) return;
    setBusy(true);
    setStatus("開始打包…");

    try {
      await buildPracticeBookPdf(book, sheets, setStatus);
      setStatus("下載完成。");
    } catch (error) {
      console.error("Practice book failed", error);
      setStatus("");
      window.alert("練習簿產生失敗，請稍後再試或改下載單張 PDF。");
    } finally {
      setBusy(false);
      window.setTimeout(() => setStatus(""), 4000);
    }
  }

  return (
    <article
      className={`practice-book-card${book.primary ? " practice-book-card--primary" : ""}`}
    >
      <p className="practice-book-card__eyebrow">
        {book.primary ? "初學首選" : "全集"}
      </p>
      <h3 className="practice-book-card__title">{book.titleZh}</h3>
      <p className="practice-book-card__en">{book.titleEn}</p>
      <p className="practice-book-card__summary">{book.summaryZh}</p>
      <p className="practice-book-card__meta">
        {sheets.length} 張 · {book.spineZh}
      </p>
      {status ? <p className="practice-book-card__status">{status}</p> : null}
      <button
        type="button"
        className={`btn${book.primary ? " btn--primary" : " btn--ghost"}`}
        onClick={handleDownload}
        disabled={busy}
      >
        {busy ? "正在打包…" : `下載${book.titleZh} PDF`}
      </button>
    </article>
  );
}

/** 練習簿下載區：斜體入門 + 完整全集 */
export function FullPracticeBookDownload() {
  return (
    <div className="practice-books">
      <div className="practice-books__head">
        <p className="full-book__eyebrow">Practice Books</p>
        <h2 className="full-book__title">下載練習簿</h2>
        <p className="full-book__text">
          含封面、使用說明、目錄同練習紙。初學請先下「斜體入門練習簿」。
        </p>
      </div>
      <div className="practice-books__grid">
        {practiceBooks.map((book) => (
          <PracticeBookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
