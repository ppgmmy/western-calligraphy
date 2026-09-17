import type { Metadata } from "next";
import Link from "next/link";
import { LabWorksheetGenerator } from "@/components/LabWorksheetGenerator";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "字帖生成器",
  description:
    "Scriptoria 超级實驗室多款式字帖生成器：換草體、調斜度格線、描紅練習，可列印。",
};

export default function LabGeneratorPage() {
  return (
    <main id="top" className="inner-page lab-page lab-page--generator">
      <div className="no-print">
        <SiteHeader variant="inner" />
        <section className="lab-generator-intro">
          <p className="lab-generator-intro__brand">Scriptoria</p>
          <h1 className="lab-generator-intro__title">字帖生成器</h1>
          <p className="lab-generator-intro__text">
            實驗室工具：用揀定嘅草體即時出練習紙，肉眼對完字再落紙。
          </p>
          <p>
            <Link className="btn btn--ghost" href="/lab">
              返回超级實驗室
            </Link>
          </p>
        </section>
      </div>
      <LabWorksheetGenerator />
      <div className="no-print">
        <SiteFooter />
      </div>
    </main>
  );
}
