"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, Truck, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { cn, formatINR } from "@/lib/utils";

const FREE_DELIVERY_THRESHOLD = 399;

export default function CartDrawer() {
  const { isOpen, closeCart, lines, setQty, removeItem, subtotal, count, clear } =
    useCart();
  const { t } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
            className="fixed inset-0 z-[90] bg-masala-950/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-[100] flex h-full w-full max-w-md flex-col bg-cream-100 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-masala-100 bg-cream-50 px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-chili-600" />
                <h2 className="font-display text-lg font-bold">
                  {t("cart.title")}{" "}
                  <span className="text-masala-400">({count})</span>
                </h2>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="grid h-9 w-9 place-items-center rounded-full text-masala-500 hover:bg-cream-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <div className="grid h-24 w-24 place-items-center rounded-full bg-cream-200 text-5xl">
                  🍽️
                </div>
                <div>
                  <p className="font-display text-xl font-bold">{t("cart.empty")}</p>
                  <p className="mt-1 text-sm text-masala-500">
                    {t("cart.emptyHint")}
                  </p>
                </div>
                <button onClick={closeCart} className="btn-saffron">
                  {t("cart.browse")}
                </button>
              </div>
            ) : (
              <>
                {/* Free delivery progress */}
                <div className="border-b border-masala-100 bg-saffron-50 px-5 py-3">
                  <p className="flex items-center gap-2 text-sm font-medium text-masala-700">
                    <Truck className="h-4 w-4 text-saffron-600" />
                    {remaining > 0 ? (
                      <>
                        {t("cart.addMore")} <strong>{formatINR(remaining)}</strong>{" "}
                        {t("cart.forFreeDelivery")}
                      </>
                    ) : (
                      <span className="font-semibold text-leaf-700">
                        🎉 {t("cart.freeUnlocked")}
                      </span>
                    )}
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-saffron-200">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-saffron-400 to-chili-500"
                      animate={{ width: `${progress}%` }}
                      transition={{ type: "spring", stiffness: 200, damping: 26 }}
                    />
                  </div>
                </div>

                {/* Lines */}
                <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                  {lines.map((line) => (
                    <motion.div
                      key={line.slug}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      className="flex gap-3 rounded-2xl border border-masala-100 bg-cream-50 p-3"
                    >
                      <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-cream-200 text-3xl">
                        {line.image}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="flex items-center gap-1.5 text-sm font-bold leading-tight text-masala-900">
                            <span
                              className={cn(
                                "diet-mark scale-90",
                                line.isVeg ? "diet-veg" : "diet-nonveg",
                              )}
                            />
                            {line.name}
                          </p>
                          <button
                            onClick={() => removeItem(line.slug)}
                            aria-label={`Remove ${line.name}`}
                            className="text-masala-400 hover:text-chili-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-1 rounded-full border border-masala-200 bg-cream-50 p-0.5">
                            <button
                              onClick={() => setQty(line.slug, line.qty - 1)}
                              aria-label="Decrease"
                              className="grid h-7 w-7 place-items-center rounded-full text-masala-700 hover:bg-cream-200"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-5 text-center text-sm font-bold tabular-nums">
                              {line.qty}
                            </span>
                            <button
                              onClick={() => setQty(line.slug, line.qty + 1)}
                              aria-label="Increase"
                              className="grid h-7 w-7 place-items-center rounded-full text-masala-700 hover:bg-cream-200"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-sm font-bold text-masala-900">
                            {formatINR(line.price * line.qty)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  <button
                    onClick={clear}
                    className="mx-auto mt-2 block text-xs font-medium text-masala-400 hover:text-chili-600"
                  >
                    {t("cart.clear")}
                  </button>
                </div>

                {/* Footer */}
                <div className="border-t border-masala-100 bg-cream-50 p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-masala-500">{t("cart.subtotal")}</span>
                    <span className="font-display text-2xl font-bold text-masala-900">
                      {formatINR(subtotal)}
                    </span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="btn-primary w-full py-3.5 text-base"
                  >
                    {t("cart.checkout")}
                  </Link>
                  <p className="mt-2 text-center text-xs text-masala-400">
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
