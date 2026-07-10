"use client";

import Link from "next/link";
import {
  ArrowRight,
  Flame,
  Leaf,
  Clock,
  ShieldCheck,
  Search,
  ChefHat,
  Bike,
  Quote,
} from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/context/LanguageContext";
import { gradientFor } from "@/lib/utils";
import type { ProductDTO, CategoryDTO } from "@/lib/types";

const FEATURE_ICONS = [Flame, Leaf, Clock, ShieldCheck];
const STEP_ICONS = [Search, ChefHat, Bike];
const TESTIMONIAL_EMOJI = ["😋", "🤤", "🥰"];

type TextItem = { title: string; body: string };
type Testimonial = { quote: string; name: string; place: string };

export default function HomeSections({
  bestsellers,
  categories,
}: {
  bestsellers: ProductDTO[];
  categories: CategoryDTO[];
}) {
  const { t, tRaw, lang } = useLanguage();

  const features = tRaw<TextItem[]>("features.items") ?? [];
  const steps = tRaw<TextItem[]>("steps.items") ?? [];
  const testimonials = tRaw<Testimonial[]>("testimonials.items") ?? [];

  const catName = (c: CategoryDTO) => (lang === "hi" && c.nameHi ? c.nameHi : c.name);
  const catTagline = (c: CategoryDTO) =>
    lang === "hi" && c.taglineHi ? c.taglineHi : c.tagline;

  return (
    <>
      {/* Categories */}
      <section className="container-bb py-20">
        <SectionHeading
          eyebrow={t("categories.eyebrow")}
          title={
            <>
              {t("categories.titleA")}{" "}
              <span className="text-gradient">{t("categories.titleHighlight")}</span>
            </>
          }
          subtitle={t("categories.subtitle")}
        />

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.05}>
              <Link
                href={`/menu?c=${c.slug}`}
                className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br p-6 text-white shadow-card transition-transform hover:-translate-y-1 ${gradientFor(
                  c.slug,
                )}`}
              >
                <div className="absolute inset-0 opacity-20 grain mix-blend-overlay" />
                <div className="absolute -right-4 -top-4 text-7xl opacity-30 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                  {c.emoji}
                </div>
                <div className="relative">
                  <span className="text-4xl">{c.emoji}</span>
                  <h3 className="mt-3 font-display text-xl font-bold leading-tight">
                    {catName(c)}
                  </h3>
                  <p className="mt-1 text-sm text-white/80">{catTagline(c)}</p>
                </div>
                <div className="relative mt-6 flex items-center justify-between">
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
                    {c.count} {t("categories.dishes")}
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 transition-colors group-hover:bg-white group-hover:text-masala-900">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="relative bg-cream-200/50 py-20">
        <div className="container-bb">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              align="left"
              eyebrow={t("bestsellers.eyebrow")}
              title={
                <>
                  {t("bestsellers.titleA")}{" "}
                  <span className="text-gradient">
                    {t("bestsellers.titleHighlight")}
                  </span>
                </>
              }
            />
            <Link
              href="/menu"
              className="group flex items-center gap-2 text-sm font-bold text-chili-700"
            >
              {t("bestsellers.viewFull")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bestsellers.map((item, i) => (
              <ProductCard key={item.slug} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="container-bb py-20">
        <SectionHeading
          eyebrow={t("features.eyebrow")}
          title={
            <>
              {t("features.titleA")}{" "}
              <span className="text-gradient">{t("features.titleHighlight")}</span>
            </>
          }
          subtitle={t("features.subtitle")}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
            return (
              <Reveal key={f.title} delay={i * 0.07}>
                <div className="card-surface h-full p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-saffron-400 to-chili-600 text-white shadow-warm">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-masala-500">{f.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="relative overflow-hidden bg-masala-950 py-20 text-cream-100">
        <div className="absolute inset-0 opacity-[0.06] grain" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-saffron-500/20 blur-3xl" />
        <div className="container-bb relative">
          <SectionHeading
            eyebrow={t("steps.eyebrow")}
            title={
              <span className="text-cream-50">
                {t("steps.titleA")}{" "}
                <span className="text-saffron-400">{t("steps.titleHighlight")}</span>
              </span>
            }
            subtitle={<span className="text-cream-100/70">{t("steps.subtitle")}</span>}
          />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => {
              const Icon = STEP_ICONS[i % STEP_ICONS.length];
              return (
                <Reveal key={s.title} delay={i * 0.1}>
                  <div className="relative text-center">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-display text-7xl font-black text-cream-100/5">
                      {i + 1}
                    </span>
                    <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-saffron-400 to-chili-600 text-white shadow-warm">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="relative mt-5 font-display text-xl font-bold text-cream-50">
                      {s.title}
                    </h3>
                    <p className="relative mx-auto mt-2 max-w-xs text-sm leading-relaxed text-cream-100/65">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-bb py-20">
        <SectionHeading
          eyebrow={t("testimonials.eyebrow")}
          title={
            <>
              {t("testimonials.titleA")}{" "}
              <span className="text-gradient">
                {t("testimonials.titleHighlight")}
              </span>
            </>
          }
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((tm, i) => (
            <Reveal key={tm.name} delay={i * 0.08}>
              <figure className="card-surface flex h-full flex-col p-7">
                <Quote className="h-8 w-8 text-saffron-400" />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-masala-700">
                  “{tm.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-masala-100 pt-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-saffron-200 text-xl">
                    {TESTIMONIAL_EMOJI[i % TESTIMONIAL_EMOJI.length]}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-masala-900">
                      {tm.name}
                    </span>
                    <span className="block text-xs text-masala-500">{tm.place}</span>
                  </span>
                  <span className="ml-auto text-saffron-500">★★★★★</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-bb pb-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-chili-600 via-chili-700 to-masala-900 px-8 py-14 text-center text-cream-50 shadow-warm sm:px-16 sm:py-20">
            <div className="absolute inset-0 opacity-10 grain" />
            <div className="pointer-events-none absolute -left-10 -top-10 text-9xl opacity-15">
              🍲
            </div>
            <div className="pointer-events-none absolute -bottom-12 -right-6 text-9xl opacity-15">
              🍚
            </div>
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-extrabold sm:text-5xl">
                {t("cta.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-md text-cream-100/80">
                {t("cta.subtitle")}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/menu" className="btn-saffron h-12 px-8 text-base">
                  {t("cta.orderNow")} <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/about"
                  className="btn h-12 border border-cream-100/30 px-7 text-base text-cream-50 hover:bg-cream-100/10"
                >
                  {t("cta.readStory")}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
