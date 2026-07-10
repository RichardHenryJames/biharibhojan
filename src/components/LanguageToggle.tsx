"use client";

import { useLanguage } from "@/context/LanguageContext";
import { LANGUAGES } from "@/data/i18n";
import { cn } from "@/lib/utils";

/** Compact bilingual switch, styled like a printed language notation. */
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
        "language-switch",
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
              "transition-colors",
              size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
            )}
          >
            <span className={cn(l.code === "hi" && "font-hindi-sans")}>
              {l.short}
            </span>
          </button>
        );
      })}
    </div>
  );
}
