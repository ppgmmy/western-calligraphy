import type { Metadata } from "next";
import Link from "next/link";
import { LabFontSample } from "@/components/LabFontSample";
import { LabScriptSample } from "@/components/LabScriptSample";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  countLabScriptSpecimens,
  formatLabVersion,
  getArchivedLabFonts,
  getCurrentLabFonts,
  getLabChangelogNewestFirst,
  getLabCompareRows,
  getLabScriptSpecimens,
  labArchiveKindLabel,
  labChangeKindLabel,
  labFontStatusLabel,
  labScriptTierLabel,
} from "@/data/lab";

export const metadata: Metadata = {
  title: "超级實驗室",
  description:
    "Scriptoria 私人實驗室：字體版本歸檔、變更 log，方便查驗同對比。",
};

function LabReticle() {
  return (
    <svg
      className="lab-hero__reticle"
      viewBox="0 0 640 420"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="lab-stage" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b7c4cf" stopOpacity="0.35" />
          <stop offset="55%" stopColor="#8fa0ad" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#245c54" stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <rect width="640" height="420" fill="url(#lab-stage)" />
      {Array.from({ length: 13 }, (_, i) => (
        <line
          key={`v-${i}`}
          x1={40 + i * 46}
          y1="28"
          x2={40 + i * 46}
          y2="392"
          stroke="rgba(26,31,36,0.12)"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <line
          key={`h-${i}`}
          x1="28"
          y1={36 + i * 44}
          x2="612"
          y2={36 + i * 44}
          stroke="rgba(26,31,36,0.1)"
          strokeWidth="1"
        />
      ))}
      <rect
        x="88"
        y="78"
        width="464"
        height="264"
        fill="none"
        stroke="#245c54"
        strokeWidth="1.5"
        opacity="0.55"
      />
      <path
        d="M88 98 V78 H108 M440 78 H552 V98 M88 322 V342 H108 M532 342 H552 V322"
        fill="none"
        stroke="#9a8658"
        strokeWidth="2"
      />
      <circle
        cx="320"
        cy="210"
        r="86"
        fill="none"
        stroke="#245c54"
        strokeWidth="1.25"
        opacity="0.7"
      />
      <circle
        cx="320"
        cy="210"
        r="42"
        fill="none"
        stroke="#9a8658"
        strokeWidth="1"
        opacity="0.8"
      />
      <line
        x1="320"
        y1="112"
        x2="320"
        y2="308"
        stroke="rgba(36,92,84,0.45)"
        strokeWidth="1"
      />
      <line
        x1="222"
        y1="210"
        x2="418"
        y2="210"
        stroke="rgba(36,92,84,0.45)"
        strokeWidth="1"
      />
      <text
        x="320"
        y="218"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="54"
        fontStyle="italic"
        fill="#1a1f24"
        opacity="0.72"
      >
        a
      </text>
      <text
        x="112"
        y="68"
        fontFamily="ui-monospace, monospace"
        fontSize="11"
        letterSpacing="0.18em"
        fill="#245c54"
      >
        OPTICAL BENCH · SPECIMEN STAGE
      </text>
    </svg>
  );
}

export default function LabPage() {
  const log = getLabChangelogNewestFirst();
  const current = getCurrentLabFonts();
  const archived = getArchivedLabFonts();
  const italicCompare = getLabCompareRows("scriptoria-italic");
  const scriptSpecimens = getLabScriptSpecimens();
  const scriptCount = countLabScriptSpecimens();
  const activeFingerprint = italicCompare[0]?.fingerprint ?? "--------";

  return (
    <main id="top" className="inner-page lab-page">
      <SiteHeader variant="inner" />

      <section className="lab-hero" aria-labelledby="lab-title">
        <div className="lab-hero__copy">
          <p className="lab-hero__brand">Scriptoria</p>
          <p className="lab-hero__station">ATELIER METROLOGY · STATION 01</p>
          <h1 className="lab-hero__title" id="lab-title">
            超级實驗室
          </h1>
          <p className="lab-hero__text">
            技能實驗室專收草階／撩草——藝術氣息要夠。字形歸檔同
            checksum 對照，唔靠感覺估。
          </p>
          <div className="lab-hero__actions">
            <a className="btn" href="#lab-scripts">
              打開草體標本庫
            </a>
            <a className="btn btn--ghost" href="#lab-compare">
              版本對照台
            </a>
          </div>
          <dl className="lab-hero__readout" aria-label="儀器讀數">
            <div>
              <dt>ACTIVE</dt>
              <dd>{formatLabVersion(current[0]?.version ?? "—")}</dd>
            </div>
            <div>
              <dt>FP</dt>
              <dd>{activeFingerprint}</dd>
            </div>
            <div>
              <dt>SCRIPTS</dt>
              <dd>{scriptCount}</dd>
            </div>
          </dl>
        </div>
        <div className="lab-hero__stage" aria-hidden="true">
          <LabReticle />
          <span className="lab-hero__scan" />
        </div>
      </section>

      <section
        className="lab-bay lab-bay--scripts"
        id="lab-scripts"
        aria-labelledby="lab-scripts-title"
      >
        <header className="lab-bay__head">
          <p className="lab-bay__slot">BAY S · SCRIPT GALLERY</p>
          <h2 className="lab-bay__title" id="lab-scripts-title">
            草體標本庫
          </h2>
          <p className="lab-bay__text">
            只收細草、撩草、花飾草——要有藝術氣息。全部 OFL
            合法使用；哥德／印刷體唔入呢櫃。
          </p>
        </header>
        <div className="lab-script-gallery">
          {scriptSpecimens.map((specimen, index) => (
            <article
              className="lab-specimen lab-specimen--script"
              key={specimen.id}
              style={{ animationDelay: `${0.04 * index}s` }}
            >
              <div className="lab-specimen__ticks" aria-hidden="true" />
              <p className="lab-specimen__tag">
                {labScriptTierLabel(specimen.tier)} · {specimen.license}
              </p>
              <h3 className="lab-specimen__name">{specimen.family}</h3>
              <p className="lab-specimen__mood">{specimen.moodZh}</p>
              <div className="lab-specimen__glass lab-specimen__glass--script">
                <LabScriptSample specimen={specimen} />
              </div>
              <p className="lab-specimen__notes">{specimen.notesZh}</p>
              <p className="lab-specimen__meta">SRC {specimen.source}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lab-bay" aria-labelledby="lab-current-title">
        <header className="lab-bay__head">
          <p className="lab-bay__slot">BAY A · LIVE SPECIMEN</p>
          <h2 className="lab-bay__title" id="lab-current-title">
            現行字體
          </h2>
          <p className="lab-bay__text">台上唯一生效樣本。下載前先核對 fingerprint。</p>
        </header>
        <div className="lab-specimen-rail">
          {current.map((font) => (
            <article className="lab-specimen" key={font.id}>
              <div className="lab-specimen__ticks" aria-hidden="true" />
              <p className="lab-specimen__tag">
                LIVE · {formatLabVersion(font.version)} · {font.createdAt}
              </p>
              <h3 className="lab-specimen__name">{font.family}</h3>
              <div className="lab-specimen__glass">
                <LabFontSample font={font} className="lab-card__sample" />
                <span className="lab-specimen__scan" aria-hidden="true" />
              </div>
              <p className="lab-specimen__notes">{font.notesZh}</p>
              <p className="lab-specimen__meta">
                SRC {font.source}
                <br />
                WOFF2 {font.checksums.woff2.slice(0, 12)}…
              </p>
              <ul className="lab-specimen__ports">
                <li>
                  <a href={font.files.woff2}>WOFF2</a>
                </li>
                <li>
                  <a href={font.files.ttf}>TTF</a>
                </li>
                {font.files.manifest ? (
                  <li>
                    <a href={font.files.manifest}>MANIFEST</a>
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

      <section
        className="lab-bay lab-bay--bench"
        id="lab-compare"
        aria-labelledby="lab-compare-title"
      >
        <header className="lab-bay__head">
          <p className="lab-bay__slot">BAY B · OPTICAL COMPARE</p>
          <h2 className="lab-bay__title" id="lab-compare-title">
            版本對照台
          </h2>
          <p className="lab-bay__text">
            現行在前。fingerprint 相同＝檔案一致，唔係眼睛看錯。
          </p>
        </header>
        <div className="lab-compare-bench">
          {italicCompare.map(({ font, matchesCurrent, fingerprint }, index) => {
            const archiveLabel = labArchiveKindLabel(font.archiveKind);
            return (
              <article
                className={`lab-specimen lab-specimen--compare${font.status === "archived" ? " lab-specimen--archived" : ""}`}
                key={`compare-${font.id}`}
                style={{ animationDelay: `${0.08 * index}s` }}
              >
                <div className="lab-specimen__ticks" aria-hidden="true" />
                <p className="lab-specimen__tag">
                  {labFontStatusLabel(font.status)}
                  {archiveLabel ? ` · ${archiveLabel}` : ""} ·{" "}
                  {formatLabVersion(font.version)}
                  {font.status === "archived" && matchesCurrent
                    ? " · MATCH"
                    : ""}
                </p>
                <div className="lab-specimen__glass">
                  <LabFontSample font={font} className="lab-card__sample" />
                </div>
                <p className="lab-specimen__notes">{font.notesZh}</p>
                <p className="lab-specimen__meta">FP {fingerprint}</p>
                <ul className="lab-specimen__ports">
                  <li>
                    <a href={font.files.woff2}>WOFF2</a>
                  </li>
                  <li>
                    <a href={font.files.ttf}>TTF</a>
                  </li>
                  {font.files.manifest ? (
                    <li>
                      <a href={font.files.manifest}>MANIFEST</a>
                    </li>
                  ) : null}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="lab-bay" aria-labelledby="lab-archive-title">
        <header className="lab-bay__head">
          <p className="lab-bay__slot">BAY C · COLD VAULT</p>
          <h2 className="lab-bay__title" id="lab-archive-title">
            歸檔庫
          </h2>
          <p className="lab-bay__text">
            實體檔：<code>public/fonts/_archive/</code>
            。checksum 重複會跳過拷貝。
          </p>
        </header>
        <ul className="lab-vault">
          {archived.map((font) => {
            const archiveLabel = labArchiveKindLabel(font.archiveKind);
            return (
              <li className="lab-vault__row" key={font.id}>
                <span className="lab-vault__id">
                  {font.family} {formatLabVersion(font.version)}
                  {archiveLabel ? ` · ${archiveLabel}` : ""}
                </span>
                <span className="lab-vault__when">
                  {font.archivedAt?.slice(0, 10) ?? font.createdAt}
                </span>
                <span className="lab-vault__fp">
                  {font.checksums.woff2.slice(0, 8)}
                </span>
                <span className="lab-vault__ports">
                  <a href={font.files.woff2}>woff2</a>
                  <a href={font.files.ttf}>ttf</a>
                  {font.files.manifest ? (
                    <a href={font.files.manifest}>manifest</a>
                  ) : null}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section
        className="lab-bay lab-bay--log"
        id="lab-log"
        aria-labelledby="lab-log-title"
      >
        <header className="lab-bay__head">
          <p className="lab-bay__slot">BAY D · LAB NOTEBOOK</p>
          <h2 className="lab-bay__title" id="lab-log-title">
            實驗 log
          </h2>
          <p className="lab-bay__text">
            只追加。機器副本：<code>lab-log.jsonl</code>
          </p>
        </header>
        <ol className="lab-notebook">
          {log.map((entry, index) => (
            <li
              className="lab-notebook__entry"
              key={entry.id}
              style={{ animationDelay: `${0.05 * index}s` }}
            >
              <div className="lab-notebook__stamp">
                <time dateTime={entry.date}>{entry.date}</time>
                <span>{labChangeKindLabel(entry.kind)}</span>
                {entry.version ? (
                  <span>
                    {formatLabVersion(entry.version)}
                    {entry.previousVersion
                      ? ` ← ${formatLabVersion(entry.previousVersion)}`
                      : ""}
                  </span>
                ) : null}
              </div>
              <h3 className="lab-notebook__title">{entry.titleZh}</h3>
              <p className="lab-notebook__summary">{entry.summaryZh}</p>
              {entry.paths && entry.paths.length > 0 ? (
                <ul className="lab-notebook__paths">
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

      <section className="lab-bay lab-bay--ops" aria-label="實驗室操作">
        <p className="lab-bay__text">
          有實質改動請升版：{" "}
          <code>npm run fonts:scriptoria-italic -- 1.001</code>
          ，再追加 changelog 與 fontRegistry。
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
