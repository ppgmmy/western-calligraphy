import type { Metadata } from "next";
import Link from "next/link";
import { LabFontSample } from "@/components/LabFontSample";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  getArchivedLabFonts,
  getCurrentLabFonts,
  getLabChangelogNewestFirst,
  getLabFontsByFamily,
  type LabChangeKind,
} from "@/data/lab";

export const metadata: Metadata = {
  title: "超级實驗室",
  description:
    "Scriptoria 私人實驗室：字體版本歸檔、變更 log，方便查驗同對比。",
};

function kindLabel(kind: LabChangeKind): string {
  switch (kind) {
    case "font-release":
      return "字體發行";
    case "font-archive":
      return "字體歸檔";
    case "glyph-edit":
      return "字形庫";
    case "sheet-ui":
      return "練習紙 UI";
    case "policy":
      return "實驗室規則";
    case "note":
      return "筆記";
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}

export default function LabPage() {
  const log = getLabChangelogNewestFirst();
  const current = getCurrentLabFonts();
  const archived = getArchivedLabFonts();
  const italicVersions = getLabFontsByFamily("Scriptoria Italic");

  return (
    <main id="top" className="inner-page">
      <SiteHeader variant="inner" />

      <section className="section page-intro" aria-labelledby="lab-title">
        <div className="section__head">
          <p className="section__eyebrow">Super Lab</p>
          <h1 className="section__title" id="lab-title">
            超级實驗室
          </h1>
          <p className="section__text">
            呢度係私人實驗場：每次改字體／字形會留 log，舊版字體搬入
            archive，方便查驗同版本對比。唔對外公開當產品賣。
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="lab-current-title">
        <div className="section__head">
          <p className="section__eyebrow">Current fonts</p>
          <h2 className="section__title" id="lab-current-title">
            現行字體
          </h2>
        </div>
        <div className="lab-version-grid">
          {current.map((font) => (
            <article className="lab-card" key={font.id}>
              <p className="lab-card__meta">
                v{font.version} · {font.createdAt} · {font.license}
              </p>
              <h3 className="lab-card__title">{font.family}</h3>
              <LabFontSample font={font} />
              <p className="lab-card__notes">{font.notesZh}</p>
              <p className="lab-card__source">來源：{font.source}</p>
              <ul className="lab-card__files">
                <li>
                  <a href={font.files.woff2}>WOFF2</a>
                </li>
                <li>
                  <a href={font.files.ttf}>TTF</a>
                </li>
                {font.files.manifest ? (
                  <li>
                    <a href={font.files.manifest}>manifest</a>
                  </li>
                ) : null}
                {font.files.ofl ? (
                  <li>
                    <a href={font.files.ofl}>OFL</a>
                  </li>
                ) : null}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="lab-compare-title">
        <div className="section__head">
          <p className="section__eyebrow">Compare</p>
          <h2 className="section__title" id="lab-compare-title">
            Scriptoria Italic 版本對比
          </h2>
          <p className="section__text">
            每版獨立載入字體檔並排睇 sample；亦可下載逐版核對 checksum（見各版
            manifest）。
          </p>
        </div>
        <div className="lab-compare-grid">
          {italicVersions.map((font) => (
            <article
              className={`lab-card${font.status === "archived" ? " lab-card--archived" : ""}`}
              key={`compare-${font.id}`}
            >
              <p className="lab-card__badge">
                {font.status === "current" ? "現行" : "歸檔"} · v{font.version}
              </p>
              <LabFontSample font={font} />
              <p className="lab-card__notes">{font.notesZh}</p>
              <ul className="lab-card__files">
                <li>
                  <a href={font.files.woff2}>WOFF2</a>
                </li>
                <li>
                  <a href={font.files.ttf}>TTF</a>
                </li>
                {font.files.manifest ? (
                  <li>
                    <a href={font.files.manifest}>manifest</a>
                  </li>
                ) : null}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="lab-archive-title">
        <div className="section__head">
          <p className="section__eyebrow">Archive</p>
          <h2 className="section__title" id="lab-archive-title">
            歸檔字體
          </h2>
          <p className="section__text">
            實體檔喺 <code>public/fonts/_archive/</code>。每次{" "}
            <code>npm run fonts:scriptoria-italic</code>{" "}
            會先把現行版搬入呢度先覆寫。
          </p>
        </div>
        <ul className="lab-archive-list">
          {archived.map((font) => (
            <li key={font.id}>
              <strong>
                {font.family} v{font.version}
              </strong>
              <span>{font.createdAt}</span>
              <a href={font.files.woff2}>woff2</a>
              <a href={font.files.ttf}>ttf</a>
              {font.files.manifest ? (
                <a href={font.files.manifest}>manifest</a>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="lab-log-title">
        <div className="section__head">
          <p className="section__eyebrow">Changelog</p>
          <h2 className="section__title" id="lab-log-title">
            實驗 log
          </h2>
          <p className="section__text">
            UI 可讀 log 喺 <code>src/data/lab/changelog.ts</code>
            （只追加）。機器 log 另見{" "}
            <code>public/fonts/_archive/lab-log.jsonl</code>。
          </p>
        </div>
        <ol className="lab-log">
          {log.map((entry) => (
            <li key={entry.id} className="lab-log__item">
              <div className="lab-log__head">
                <time dateTime={entry.date}>{entry.date}</time>
                <span className="lab-log__kind">{kindLabel(entry.kind)}</span>
                {entry.version ? (
                  <span className="lab-log__ver">v{entry.version}</span>
                ) : null}
              </div>
              <h3 className="lab-log__title">{entry.titleZh}</h3>
              <p className="lab-log__summary">{entry.summaryZh}</p>
              {entry.paths && entry.paths.length > 0 ? (
                <ul className="lab-log__paths">
                  {entry.paths.map((path) => (
                    <li key={path}>
                      <code>{path}</code>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <section className="section" aria-label="實驗室操作">
        <p className="section__text">
          改字體後請：1){" "}
          <code>npm run fonts:scriptoria-italic -- &lt;新版號&gt;</code> 2)
          喺 <code>src/data/lab/changelog.ts</code> 追加一條 3) 如有新
          archive，更新 <code>src/data/lab/fontRegistry.ts</code>。
        </p>
        <p>
          <Link className="btn btn--ghost" href="/resources">
            返回練習本
          </Link>
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
