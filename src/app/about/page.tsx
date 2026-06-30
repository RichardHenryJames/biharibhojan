"use client";

import Link from "next/link";
import { ArrowRight, Flame, HandHeart, Leaf, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/context/LanguageContext";

const VALUE_ICONS = [Flame, Leaf, HandHeart];

type Stat = { value: string; label: string };
type Region = { emoji: string; region: string; dish: string; note: string };
type Value = { title: string; body: string };

export default function AboutPage() {
  const { t, tRaw } = useLanguage();
  const stats = tRaw<Stat[]>("about.stats") ?? [];
  const regions = tRaw<Region[]>("about.regions") ?? [];
  const values = tRaw<Value[]>("about.values") ?? [];

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-masala-100 bg-cream-200/40">
        <div className="pointer-events-none absolute -left-8 top-0 text-[9rem] opacity-10">
          🍲
        </div>
        <div className="container-bb relative py-14 lg:py-20">
          <span className="eyebrow mb-3">
            <span className="h-px w-6 bg-chili-500" /> {t("about.eyebrow")}
          </span>
          <h1 className="section-title max-w-3xl">
            {t("about.titleA")}{" "}
            <span className="text-gradient">{t("about.titleHighlight")}</span>{" "}
            {t("about.titleB")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-masala-600">{t("about.intro")}</p>
        </div>
      </section>

      {/* Story */}
      <section className="container-bb py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-gradient-to-br from-saffron-400 via-saffron-500 to-chili-600 shadow-warm">
              <div className="absolute inset-0 opacity-20 grain mix-blend-overlay" />
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 place-items-center text-7xl">
                <span>🥘</span>
                <span>🍚</span>
                <span>🔥</span>
                <span>🫓</span>
              </div>
              <div className="absolute bottom-5 left-5 rounded-2xl bg-masala-900/85 px-4 py-3 text-cream-50 backdrop-blur">
                <p className="font-display text-lg font-bold">{t("about.cardTitle")}</p>
                <p className="text-xs text-cream-100/70">{t("about.cardSub")}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4 text-[15px] leading-relaxed text-masala-600">
              <span className="eyebrow">
                <Sparkles className="h-3.5 w-3.5" /> {t("about.beganEyebrow")}
              </span>
              <h2 className="section-title !text-3xl">{t("about.beganTitle")}</h2>
              <p>{t("about.beganP1")}</p>
              <p>{t("about.beganP2")}</p>
              <p>{t("about.beganP3")}</p>
              <Link href="/menu" className="btn-primary mt-2 inline-flex">
                {t("about.tasteCta")} <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-masala-950 py-14 text-cream-50">
        <div className="container-bb grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s) => (
            <Reveal key={s.label} className="text-center">
              <div className="font-display text-4xl font-extrabold text-saffron-400 sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-cream-100/65">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What we cook */}
      <section className="container-bb py-20">
        <SectionHeading
          eyebrow={t("about.regionsEyebrow")}
          title={
            <>
              {t("about.regionsTitleA")}{" "}
              <span className="text-gradient">{t("about.regionsTitleHighlight")}</span>
            </>
          }
          subtitle={t("about.regionsSubtitle")}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {regions.map((r, i) => (
            <Reveal key={r.region} delay={i * 0.07}>
              <div className="card-surface h-full p-6">
                <span className="text-4xl">{r.emoji}</span>
                <h3 className="mt-3 font-display text-lg font-bold">{r.region}</h3>
                <p className="mt-1 text-sm font-semibold text-chili-600">{r.dish}</p>
                <p className="mt-2 text-sm leading-relaxed text-masala-500">{r.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-200/50 py-20">
        <div className="container-bb">
          <SectionHeading
            eyebrow={t("about.valuesEyebrow")}
            title={
              <>
                {t("about.valuesTitleA")}{" "}
                <span className="text-gradient">{t("about.valuesTitleHighlight")}</span>
              </>
            }
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((v, i) => {
              const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
              return (
                <Reveal key={v.title} delay={i * 0.08}>
                  <div className="card-surface h-full p-7">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-saffron-400 to-chili-600 text-white shadow-warm">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-bold">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-masala-500">{v.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
