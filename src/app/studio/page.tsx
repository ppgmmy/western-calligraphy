import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  contactChannels,
  studioProcess,
  studioServices,
} from "@/data/atelier";

export const metadata: Metadata = {
  title: "服務與聯絡",
  description:
    "Scriptoria 西洋書法工作室服務項目、委託流程與聯絡方式——婚禮字跡、企業識別、課程與示範。",
};

export default function StudioPage() {
  return (
    <main id="top" className="inner-page">
      <SiteHeader variant="inner" />

      <section className="section page-intro" aria-labelledby="studio-title">
        <div className="section__head">
          <p className="section__eyebrow">Studio Services</p>
          <h1 className="section__title" id="studio-title">
            服務項目與委託流程
          </h1>
          <p className="section__text">
            無論是婚禮字跡、企業識別，或個人課程，我們都以同一套紀律完成：先釐清用途與風格，再進入草稿與定稿。
          </p>
        </div>
      </section>

      <section
        className="section"
        id="services"
        aria-labelledby="offerings-title"
      >
        <div className="section__head">
          <p className="section__eyebrow">Offerings</p>
          <h2 className="section__title" id="offerings-title">
            四大服務範疇
          </h2>
        </div>
        <div className="services-rail">
          {studioServices.map((service) => (
            <article key={service.id} className="service-panel">
              <p className="service-category">{service.category}</p>
              <h3>{service.title}</h3>
              <p className="service-en">{service.titleEn}</p>
              <p>{service.summary}</p>
              <ul>
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="service-note">{service.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section"
        id="process"
        aria-labelledby="process-title"
      >
        <div className="section__head">
          <p className="section__eyebrow">Process</p>
          <h2 className="section__title" id="process-title">
            標準委託流程
          </h2>
          <p className="section__text">
            清楚的步驟，減少來回猜測，讓字跡品質與時程更可預期。
          </p>
        </div>
        <ol className="process-list">
          {studioProcess.map((step) => (
            <li key={step.step}>
              <span className="process-step" aria-hidden="true">
                {step.step}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="section"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="section__head">
          <p className="section__eyebrow">Contact</p>
          <h2 className="section__title" id="contact-title">
            聯絡工作室
          </h2>
          <p className="section__text">
            請依需求選擇最適合的管道。商業委託請盡量附上用途、時程與參考風格。
          </p>
        </div>
        <ul className="contact-list">
          {contactChannels.map((channel) => (
            <li key={channel.label}>
              <h3>{channel.label}</h3>
              <a href={channel.href}>{channel.value}</a>
              <p>{channel.note}</p>
            </li>
          ))}
        </ul>
        <div className="cta-row practice-cta">
          <Link className="btn btn--ghost" href="/resources">
            先從練習本開始
          </Link>
          <Link className="btn btn--ghost" href="/atelier">
            認識工作室理念
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
