"use client";

import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import { useLanguage } from "@/context/LanguageContext";

const INFO_ICONS = [MapPin, Phone, Mail];

type Info = { title: string; lines: string[] };
type Faq = { q: string; a: string };

export default function ContactPage() {
  const { t, tRaw } = useLanguage();
  const info = tRaw<Info[]>("contact.info") ?? [];
  const faqs = tRaw<Faq[]>("contact.faqs") ?? [];

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-masala-100 bg-cream-200/40">
        <div className="pointer-events-none absolute -right-8 top-0 text-[9rem] opacity-10">
          📞
        </div>
        <div className="container-bb relative py-14 lg:py-20">
          <span className="eyebrow mb-3">
            <span className="h-px w-6 bg-chili-500" /> {t("contact.eyebrow")}
          </span>
          <h1 className="section-title max-w-2xl">
            {t("contact.titleA")} <span className="text-gradient">{t("contact.titleHighlight")}</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-masala-600">
            {t("contact.intro")}
          </p>
        </div>
      </section>

      <section className="container-bb py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Left: info */}
          <div className="space-y-5">
            {info.map((c, i) => {
              const Icon = INFO_ICONS[i] ?? MapPin;
              return (
                <div
                  key={c.title}
                  className="flex gap-4 rounded-2xl border border-masala-100 bg-cream-50 p-5 shadow-soft"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-saffron-400 to-chili-600 text-white shadow-warm">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold">{c.title}</h3>
                    {c.lines.map((l) => (
                      <p key={l} className="text-sm text-masala-500">
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}

            <div className="flex items-center gap-3 rounded-2xl bg-leaf-100 p-5">
              <Clock className="h-5 w-5 text-leaf-700" />
              <p className="text-sm font-semibold text-leaf-700">
                {t("contact.hoursOpen")}
              </p>
            </div>

            <a
              href="tel:+919934012345"
              className="flex items-center justify-center gap-2 rounded-2xl bg-masala-900 p-5 font-semibold text-cream-50 transition-colors hover:bg-masala-800"
            >
              <MessageCircle className="h-5 w-5 text-saffron-400" />
              {t("contact.whatsapp")}
            </a>
          </div>

          {/* Right: form */}
          <ContactForm />
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="section-title !text-3xl text-center">
            {t("contact.faqTitleA")} <span className="text-gradient">{t("contact.faqTitleHighlight")}</span>
          </h2>
          <div className="mx-auto mt-8 grid max-w-3xl gap-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-masala-100 bg-cream-50 p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-masala-900">
                  {f.q}
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cream-200 text-lg transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-masala-500">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
