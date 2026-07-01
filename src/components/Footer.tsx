"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react";
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
    <footer className="relative mt-24 overflow-hidden bg-masala-950 text-cream-100">
      <div className="absolute inset-0 opacity-[0.06] grain" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-saffron-500/60 to-transparent" />

      <div className="container-bb relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-cream-50">
                <Image
                  src="/biharibhojanlogo-nosub.png"
                  alt="BihariBhojan"
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="leading-none">
                <span className="block font-display text-xl font-extrabold">
                  Bihari<span className="text-saffron-400">Bhojan</span>
                </span>
                <span className="font-hindi text-[13px] text-cream-100/60">
                  बिहारी भोजन
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream-100/65">
              {t("footer.blurb")}
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-10 w-10 place-items-center rounded-full border border-cream-100/15 text-cream-100/70 transition-colors hover:border-saffron-400 hover:bg-saffron-400 hover:text-masala-900"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-base font-bold text-cream-50">
              {t("footer.explore")}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {exploreLinks.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream-100/65 transition-colors hover:text-saffron-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-bold text-cream-50">
              {t("footer.company")}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream-100/65 transition-colors hover:text-saffron-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-base font-bold text-cream-50">
              {t("footer.getInTouch")}
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-cream-100/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron-400" />
                {BRAND.addressLine[lang]}
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-saffron-400" />
                {BRAND.phone}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-saffron-400" />
                {BRAND.email}
              </li>
            </ul>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-leaf-500/15 px-3 py-1.5 text-xs font-semibold text-leaf-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-leaf-400" />
              {t("footer.openNow")}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream-100/10 pt-6 text-sm text-cream-100/50 sm:flex-row">
          <p>© {new Date().getFullYear()} BihariBhojan. {t("footer.madeWith")}</p>
          <p className="flex items-center gap-4">
            <Link href="#" className="hover:text-saffron-400">
              {t("footer.privacy")}
            </Link>
            <Link href="#" className="hover:text-saffron-400">
              {t("footer.terms")}
            </Link>
            <span>biharibhojan.com</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
