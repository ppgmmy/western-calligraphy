import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  atelierCredentials,
  atelierManifesto,
  atelierPrinciples,
} from "@/data/atelier";

export const metadata: Metadata = {
  title: "工作室",
  description:
    "Scriptoria 西洋書法工作室理念、師資資歷與教學原則——以筆尖紀律與紙上節奏為核心。",
};

export default function AtelierPage() {
  return (
    <main id="top" className="inner-page">
      <SiteHeader variant="inner" />

      <section className="section page-intro" aria-labelledby="atelier-title">
        <div className="section__head">
          <p className="section__eyebrow">The Atelier</p>
          <h1 className="section__title" id="atelier-title">
            {atelierManifesto.titleZh}
          </h1>
          <p className="section__text">{atelierManifesto.lead}</p>
        </div>
      </section>

      <section className="section atelier-essay" aria-label="工作室理念">
        {atelierManifesto.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section
        className="section"
        aria-labelledby="credentials-title"
      >
        <div className="section__head">
          <p className="section__eyebrow">Credentials</p>
          <h2 className="section__title" id="credentials-title">
            資歷與教學根基
          </h2>
          <p className="section__text">
            公開說明工作室的專業背景，讓學習者與委託方都能清楚判斷適配度。
          </p>
        </div>
        <ul className="credential-list">
          {atelierCredentials.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="principles-title">
        <div className="section__head">
          <p className="section__eyebrow">Principles</p>
          <h2 className="section__title" id="principles-title">
            教學與委託的共同原則
          </h2>
        </div>
        <ol className="principle-list">
          {atelierPrinciples.map((item, index) => (
            <li key={item.title}>
              <span className="principle-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section atelier-cta" aria-labelledby="atelier-next">
        <div className="section__head">
          <p className="section__eyebrow">Next</p>
          <h2 className="section__title" id="atelier-next">
            想了解服務項目，或直接開始練習？
          </h2>
        </div>
        <div className="cta-row">
          <Link className="btn btn--primary" href="/studio">
            查看服務與流程
          </Link>
          <Link className="btn btn--ghost" href="/resources">
            進入練習本
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
