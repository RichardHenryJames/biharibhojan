"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { BRAND } from "@/data/i18n";

export default function Footer() {
  const { t, lang } = useLanguage();

  const exploreLinks = [
    { label: t("footer.fullMenu"), href: "/menu" },
    { label: lang === "hi" ? "सूखी सब्ज़ी" : "Dry Sabzi", href: "/menu?c=dry-sabzi" },
    { label: lang === "hi" ? "तरी वाली सब्ज़ी" : "Gravy Sabzi", href: "/menu?c=gravy-sabzi" },
    { label: lang === "hi" ? "दाल" : "Dal", href: "/menu?c=dal" },
    { label: lang === "hi" ? "चावल और रोटी" : "Rice & Roti", href: "/menu?c=rice-roti" },
  ];

  const companyLinks = [
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.contact"), href: "/contact" },
    { label: t("footer.bulk"), href: "/contact" },
    { label: t("footer.track"), href: "/contact" },
  ];

  return (
    <footer className="site-footer">
      <div className="site-footer__hindi" aria-hidden>बिहारी भोजन</div>
      <div className="site-footer__top container-bb">
        <div className="site-footer__brand">
          <h2>Bihari <em>Bhojan.</em></h2>
          <p>
              {t("footer.blurb")}
          </p>
          <Link href="/menu" className="site-footer__order btn-saffron">
            {t("nav.orderNow")}
          </Link>
          <div className="site-footer__social">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://x.com/" target="_blank" rel="noopener noreferrer">X / Twitter</a>
          </div>
        </div>

        <div className="site-footer__columns">
          <div className="site-footer__column">
            <h3>{t("footer.explore")}</h3>
            <ul>
              {exploreLinks.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__column">
            <h3>{t("footer.company")}</h3>
            <ul>
              {companyLinks.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__column">
            <h3>{t("footer.getInTouch")}</h3>
            <ul>
              <li><span>{BRAND.addressLine[lang]}</span></li>
              <li><a href={`tel:${BRAND.phone.replace(/\s/g, "")}`}>{BRAND.phone}</a></li>
              <li><a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></li>
              <li><span>{BRAND.hours[lang]}</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom container-bb">
        <p>© {new Date().getFullYear()} BihariBhojan. {t("footer.madeWith")}</p>
          <p className="site-footer__bottom-links">
            <Link href="/privacy" className="hover:text-saffron-400">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="hover:text-saffron-400">
              {t("footer.terms")}
            </Link>
            <span>biharibhojan.com</span>
          </p>
      </div>
    </footer>
  );
}
