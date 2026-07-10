"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, Truck, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { cn, formatINR } from "@/lib/utils";
import { dishImage } from "@/data/dishImages";

const FREE_DELIVERY_THRESHOLD = 399;

export default function CartDrawer() {
  const { isOpen, closeCart, lines, setQty, removeItem, subtotal, count, clear } =
    useCart();
  const { t } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    if (isOpen) window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeCart]);

  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="cart-scrim"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="cart-drawer"
          >
            <div className="cart-head">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-4 w-4" />
                <h2>
                  {t("cart.title")}{" "}
                  <span>({count})</span>
                </h2>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="cart-close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="cart-empty">
                <span className="cart-empty__mark" aria-hidden>00</span>
                <h3>{t("cart.empty")}</h3>
                <p>{t("cart.emptyHint")}</p>
                <button onClick={closeCart} className="btn-primary mt-6 px-6 py-3">
                  {t("cart.browse")}
                </button>
              </div>
            ) : (
              <>
                <div className="cart-delivery">
                  <p>
                    <Truck className="h-4 w-4" />
                    {remaining > 0 ? (
                      <>
                        {t("cart.addMore")} <strong>{formatINR(remaining)}</strong>{" "}
                        {t("cart.forFreeDelivery")}
                      </>
                    ) : (
                      <span>
                        🎉 {t("cart.freeUnlocked")}
                      </span>
                    )}
                  </p>
                  <div className="cart-delivery__track">
                    <motion.div
                      className="cart-delivery__fill"
                      animate={{ width: `${progress}%` }}
                      transition={{ type: "spring", stiffness: 200, damping: 26 }}
                    />
                  </div>
                </div>

                <div className="cart-lines">
                  {lines.map((line) => (
                    <motion.div
                      key={line.slug}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      className="cart-line"
                    >
                      <div className="cart-line__image">
                        {dishImage(line.slug) ? (
                          <Image
                            src={dishImage(line.slug) as string}
                            alt={line.name}
                            width={64}
                            height={64}
                          />
                        ) : (
                          line.image
                        )}
                      </div>
                      <div>
                        <div className="cart-line__top">
                          <p className="cart-line__name">
                            <span
                              className={cn(
                                "diet-mark",
                                line.isVeg ? "diet-veg" : "diet-nonveg",
                              )}
                            />
                            {line.name}
                          </p>
                          <button
                            onClick={() => removeItem(line.slug)}
                            aria-label={`Remove ${line.name}`}
                            className="text-masala-400 transition-colors hover:text-chili-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="cart-line__bottom">
                          <div className="cart-line__qty">
                            <button
                              onClick={() => setQty(line.slug, line.qty - 1)}
                              aria-label="Decrease"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span>{line.qty}</span>
                            <button
                              onClick={() => setQty(line.slug, line.qty + 1)}
                              aria-label="Increase"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <strong className="text-sm">
                            {formatINR(line.price * line.qty)}
                          </strong>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  <button
                    onClick={clear}
                    className="cart-clear"
                  >
                    {t("cart.clear")}
                  </button>
                </div>

                <div className="cart-foot">
                  <div className="cart-foot__total">
                    <span>{t("cart.subtotal")}</span>
                    <strong>
                      {formatINR(subtotal)}
                    </strong>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="btn-primary w-full py-4"
                  >
                    {t("cart.checkout")}
                  </Link>
                  <p className="cart-foot__note">
                    {t("cart.taxesNote")}
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
