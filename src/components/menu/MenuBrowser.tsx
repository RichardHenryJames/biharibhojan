"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, X, Leaf, ArrowUpDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";
import type { ProductDTO, CategoryDTO } from "@/lib/types";

type SortKey = "recommended" | "price-asc" | "price-desc" | "rating";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "recommended", label: "Recommended" },
  { key: "rating", label: "Top rated" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
];

export default function MenuBrowser({
  products,
  categories,
}: {
  products: ProductDTO[];
  categories: CategoryDTO[];
}) {
  const params = useSearchParams();
  const [activeCat, setActiveCat] = useState<string>(params.get("c") || "all");
  const [query, setQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("recommended");

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
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
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
    <div className="container-bb pb-20">
      {/* Sticky filter bar */}
      <div className="sticky top-[76px] z-30 -mx-5 mb-8 border-b border-masala-100 bg-cream-100/90 px-5 py-4 backdrop-blur-xl lg:-mx-8 lg:px-8">
        <div className="flex flex-col gap-3">
          {/* search + controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-masala-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search litti, mutton, thekua…"
                className="w-full rounded-full border border-masala-200 bg-cream-50 py-2.5 pl-11 pr-10 text-sm font-medium text-masala-800 outline-none transition focus:border-saffron-400 focus:ring-2 focus:ring-saffron-200"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-masala-400 hover:text-chili-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => setVegOnly((v) => !v)}
              className={cn(
                "btn h-11 gap-2 px-4 text-sm",
                vegOnly
                  ? "bg-leaf-500 text-white shadow-soft"
                  : "border border-masala-200 bg-cream-50 text-masala-700",
              )}
            >
              <Leaf className="h-4 w-4" />
              Veg only
            </button>

            <div className="relative">
              <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-masala-400" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-11 appearance-none rounded-full border border-masala-200 bg-cream-50 pl-9 pr-9 text-sm font-semibold text-masala-700 outline-none focus:border-saffron-400"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* category pills */}
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-0.5">
            <Pill
              active={activeCat === "all"}
              onClick={() => setActiveCat("all")}
              label="🍽️ All"
            />
            {categories.map((c) => (
              <Pill
                key={c.slug}
                active={activeCat === c.slug}
                onClick={() => setActiveCat(c.slug)}
                label={`${c.emoji} ${c.name}`}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="mb-6 text-sm font-medium text-masala-500">
        {total} {total === 1 ? "dish" : "dishes"}
        {activeCat !== "all" && (
          <>
            {" "}
            in{" "}
            <span className="font-bold text-masala-800">
              {categories.find((c) => c.slug === activeCat)?.name}
            </span>
          </>
        )}
      </p>

      {grouped.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-masala-200 bg-cream-50 py-20 text-center">
          <span className="text-5xl">🔍</span>
          <p className="font-display text-xl font-bold">No dishes found</p>
          <p className="max-w-sm text-sm text-masala-500">
            Try a different search or clear the filters to see the full menu.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setVegOnly(false);
              setActiveCat("all");
            }}
            className="btn-ghost mt-2"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="space-y-14">
          {grouped.map(({ cat, items }) => (
            <section key={cat.slug} id={cat.slug} className="scroll-mt-40">
              <div className="mb-6 flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cream-200 text-2xl">
                  {cat.emoji}
                </span>
                <div>
                  <h2 className="font-display text-2xl font-bold text-masala-900">
                    {cat.name}
                  </h2>
                  <p className="text-sm text-masala-500">{cat.tagline}</p>
                </div>
              </div>
              <motion.div
                layout
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {items.map((item, i) => (
                  <ProductCard key={item.slug} item={item} index={i} />
                ))}
              </motion.div>
            </section>
          ))}
        </div>
      )}
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
      className={cn(
        "chip shrink-0 whitespace-nowrap",
        active && "chip-active",
      )}
    >
      {label}
    </button>
  );
}
