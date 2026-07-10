"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Home, UtensilsCrossed } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

function SuccessInner() {
  const { t } = useLanguage();
  const params = useSearchParams();
  const orderNumber = params.get("o") || "BB-XXXXX";
  const total = Number(params.get("t") || 0);

  return (
    <div className="success-page">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="success-page__copy"
      >
        <span className="success-page__mark" aria-hidden>✓</span>
        <h1>{t("orderSuccess.title")}</h1>
        <p>{t("orderSuccess.body")}</p>
        <div className="success-page__actions">
          <Link href="/menu" className="btn-saffron px-6 py-3">
            <UtensilsCrossed className="h-4 w-4" /> {t("orderSuccess.orderMore")}
          </Link>
          <Link href="/" className="btn-ghost home-hero__secondary px-6 py-3">
            <Home className="h-4 w-4" /> {t("orderSuccess.backHome")}
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="success-receipt"
      >
        <div className="success-receipt__row">
          <span>{t("orderSuccess.orderNumber")}</span>
          <strong>{orderNumber}</strong>
        </div>
        <div className="success-receipt__row">
          <span>{t("orderSuccess.estDelivery")}</span>
          <strong>{t("orderSuccess.deliveryTime")}</strong>
        </div>
        {total > 0 && (
          <div className="success-receipt__row">
            <span>{t("orderSuccess.amount")}</span>
            <strong>{formatINR(total)}</strong>
          </div>
        )}
      </motion.div>
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
