"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, Menu, ShoppingBag, X, MapPin, Phone } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { BRAND } from "@/data/i18n";
import LanguageToggle from "@/components/LanguageToggle";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", key: "nav.home" },
  { href: "/menu", key: "nav.menu" },
  { href: "/about", key: "nav.about" },
  { href: "/contact", key: "nav.contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { count, openCart, hydrated } = useCart();
  const { t, lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      {/* Announcement strip */}
      <div className="hidden bg-masala-900 text-cream-100 sm:block">
        <div className="container-bb flex h-9 items-center justify-between text-xs">
          <span className="flex items-center gap-2">
            <Flame className="h-3.5 w-3.5 text-saffron-400" />
            {t("nav.freeDelivery")} <strong className="text-saffron-300">₹399</strong>
          </span>
          <span className="flex items-center gap-4">
            <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-saffron-300">
              <Phone className="h-3.5 w-3.5" /> {BRAND.phone}
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-chili-400" /> {BRAND.city[lang]}
            </span>
          </span>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-masala-100 bg-cream-50/85 shadow-soft backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <nav className="container-bb flex h-[var(--header-h)] items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <Image
              src="/biharibhojanlogo-nosub.png"
              alt="BihariBhojan"
              width={48}
              height={48}
              priority
              className="h-12 w-12 object-contain transition-transform group-hover:scale-105"
            />
            <span className="leading-none">
              <span className="block font-display text-xl font-extrabold tracking-tight text-masala-900">
                Bihari<span className="text-chili-600">Bhojan</span>
              </span>
              <span className="font-hindi text-[13px] text-masala-500">बिहारी भोजन</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                      active
                        ? "text-chili-700"
                        : "text-masala-600 hover:text-masala-900",
                    )}
                  >
                    <span className="relative z-10">{t(l.key)}</span>
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-saffron-200/70"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <LanguageToggle className="hidden sm:inline-flex" />

            <Link href="/menu" className="btn-saffron hidden h-11 md:inline-flex">
              {t("nav.orderNow")}
            </Link>

            <button
              onClick={openCart}
              aria-label={t("nav.openCart")}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-masala-200 bg-cream-50 text-masala-800 transition-colors hover:border-saffron-400 hover:text-chili-600"
            >
              <ShoppingBag className="h-5 w-5" />
              <AnimatePresence>
                {hydrated && count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-chili-600 px-1 text-[11px] font-bold text-white"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-masala-200 bg-cream-50 text-masala-800 lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-masala-100 bg-cream-50/95 backdrop-blur-xl lg:hidden"
            >
              <ul className="container-bb flex flex-col gap-1 py-4">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-base font-semibold",
                        pathname === l.href
                          ? "bg-saffron-200/70 text-chili-700"
                          : "text-masala-700 hover:bg-cream-200",
                      )}
                    >
                      {t(l.key)}
                    </Link>
                  </li>
                ))}
                <li className="mt-2 flex items-center justify-between gap-3">
                  <Link href="/menu" className="btn-saffron flex-1">
                    {t("nav.orderNow")}
                  </Link>
                  <LanguageToggle />
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
