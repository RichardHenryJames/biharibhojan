"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { cn, formatINR } from "@/lib/utils";
import { dishImage } from "@/data/dishImages";
import type { ProductDTO } from "@/lib/types";

function SpiceMeter({ level }: { level: number }) {
  if (level <= 0) return null;
  return (
    <span className="dish-spice" title={`Spice level ${level}/3`} aria-label={`Spice level ${level} of 3`}>
      {Array.from({ length: 3 }).map((_, i) => (
        <i key={i} className={i < level ? "is-hot" : undefined} />
      ))}
    </span>
  );
}

export default function ProductCard({
  item,
  index = 0,
  variant = "menu",
}: {
  item: ProductDTO;
  index?: number;
  variant?: "feature" | "menu";
}) {
  const { addItem, setQty, qtyOf } = useCart();
  const { t, lang } = useLanguage();
  const qty = qtyOf(item.slug);
  const name = lang === "hi" && item.nameHi ? item.nameHi : item.name;
  const description =
    lang === "hi" && item.descriptionHi ? item.descriptionHi : item.description;
  const photo = dishImage(item.slug);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18, clipPath: "inset(0 0 10% 0)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.72, delay: Math.min(index * 0.045, 0.28), ease: [0.16, 1, 0.3, 1] }}
      className={cn("dish-card", `dish-card--${variant}`)}
    >
      <div className="dish-card__image">
        {photo ? (
          <Image
            src={photo}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-5xl" aria-hidden>
            {item.image}
          </span>
        )}

        {(item.isSignature || item.isBestseller) && (
          <span className="dish-card__badge">
            {item.isSignature ? t("product.signature") : t("product.bestseller")}
          </span>
        )}

        <span className="dish-card__diet">
          <span className={cn("diet-mark", item.isVeg ? "diet-veg" : "diet-nonveg")} />
        </span>

        {item.region && (
          <span className="dish-card__region">
            {item.region}
          </span>
        )}
      </div>

      <div className="dish-card__body">
        <div className="dish-card__title-row">
          <div>
            <h3 className="dish-card__title">{name}</h3>
            <SpiceMeter level={item.spiceLevel} />
          </div>
          <div className="dish-card__price">
            {item.oldPrice ? <del>{formatINR(item.oldPrice)}</del> : null}
            {formatINR(item.price)}
          </div>
        </div>

        <div className="dish-card__meta">
          <span className="dish-card__rating">★ {item.rating.toFixed(1)} · {item.reviews}</span>
          <span>{item.prepTime} min</span>
          <span>{t("product.serves")} {item.serves}</span>
        </div>

        <p className="dish-card__description">{description}</p>

        <div className="dish-card__action">
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
              className="dish-add"
            >
              {t("product.add")} <Plus className="h-3.5 w-3.5" />
            </button>
          ) : (
            <div className="dish-qty">
              <button
                onClick={() => setQty(item.slug, qty - 1)}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span>{qty}</span>
              <button
                onClick={() => setQty(item.slug, qty + 1)}
                aria-label="Increase quantity"
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
