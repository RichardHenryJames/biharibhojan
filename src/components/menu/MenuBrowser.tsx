"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X, Leaf, ArrowUpDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import type { ProductDTO, CategoryDTO } from "@/lib/types";

type SortKey = "recommended" | "price-asc" | "price-desc" | "rating";

export default function MenuBrowser({
  products,
  categories,
}: {
  products: ProductDTO[];
  categories: CategoryDTO[];
}) {
  const params = useSearchParams();
  const { t, lang } = useLanguage();
  const [activeCat, setActiveCat] = useState<string>(params.get("c") || "all");
  const [query, setQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("recommended");

  const SORTS: { key: SortKey; label: string }[] = [
    { key: "recommended", label: t("menu.sortRecommended") },
    { key: "rating", label: t("menu.sortRating") },
    { key: "price-asc", label: t("menu.sortPriceLow") },
    { key: "price-desc", label: t("menu.sortPriceHigh") },
  ];

  const catName = (c: CategoryDTO) => (lang === "hi" && c.nameHi ? c.nameHi : c.name);
  const catTagline = (c: CategoryDTO) =>
    lang === "hi" && c.taglineHi ? c.taglineHi : c.tagline;

  // Keep the URL shareable without triggering a navigation/scroll.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (activeCat === "all") url.searchParams.delete("c");
    else url.searchParams.set("c", activeCat);
    window.history.replaceState(null, "", url.toString());
  }, [activeCat]);

  const q = query.trim().toLowerCase();

  const sorter = useMemo(() => {
    return (a: ProductDTO, b: ProductDTO) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    };
  }, [sort]);

  const matches = (p: ProductDTO) => {
    if (vegOnly && !p.isVeg) return false;
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      (p.nameHi?.includes(query.trim()) ?? false) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      (p.region?.toLowerCase().includes(q) ?? false)
    );
  };

  const visibleCats = categories.filter(
    (c) => activeCat === "all" || c.slug === activeCat,
  );

  const grouped = visibleCats
    .map((cat) => ({
      cat,
      items: products.filter((p) => p.categorySlug === cat.slug && matches(p)).sort(sorter),
    }))
    .filter((g) => g.items.length > 0);

  const total = grouped.reduce((s, g) => s + g.items.length, 0);

  return (
    <div className="menu-browser">
      <div className="menu-tools">
        <div className="menu-tools__inner container-bb">
          <div className="menu-tools__top">
            <div className="menu-search">
              <Search aria-hidden />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("menu.searchPlaceholder")}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => setVegOnly((v) => !v)}
              className={cn(
                "menu-control",
                vegOnly && "is-active",
              )}
            >
              <Leaf className="h-4 w-4" />
              {t("menu.vegOnly")}
            </button>

            <div className="menu-sort">
              <ArrowUpDown aria-hidden />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                aria-label="Sort menu"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="menu-categories">
            <Pill
              active={activeCat === "all"}
              onClick={() => setActiveCat("all")}
              label={t("menu.all")}
            />
            {categories.map((c) => (
              <Pill
                key={c.slug}
                active={activeCat === c.slug}
                onClick={() => setActiveCat(c.slug)}
                label={catName(c)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container-bb">
        <p className="menu-results-count">
          {total} {total === 1 ? t("menu.dish") : t("menu.dishes")}
          {activeCat !== "all" && (
            <>
              {" "}{t("menu.in")}{" "}
              <strong>
                {(() => {
                  const c = categories.find((x) => x.slug === activeCat);
                  return c ? catName(c) : "";
                })()}
              </strong>
            </>
          )}
        </p>

        {grouped.length === 0 ? (
          <div className="menu-empty">
            <span aria-hidden>00</span>
            <h2>{t("menu.noResults")}</h2>
            <p>{t("menu.noResultsHint")}</p>
            <button
              onClick={() => {
                setQuery("");
                setVegOnly(false);
                setActiveCat("all");
              }}
              className="btn-ghost mt-6 px-6 py-3"
            >
              {t("menu.resetFilters")}
            </button>
          </div>
        ) : (
          <div className="menu-groups">
            {grouped.map(({ cat, items }, groupIndex) => (
              <section key={cat.slug} id={cat.slug} className="menu-group">
                <div className="menu-group__heading">
                  <span className="menu-group__index">0{groupIndex + 1}</span>
                  <h2>{catName(cat)}</h2>
                  <p>{catTagline(cat)}</p>
                </div>
                <div className="menu-group__items">
                  {items.map((item, i) => (
                    <ProductCard key={item.slug} item={item} index={i} variant="menu" />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Pill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "menu-category-tab",
        active && "is-active",
      )}
    >
      {label}
    </button>
  );
}
