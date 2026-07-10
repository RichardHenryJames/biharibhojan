"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import { useLanguage } from "@/context/LanguageContext";
import { dishImage } from "@/data/dishImages";

type Info = { title: string; lines: string[] };
type Faq = { q: string; a: string };

export default function ContactContent() {
  const { t, tRaw, lang } = useLanguage();
  const info = tRaw<Info[]>("contact.info") ?? [];
  const faqs = tRaw<Faq[]>("contact.faqs") ?? [];

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__copy">
          <span className="eyebrow">{t("contact.eyebrow")}</span>
          <h1>
            {t("contact.titleA")} {t("contact.titleHighlight")}
          </h1>
          <p>{t("contact.intro")}</p>
        </div>
        <div className="page-hero__visual">
          <Image
            src={dishImage("thekua") as string}
            alt={lang === "hi" ? "घर का ठेकुआ" : "Homemade Thekua"}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 46vw"
          />
          <span className="page-hero__stamp">Vishnupuri · Hazaribagh</span>
        </div>
      </section>

      <section className="contact-layout container-bb">
        <div>
          <div className="contact-ledger">
            {info.map((item, index) => (
              <div key={item.title} className="contact-info-row">
                <span className="contact-info-row__number">0{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  {item.lines.map((line) => <p key={line}>{line}</p>)}
                </div>
              </div>
            ))}
          </div>

          <p className="contact-open">{t("contact.hoursOpen")}</p>
          <a href="tel:+919934012345" className="contact-call">
            <MessageCircle className="h-4 w-4" /> {t("contact.whatsapp")}
          </a>
        </div>

        <ContactForm />
      </section>

      <section className="contact-faq container-bb">
        <h2>
          {t("contact.faqTitleA")} {t("contact.faqTitleHighlight")}
        </h2>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.q} className="faq-item">
              <summary>
                {faq.q}
                <span aria-hidden>+</span>
              </summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
