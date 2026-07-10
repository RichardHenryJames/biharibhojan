"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { dishImage } from "@/data/dishImages";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20, clipPath: "inset(0 0 16% 0)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const HERO_DISH = { slug: "ghar-ki-thali", en: "Ghar ki Thali", hi: "घर की थाली" };

export default function Hero() {
  const { t, lang } = useLanguage();
  return (
    <section className="home-hero">
      <motion.div
        className="home-hero__copy"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={item} className="home-hero__kicker">
          {t("hero.badge")}
        </motion.p>

        <motion.h1 variants={item}>
          {t("hero.headlineA")} <em>{t("hero.headlineHighlight")}</em>{" "}
          {t("hero.headlineB")}
        </motion.h1>

        <motion.p variants={item} className="home-hero__tagline">
          {t("hero.tagline")}
        </motion.p>
        <motion.p variants={item} className="home-hero__subtitle">
          {t("hero.subtitle")}
        </motion.p>

        <motion.div variants={item} className="home-hero__actions">
          <Link href="/menu" className="btn-saffron px-7 py-4">
            {t("hero.orderNow")} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/about" className="btn-ghost home-hero__secondary px-7 py-4">
            {t("hero.ourStory")}
          </Link>
        </motion.div>

        <motion.div variants={item} className="home-hero__notes">
          <div className="home-hero__note">
            <strong>4.9 / 5</strong>
            <span>5,000+ {t("hero.ratingLabel")}</span>
          </div>
          <div className="home-hero__note">
            <strong>30–45 min</strong>
            <span>{t("hero.avgDelivery")}</span>
          </div>
          <div className="home-hero__note">
            <strong>50+</strong>
            <span>{t("hero.dishesLabel")}</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="home-hero__visual"
        initial={{ opacity: 0, clipPath: "inset(0 0 0 100%)" }}
        animate={{ opacity: 1, clipPath: "inset(0 0 0 0%)" }}
        transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={dishImage(HERO_DISH.slug) as string}
          alt={lang === "hi" ? HERO_DISH.hi : HERO_DISH.en}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 56vw"
        />
        <div className="home-hero__dish-note">
          <strong>{lang === "hi" ? HERO_DISH.hi : HERO_DISH.en}</strong>
          <span>₹149 · {t("product.signature")}</span>
        </div>
        <span className="home-hero__side-label">Vishnupuri · Hazaribagh · Jharkhand</span>
      </motion.div>
    </section>
  );
}
