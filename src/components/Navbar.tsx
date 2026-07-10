"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    if (mobileOpen) window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="site-utility">
        <div className="site-utility__inner container-bb">
          <span className="site-utility__offer">
            {t("nav.freeDelivery")} <strong>₹399</strong>
          </span>
          <span className="site-utility__contact">
            <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`}>{BRAND.phone}</a>
            <span>{BRAND.city[lang]}</span>
          </span>
        </div>
      </div>

      <header
        className={cn(
          "site-header",
          scrolled && "is-scrolled",
        )}
      >
        <nav className="site-nav container-bb" aria-label="Primary navigation">
          <Link href="/" className="site-brand">
            <Image
              src="/biharibhojanlogo-nosub.png"
              alt="BihariBhojan"
              width={57}
              height={57}
              loading="eager"
              className="site-brand__mark"
            />
            <span>
              <span className="site-brand__name">
                Bihari<em>Bhojan</em>
              </span>
              <span className="site-brand__hindi">घर जैसा स्वाद, बिहारी अंदाज़</span>
            </span>
          </Link>

          <ul className="site-links">
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn("site-link", active && "is-active")}
                    aria-current={active ? "page" : undefined}
                  >
                    {t(l.key)}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="site-actions">
            <LanguageToggle />

            <Link href="/menu" className="site-order-link">
              {t("nav.orderNow")}
            </Link>

            <button
              onClick={openCart}
              aria-label={t("nav.openCart")}
              className="site-cart"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>{t("cart.title")}</span>
              <AnimatePresence>
                {hydrated && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="site-cart__count"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="site-menu-trigger"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              <span>{mobileOpen ? "Close" : "Menu"}</span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="mobile-menu__links">
              <ul>
                {LINKS.map((l, index) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="mobile-menu__link"
                      aria-current={pathname === l.href ? "page" : undefined}
                    >
                      <span>0{index + 1}</span>
                      <span>{t(l.key)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mobile-menu__foot">
                <LanguageToggle />
                <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`}>{BRAND.phone}</a>
              </div>
            </div>
            <div className="mobile-menu__image">
              <Image
                src="/dishes/bihari-chicken-curry.webp"
                alt="Bihari chicken curry"
                fill
                sizes="45vw"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
