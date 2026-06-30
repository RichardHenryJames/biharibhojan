"use client";

import { motion } from "framer-motion";
import { Award, Clock, Flame, Minus, Plus, Star, Users } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn, formatINR, gradientFor } from "@/lib/utils";
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
  const qty = qtyOf(item.slug);

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3) }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-masala-100 bg-cream-50 shadow-card transition-shadow hover:shadow-warm"
    >
      {/* Art */}
      <div
        className={cn(
          "relative h-44 overflow-hidden bg-gradient-to-br",
          gradientFor(item.categorySlug),
        )}
      >
        <div className="absolute inset-0 opacity-30 grain mix-blend-overlay" />
        <motion.div
          className="absolute inset-0 grid place-items-center text-[5.5rem] drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)]"
          whileHover={{ scale: 1.12, rotate: -4 }}
          transition={{ type: "spring", stiffness: 240, damping: 14 }}
        >
          <span aria-hidden>{item.image}</span>
        </motion.div>

        {/* Top badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {item.isSignature && (
            <span className="badge bg-masala-900/90 text-saffron-300 backdrop-blur">
              <Award className="h-3 w-3" /> Signature
            </span>
          )}
          {item.isBestseller && (
            <span className="badge bg-cream-50/95 text-chili-700 backdrop-blur">
              ★ Bestseller
            </span>
          )}
        </div>

        {/* Veg mark */}
        <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-md bg-white/95 shadow-sm">
          <span className={cn("diet-mark", item.isVeg ? "diet-veg" : "diet-nonveg")} />
        </span>

        {item.region && (
          <span className="absolute bottom-3 left-3 rounded-full bg-black/35 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
            📍 {item.region}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-bold leading-tight text-masala-900">
            {item.name}
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
            <Users className="h-3.5 w-3.5" /> Serves {item.serves}
          </span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-masala-500">
          {item.description}
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
                  name: item.name,
                  price: item.price,
                  image: item.image,
                  isVeg: item.isVeg,
                })
              }
              className="btn-primary h-10 px-5 text-sm"
            >
              <Plus className="h-4 w-4" /> Add
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
