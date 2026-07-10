"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/context/LanguageContext";
import { BRAND } from "@/data/i18n";
import { dishImage } from "@/data/dishImages";
import type { ProductDTO, CategoryDTO } from "@/lib/types";

type TextItem = { title: string; body: string };
type Testimonial = { quote: string; name: string; place: string };

const GALLERY = [
  { slug: "bihari-chicken-curry", en: "Bihari Chicken Curry", hi: "बिहारी चिकन करी" },
  { slug: "aloo-bhujia", en: "Aloo Bhujia", hi: "आलू भुजिया" },
  { slug: "arhar-dal-tadka", en: "Arhar Dal Tadka", hi: "अरहर दाल तड़का" },
];

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
      <section className="home-section home-signatures">
        <div className="container-bb">
          <div className="home-signatures__top">
            <SectionHeading
              align="left"
              eyebrow={t("bestsellers.eyebrow")}
              title={
                <>
                  {t("bestsellers.titleA")} {t("bestsellers.titleHighlight")}
                </>
              }
            />
            <Link href="/menu" className="home-signatures__link">
              {t("bestsellers.viewFull")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="home-signatures__grid">
            {bestsellers.slice(0, 5).map((product, index) => (
              <ProductCard
                key={product.slug}
                item={product}
                index={index}
                variant="feature"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="home-story">
        <Reveal className="home-story__photos" y={0}>
          <div className="home-story__photo-main">
            <Image
              src={dishImage("aloo-bhujia") as string}
              alt={lang === "hi" ? "आलू भुजिया" : "Aloo Bhujia"}
              fill
              sizes="(max-width: 900px) 90vw, 58vw"
            />
          </div>
          <div className="home-story__photo-small">
            <Image
              src={dishImage("bihari-chicken-curry") as string}
              alt={lang === "hi" ? "बिहारी चिकन करी" : "Bihari Chicken Curry"}
              fill
              sizes="(max-width: 900px) 45vw, 26vw"
            />
          </div>
          <div className="home-story__caption">{t("about.cardTitle")}</div>
        </Reveal>

        <Reveal className="home-story__copy">
          <span className="eyebrow">{t("about.beganEyebrow")}</span>
          <h2>{t("about.beganTitle")}</h2>
          <p>{t("about.beganP1")}</p>
          <p>{t("about.beganP2")}</p>
          <Link href="/about" className="menu-section-link">
            {t("hero.ourStory")} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      <section className="home-section home-menu-ledger">
        <div className="home-menu-ledger__layout container-bb">
          <div className="home-menu-ledger__intro">
            <span className="eyebrow">{t("categories.eyebrow")}</span>
            <h2>
              {t("categories.titleA")} {t("categories.titleHighlight")}
            </h2>
            <p>{t("categories.subtitle")}</p>
          </div>

          <div className="home-menu-ledger__list">
            {categories.map((category, index) => (
              <Reveal key={category.slug} delay={index * 0.045} y={14}>
                <Link href={`/menu?c=${category.slug}`} className="category-ledger-item">
                  <span className="category-ledger-item__index">0{index + 1}</span>
                  <span>
                    <h3>{catName(category)}</h3>
                    <p>{catTagline(category)}</p>
                  </span>
                  <span className="category-ledger-item__count">
                    {category.count} {t("categories.dishes")}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-kitchen">
        <div className="container-bb">
          <div className="home-kitchen__header">
            <span className="eyebrow">{t("steps.eyebrow")}</span>
            <h2>
              {t("steps.titleA")} {t("steps.titleHighlight")}
            </h2>
          </div>

          <div className="home-kitchen__steps">
            {steps.map((step, index) => (
              <Reveal key={step.title} className="kitchen-step" delay={index * 0.1}>
                <span className="kitchen-step__number">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home-gallery" aria-label={t("features.eyebrow")}>
        <div className="home-gallery__grid">
          <Reveal className="gallery-tile" y={0}>
            <Image
              src={dishImage(GALLERY[0].slug) as string}
              alt={lang === "hi" ? GALLERY[0].hi : GALLERY[0].en}
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
            />
            <span className="gallery-tile__label">
              {lang === "hi" ? GALLERY[0].hi : GALLERY[0].en}
            </span>
          </Reveal>
          <Reveal className="gallery-tile" y={0} delay={0.08}>
            <Image
              src={dishImage(GALLERY[1].slug) as string}
              alt={lang === "hi" ? GALLERY[1].hi : GALLERY[1].en}
              fill
              sizes="(max-width: 900px) 50vw, 24vw"
            />
            <span className="gallery-tile__label">
              {lang === "hi" ? GALLERY[1].hi : GALLERY[1].en}
            </span>
          </Reveal>
          <Reveal className="gallery-tile gallery-tile--text" y={0} delay={0.14}>
            <h2>
              {t("features.titleA")} {t("features.titleHighlight")}
            </h2>
            <p>{t("features.subtitle")}</p>
          </Reveal>
          <Reveal className="gallery-tile" y={0} delay={0.1}>
            <Image
              src={dishImage(GALLERY[2].slug) as string}
              alt={lang === "hi" ? GALLERY[2].hi : GALLERY[2].en}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <span className="gallery-tile__label">
              {lang === "hi" ? GALLERY[2].hi : GALLERY[2].en}
            </span>
          </Reveal>
        </div>
      </section>

      <section className="home-section home-values">
        <div className="container-bb">
          <div className="home-values__grid">
            {features.map((feature, index) => (
              <Reveal key={feature.title} className="home-value" delay={index * 0.06}>
                <span className="home-value__number">0{index + 1}</span>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-reviews">
        <div className="home-reviews__layout container-bb">
          <div className="home-reviews__title">
            <span className="eyebrow">{t("testimonials.eyebrow")}</span>
            <h2>
              {t("testimonials.titleA")} {t("testimonials.titleHighlight")}
            </h2>
          </div>

          <div className="review-ledger">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} y={14} delay={index * 0.07}>
                <figure className="review-entry">
                  <blockquote>{testimonial.quote}</blockquote>
                  <figcaption>
                    <strong>{testimonial.name}</strong>
                    {testimonial.place}
                    <span className="review-entry__stars" aria-label="5 out of 5 stars">
                      ★★★★★
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home-closing">
        <div className="home-closing__order">
          <span className="eyebrow">{t("cta.title")}</span>
          <h2>{t("cta.title")}</h2>
          <p>{t("cta.subtitle")}</p>
          <div className="home-closing__actions">
            <Link href="/menu" className="btn-saffron px-7 py-4">
              {t("cta.orderNow")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/about" className="btn-ghost home-hero__secondary px-7 py-4">
              {t("cta.readStory")}
            </Link>
          </div>
        </div>

        <div className="home-closing__location">
          <span className="eyebrow">{BRAND.city[lang]}</span>
          <h3>{t("about.cardTitle")}</h3>
          <div className="home-closing__details">
            <span>{BRAND.addressLine[lang]}</span>
            <span>{BRAND.hours[lang]}</span>
            <span>{BRAND.phone}</span>
          </div>
        </div>
      </section>
    </>
  );
}
