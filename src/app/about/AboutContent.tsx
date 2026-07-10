"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { dishImage } from "@/data/dishImages";

type Stat = { value: string; label: string };
type Region = { emoji: string; region: string; dish: string; note: string };
type Value = { title: string; body: string };

const REGION_IMAGES = [
  "aloo-bhujia",
  "besan-aloo-sabzi",
  "arhar-dal-tadka",
  "rajma-masala",
];

export default function AboutContent() {
  const { t, tRaw, lang } = useLanguage();
  const stats = tRaw<Stat[]>("about.stats") ?? [];
  const regions = tRaw<Region[]>("about.regions") ?? [];
  const values = tRaw<Value[]>("about.values") ?? [];

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__copy">
          <span className="eyebrow">{t("about.eyebrow")}</span>
          <h1>
            {t("about.titleA")} {t("about.titleHighlight")} {t("about.titleB")}
          </h1>
          <p>{t("about.intro")}</p>
        </div>
        <div className="page-hero__visual">
          <Image
            src={dishImage("ghar-ki-thali") as string}
            alt={lang === "hi" ? "घर की थाली" : "Ghar ki Thali"}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 46vw"
          />
          <span className="page-hero__stamp">{t("about.cardTitle")}</span>
        </div>
      </section>

      <section className="about-story">
        <div className="about-story__layout container-bb">
          <Reveal className="about-story__visual" y={0}>
            <div className="about-story__visual-main">
              <Image
                src={dishImage("arhar-dal-tadka") as string}
                alt={lang === "hi" ? "अरहर दाल तड़का" : "Arhar Dal Tadka"}
                fill
                sizes="(max-width: 900px) 85vw, 48vw"
              />
            </div>
            <div className="about-story__visual-small">
              <Image
                src={dishImage("thekua") as string}
                alt={lang === "hi" ? "ठेकुआ" : "Thekua"}
                fill
                sizes="(max-width: 900px) 45vw, 22vw"
              />
            </div>
          </Reveal>

          <Reveal className="about-story__copy">
            <span className="eyebrow">{t("about.beganEyebrow")}</span>
            <h2>{t("about.beganTitle")}</h2>
            <p>{t("about.beganP1")}</p>
            <p>{t("about.beganP2")}</p>
            <p>{t("about.beganP3")}</p>
            <Link href="/menu" className="btn-primary inline-flex px-6 py-3">
              {t("about.tasteCta")} <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="about-stats">
        <div className="about-stats__grid container-bb">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} className="about-stat" delay={index * 0.06}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="about-regions">
        <div className="container-bb">
          <SectionHeading
            align="left"
            eyebrow={t("about.regionsEyebrow")}
            title={
              <>
                {t("about.regionsTitleA")} {t("about.regionsTitleHighlight")}
              </>
            }
            subtitle={t("about.regionsSubtitle")}
          />

          <div className="about-region-list">
            {regions.map((region, index) => (
              <Reveal key={region.region} className="about-region" delay={index * 0.055}>
                <div className="about-region__image">
                  <Image
                    src={dishImage(REGION_IMAGES[index]) as string}
                    alt={region.dish}
                    fill
                    sizes="110px"
                  />
                </div>
                <div>
                  <h3>{region.region}</h3>
                  <strong>{region.dish}</strong>
                  <p>{region.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container-bb">
          <SectionHeading
            align="left"
            eyebrow={t("about.valuesEyebrow")}
            title={
              <>
                {t("about.valuesTitleA")} {t("about.valuesTitleHighlight")}
              </>
            }
          />
          <div className="about-values__grid">
            {values.map((value, index) => (
              <Reveal key={value.title} className="about-value" delay={index * 0.08}>
                <span className="about-value__number">0{index + 1}</span>
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
