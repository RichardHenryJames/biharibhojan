"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function MenuHeader({
  dishCount,
  categoryCount,
}: {
  dishCount: number;
  categoryCount: number;
}) {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden border-b border-masala-100 bg-cream-200/40">
      <div className="pointer-events-none absolute -right-10 -top-10 text-[10rem] opacity-10">
        🍲
      </div>
      <div className="container-bb relative py-12 lg:py-16">
        <span className="eyebrow mb-3">
          <span className="h-px w-6 bg-chili-500" /> {t("menu.eyebrow")}
        </span>
        <h1 className="section-title max-w-2xl">
          {t("menu.titleA")} <span className="text-gradient">{t("menu.titleHighlight")}</span>
        </h1>
        <p className="mt-3 max-w-xl text-masala-600">
          {dishCount} {t("menu.subtitleA")} {categoryCount} {t("menu.subtitleB")}
        </p>
      </div>
    </section>
  );
}
