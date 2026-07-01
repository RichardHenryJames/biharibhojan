"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Home, Receipt, UtensilsCrossed } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

function SuccessInner() {
  const { t } = useLanguage();
  const params = useSearchParams();
  const orderNumber = params.get("o") || "BB-XXXXX";
  const total = Number(params.get("t") || 0);

  return (
    <div className="container-bb flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 16 }}
        className="relative grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-leaf-400 to-leaf-600 text-white shadow-warm"
      >
        <CheckCircle2 className="h-14 w-14" strokeWidth={2.2} />
        <span className="absolute -right-2 -top-1 text-3xl">🎉</span>
        <span className="absolute -bottom-1 -left-3 text-2xl">🔥</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <h1 className="mt-8 font-display text-4xl font-extrabold text-masala-900 sm:text-5xl">
          {t("orderSuccess.title")}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-masala-600">
          {t("orderSuccess.body")}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card-surface mt-8 w-full max-w-md p-6 text-left"
      >
        <div className="flex items-center justify-between border-b border-masala-100 pb-4">
          <span className="flex items-center gap-2 text-sm font-semibold text-masala-500">
            <Receipt className="h-4 w-4" /> {t("orderSuccess.orderNumber")}
          </span>
          <span className="font-display text-lg font-bold text-chili-600">
            {orderNumber}
          </span>
        </div>
        <div className="flex items-center justify-between py-4">
          <span className="flex items-center gap-2 text-sm font-semibold text-masala-500">
            <Clock className="h-4 w-4" /> {t("orderSuccess.estDelivery")}
          </span>
          <span className="font-bold text-masala-900">{t("orderSuccess.deliveryTime")}</span>
        </div>
        {total > 0 && (
          <div className="flex items-center justify-between border-t border-masala-100 pt-4">
            <span className="text-sm font-semibold text-masala-500">{t("orderSuccess.amount")}</span>
            <span className="font-display text-xl font-extrabold text-masala-900">
              {formatINR(total)}
            </span>
          </div>
        )}
      </motion.div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/menu" className="btn-primary">
          <UtensilsCrossed className="h-5 w-5" /> {t("orderSuccess.orderMore")}
        </Link>
        <Link href="/" className="btn-ghost">
          <Home className="h-5 w-5" /> {t("orderSuccess.backHome")}
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="container-bb py-32 text-center">Loading…</div>}>
      <SuccessInner />
    </Suspense>
  );
}
