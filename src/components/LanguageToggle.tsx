"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { LANGUAGES } from "@/data/i18n";
import { cn } from "@/lib/utils";

/** Segmented EN | हिं pill toggle — sliding highlight, like big-app language switchers. */
export default function LanguageToggle({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={cn(
        "relative inline-flex items-center rounded-full border border-masala-200 bg-cream-50 p-0.5",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {LANGUAGES.map((l) => {
        const active = lang === l.code;
        return (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            className={cn(
              "relative rounded-full font-bold transition-colors",
              size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
              active ? "text-cream-50" : "text-masala-500 hover:text-masala-800",
            )}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-chili-600"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className={cn("relative z-10", l.code === "hi" && "font-hindi-sans")}>
              {l.short}
            </span>
          </button>
        );
      })}
    </div>
  );
}
