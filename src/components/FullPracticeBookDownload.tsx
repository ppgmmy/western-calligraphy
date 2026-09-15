"use client";

import { createRoot, type Root } from "react-dom/client";
import { jsPDF } from "jspdf";
import { useMemo, useState } from "react";
import { PracticeSheetArt } from "@/components/PracticeSheetArt";
import {
  getStageLabel,
  practiceSheets,
  practiceStages,
  type PracticeSheet,
} from "@/data/resources";
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

function drawCover(pdf: jsPDF) {
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  pdf.setFillColor(247, 245, 241);
  pdf.rect(0, 0, pageW, pageH, "F");
  pdf.setDrawColor(154, 134, 88);
  pdf.setLineWidth(0.4);
  pdf.rect(12, 12, pageW - 24, pageH - 24);

  pdf.setTextColor(36, 92, 84);
  pdf.setFont("times", "italic");
  pdf.setFontSize(18);
  pdf.text("Scriptoria", pageW / 2, 48, { align: "center" });

  pdf.setTextColor(26, 31, 36);
  pdf.setFont("times", "bold");
  pdf.setFontSize(28);
  pdf.text("Western Calligraphy", pageW / 2, 78, { align: "center" });
  pdf.setFontSize(22);
  pdf.text("Practice Book", pageW / 2, 92, { align: "center" });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.setTextColor(91, 101, 112);
  pdf.text("Complete printable workbook", pageW / 2, 112, { align: "center" });
  pdf.text("Cover · Guide · Contents · All sheets", pageW / 2, 122, {
    align: "center",
  });
  pdf.setFontSize(11);
  pdf.text("Warm-up → Families → Words → Sentences", pageW / 2, 150, {
    align: "center",
  });
  pdf.text("Italic · Copperplate · Spencerian · Flourishing", pageW / 2, 160, {
    align: "center",
  });
  pdf.setFontSize(10);
  pdf.text(`Generated ${new Date().toLocaleDateString("en-GB")}`, pageW / 2, pageH - 28, {
    align: "center",
  });
}

function drawGuidePage(pdf: jsPDF) {
  pdf.addPage();
  const pageW = pdf.internal.pageSize.getWidth();
  pdf.setFillColor(247, 245, 241);
  pdf.rect(0, 0, pageW, pdf.internal.pageSize.getHeight(), "F");

  pdf.setTextColor(36, 92, 84);
  pdf.setFont("times", "italic");
  pdf.setFontSize(16);
  pdf.text("How to use this book", 18, 28);

  pdf.setTextColor(26, 31, 36);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);

  const lines = [
    "1. Warm up with guidelines and stroke drills before letters.",
    "2. Practice letter families in small groups; quality over quantity.",
    "3. Move to words, then sentences, by difficulty (easy → hard).",
    "4. Print at A4 actual size; turn off headers and footers.",
    "5. Mark sheets completed in the website progress tracker.",
    "",
    "Suggested session: 15–20 minutes, one family or one difficulty sheet.",
    "Pointed-pen tracks (Copperplate / Spencerian / Flourishing) can run in parallel.",
  ];

  let y = 48;
  for (const line of lines) {
    pdf.text(line, 18, y, { maxWidth: pageW - 36 });
    y += 10;
  }
}

function drawContents(pdf: jsPDF, sheets: PracticeSheet[]) {
  pdf.addPage();
  const pageW = pdf.internal.pageSize.getWidth();
  pdf.setFillColor(247, 245, 241);
  pdf.rect(0, 0, pageW, pdf.internal.pageSize.getHeight(), "F");

  pdf.setTextColor(36, 92, 84);
  pdf.setFont("times", "italic");
  pdf.setFontSize(16);
  pdf.text("Contents", 18, 28);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(26, 31, 36);

  let pageNo = 4;
  let y = 42;

  for (const stage of practiceStages) {
    const stageSheets = sheets.filter((sheet) => sheet.stage === stage.stage);
    if (stageSheets.length === 0) continue;

    if (y > 270) {
      pdf.addPage();
      pdf.setFillColor(247, 245, 241);
      pdf.rect(0, 0, pageW, pdf.internal.pageSize.getHeight(), "F");
      y = 28;
    }

    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(36, 92, 84);
    pdf.text(stage.titleEn, 18, y);
    y += 7;

    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(58, 68, 80);
    for (const sheet of stageSheets) {
      if (y > 280) {
        pdf.addPage();
        pdf.setFillColor(247, 245, 241);
        pdf.rect(0, 0, pageW, pdf.internal.pageSize.getHeight(), "F");
        y = 28;
      }
      pdf.text(sheet.titleEn, 22, y, { maxWidth: pageW - 50 });
      pdf.text(String(pageNo), pageW - 18, y, { align: "right" });
      y += 6;
      pageNo += 1;
    }
    y += 4;
  }
}

export function FullPracticeBookDownload() {
  const sheets = useMemo(
    () =>
      [...practiceSheets].sort((a, b) => {
        if (a.stage !== b.stage) return a.stage - b.stage;
        return a.titleEn.localeCompare(b.titleEn);
      }),
    [],
  );

  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  async function handleDownload() {
    if (busy) return;
    setBusy(true);
    setStatus("Building cover and contents…");

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      drawCover(pdf);
      drawGuidePage(pdf);
      drawContents(pdf, sheets);

      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();

      for (let index = 0; index < sheets.length; index += 1) {
        const sheet = sheets[index];
        setStatus(
          `Rendering sheet ${index + 1}/${sheets.length}: ${sheet.titleEn}`,
        );
        const jpeg = await renderSheetJpeg(sheet);
        pdf.addPage();
        pdf.addImage(jpeg, "JPEG", 0, 0, pageW, pageH);
        markSheetDownloaded(sheet.slug);
      }

      pdf.save("scriptoria-complete-practice-book.pdf");
      setStatus("下載完成。");
    } catch (error) {
      console.error("Full practice book failed", error);
      setStatus("");
      window.alert("完整練習本產生失敗，請稍後再試或改下載單張 PDF。");
    } finally {
      setBusy(false);
      window.setTimeout(() => setStatus(""), 4000);
    }
  }

  return (
    <div className="full-book">
      <div className="full-book__copy">
        <p className="full-book__eyebrow">Complete Book</p>
        <h2 className="full-book__title">下載完整練習本</h2>
        <p className="full-book__text">
          含封面、使用說明、目錄，以及全部 {sheets.length}{" "}
          張練習紙（依級別排序）。檔案較大，產生時請稍候。
        </p>
        {status ? <p className="full-book__status">{status}</p> : null}
      </div>
      <button
        type="button"
        className="btn btn--primary"
        onClick={handleDownload}
        disabled={busy}
      >
        {busy ? "正在打包…" : "下載完整練習本 PDF"}
      </button>
      <p className="full-book__note">
        {getStageLabel(0)} → {getStageLabel(4)}
      </p>
    </div>
  );
}
