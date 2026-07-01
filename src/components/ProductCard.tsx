"use client";

import { motion } from "framer-motion";
import { Award, Clock, Flame, Minus, Plus, Star, Users } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { cn, formatINR, tintFor } from "@/lib/utils";
import type { ProductDTO } from "@/lib/types";

function SpiceMeter({ level }: { level: number }) {
  if (level <= 0) return null;
  return (
    <span className="flex items-center gap-0.5" title={`Spice level ${level}/3`}>
      {Array.from({ length: 3 }).map((_, i) => (
        <Flame
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < level ? "text-chili-500" : "text-masala-200",
          )}
          fill={i < level ? "currentColor" : "none"}
        />
      ))}
    </span>
  );
}

export default function ProductCard({
  item,
  index = 0,
}: {
  item: ProductDTO;
  index?: number;
}) {
  const { addItem, setQty, qtyOf } = useCart();
  const { t, lang } = useLanguage();
  const qty = qtyOf(item.slug);
  const name = lang === "hi" && item.nameHi ? item.nameHi : item.name;
  const description =
    lang === "hi" && item.descriptionHi ? item.descriptionHi : item.description;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.24) }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-masala-100/80 bg-cream-50 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-saffron-200 hover:shadow-warm"
    >
      {/* Art zone — fixed aspect ratio, image-ready. Swap the plate for a photo later. */}
      <div
        className={cn(
          "relative aspect-[5/4] overflow-hidden bg-gradient-to-br",
          tintFor(item.categorySlug),
        )}
      >
        {/* soft radial highlight */}
        <div className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full bg-white/40 blur-2xl" />
        {/* emoji on a floating plate (placeholder for the real dish photo) */}
        <div className="absolute inset-0 grid place-items-center">
          <motion.div
            className="grid h-[4.6rem] w-[4.6rem] place-items-center rounded-full bg-cream-50 text-[2.4rem] shadow-[0_10px_28px_-8px_rgba(36,25,16,0.35)] ring-1 ring-black/[0.04] sm:h-20 sm:w-20 sm:text-[2.75rem]"
            whileHover={{ scale: 1.08, y: -2 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
          >
            <span aria-hidden>{item.image}</span>
          </motion.div>
        </div>

        {/* Top badges */}
        <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1.5">
          {item.isSignature && (
            <span className="badge bg-masala-900/90 text-saffron-300 shadow-sm backdrop-blur">
              <Award className="h-3 w-3" /> {t("product.signature")}
            </span>
          )}
          {item.isBestseller && (
            <span className="badge bg-cream-50/95 text-chili-700 shadow-sm backdrop-blur">
              ★ {t("product.bestseller")}
            </span>
          )}
        </div>

        {/* Veg / non-veg mark */}
        <span className="absolute right-2.5 top-2.5 grid h-6 w-6 place-items-center rounded-md bg-white/95 shadow-sm ring-1 ring-black/[0.03]">
          <span className={cn("diet-mark", item.isVeg ? "diet-veg" : "diet-nonveg")} />
        </span>

        {item.region && (
          <span className="absolute bottom-2.5 left-2.5 rounded-full bg-masala-900/45 px-2.5 py-1 text-[11px] font-semibold text-cream-50 backdrop-blur">
            📍 {item.region}
          </span>
        )}
      </div>


      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-bold leading-tight text-masala-900">
            {name}
          </h3>
          <SpiceMeter level={item.spiceLevel} />
        </div>

        <div className="mb-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-masala-500">
          <span className="flex items-center gap-1 rounded-full bg-leaf-100 px-2 py-0.5 text-leaf-700">
            <Star className="h-3 w-3 fill-current" /> {item.rating.toFixed(1)}
            <span className="text-leaf-600/70">({item.reviews})</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {item.prepTime}m
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {t("product.serves")} {item.serves}
          </span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-masala-500">
          {description}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-masala-900">
              {formatINR(item.price)}
            </span>
            {item.oldPrice ? (
              <span className="text-sm font-medium text-masala-400 line-through">
                {formatINR(item.oldPrice)}
              </span>
            ) : null}
          </div>

          {qty === 0 ? (
            <button
              onClick={() =>
                addItem({
                  slug: item.slug,
                  name: name,
                  price: item.price,
                  image: item.image,
                  isVeg: item.isVeg,
                })
              }
              className="btn-primary h-10 px-5 text-sm"
            >
              <Plus className="h-4 w-4" /> {t("product.add")}
            </button>
          ) : (
            <div className="flex items-center gap-1 rounded-full bg-chili-600 p-1 text-white shadow-warm">
              <button
                onClick={() => setQty(item.slug, qty - 1)}
                aria-label="Decrease quantity"
                className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-chili-700"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-6 text-center text-sm font-bold tabular-nums">{qty}</span>
              <button
                onClick={() => setQty(item.slug, qty + 1)}
                aria-label="Increase quantity"
                className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-chili-700"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
