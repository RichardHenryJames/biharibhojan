"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { translations, type Lang } from "@/data/i18n";

type TParams = Record<string, string | number>;

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  hydrated: boolean;
  /** Translate a dot-path key, e.g. t("nav.home"). Falls back to English, then the key. */
  t: (key: string, params?: TParams) => string;
  /** Resolve a raw value (object/array) from the dictionary, e.g. tRaw("features.items"). */
  tRaw: <T = unknown>(key: string) => T;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "biharibhojan_lang";

function resolve(dict: unknown, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>(
      (acc, part) =>
        acc && typeof acc === "object"
          ? (acc as Record<string, unknown>)[part]
          : undefined,
      dict,
    );
}

function interpolate(str: string, params?: TParams) {
  if (!params) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) =>
    params[k] != null ? String(params[k]) : `{${k}}`,
  );
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("hi");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === "en" || saved === "hi") setLangState(saved);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
  }, [lang, hydrated]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(
    () => setLangState((l) => (l === "en" ? "hi" : "en")),
    [],
  );

  const t = useCallback(
    (key: string, params?: TParams) => {
      const val = resolve(translations[lang], key) ?? resolve(translations.en, key);
      return typeof val === "string" ? interpolate(val, params) : key;
    },
    [lang],
  );

  const tRaw = useCallback(
    <T,>(key: string): T => {
      const val = resolve(translations[lang], key) ?? resolve(translations.en, key);
      return val as T;
    },
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLang, toggle, hydrated, t, tRaw }),
    [lang, setLang, toggle, hydrated, t, tRaw],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
