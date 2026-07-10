"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { dishImage } from "@/data/dishImages";

export default function MenuHeader({
  dishCount,
  categoryCount,
}: {
  dishCount: number;
  categoryCount: number;
}) {
  const { t } = useLanguage();
  return (
    <section className="menu-hero">
      <div className="menu-hero__copy">
        <span className="eyebrow">{t("menu.eyebrow")}</span>
        <h1>
          {t("menu.titleA")} {t("menu.titleHighlight")}
        </h1>
        <p>
          {dishCount} {t("menu.subtitleA")} {categoryCount} {t("menu.subtitleB")}
        </p>
      </div>
      <div className="menu-hero__image">
        <Image
          src={dishImage("ghar-ki-thali") as string}
          alt="Ghar ki Thali"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 48vw"
        />
        <span className="menu-hero__count">{dishCount} / {categoryCount}</span>
      </div>
    </section>
  );
}
