"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Check, ChevronRight, Copy, QrCode, Smartphone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { formatINR } from "@/lib/utils";
import { UPI_VPA, buildUpiLink, type UpiApp } from "@/lib/upi";

// Brand accent per UPI app (a small coloured dot — no third-party logos).
const APPS: { key: Exclude<UpiApp, "any">; label: string; color: string }[] = [
  { key: "phonepe", label: "checkout.upi.phonepe", color: "#5f259f" },
  { key: "gpay", label: "checkout.upi.gpay", color: "#1a73e8" },
  { key: "paytm", label: "checkout.upi.paytm", color: "#00baf2" },
];

export default function UpiPayment({
  amount,
  note = "BihariBhojan order",
}: {
  amount: number;
  note?: string;
}) {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const mobile =
      /android|iphone|ipad|ipod/i.test(navigator.userAgent) ||
      window.innerWidth < 768;
    setIsMobile(mobile);
  }, []);

  const copyVpa = async () => {
    try {
      await navigator.clipboard.writeText(UPI_VPA);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — user can still read the id */
    }
  };

  const qrValue = buildUpiLink("any", amount, note);
  const qrVisible = !isMobile || showQr;

  return (
    <div className="mt-4 rounded-2xl border border-saffron-200 bg-saffron-50/50 p-5">
      {/* Amount */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-masala-600">
          {t("checkout.upi.amount")}
        </span>
        <span className="font-display text-2xl font-extrabold text-masala-900">
          {formatINR(amount)}
        </span>
      </div>

      {/* Mobile: app deep links */}
      {isMobile && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-semibold text-masala-700">
            {t("checkout.upi.chooseApp")}
          </p>
          {APPS.map((a) => (
            <a
              key={a.key}
              href={buildUpiLink(a.key, amount, note)}
              className="flex items-center gap-3 rounded-xl border border-masala-200 bg-cream-50 p-3.5 transition-colors hover:border-saffron-400"
            >
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: a.color }}
              >
                {t(a.label).charAt(0)}
              </span>
              <span className="flex-1 text-sm font-bold text-masala-900">
                {t(a.label)}
              </span>
              <ChevronRight className="h-4 w-4 text-masala-400" />
            </a>
          ))}
          <a
            href={buildUpiLink("any", amount, note)}
            className="flex items-center gap-3 rounded-xl border border-masala-200 bg-cream-50 p-3.5 transition-colors hover:border-saffron-400"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-masala-900 text-white">
              <Smartphone className="h-4 w-4" />
            </span>
            <span className="flex-1 text-sm font-bold text-masala-900">
              {t("checkout.upi.anyUpi")}
            </span>
            <ChevronRight className="h-4 w-4 text-masala-400" />
          </a>

          <button
            type="button"
            onClick={() => setShowQr((v) => !v)}
            className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-chili-600 hover:text-chili-700"
          >
            <QrCode className="h-4 w-4" />
            {showQr ? t("checkout.upi.hideQr") : t("checkout.upi.showQr")}
          </button>
        </div>
      )}

      {/* QR (desktop always, mobile on demand) */}
      {qrVisible && (
        <div className="mt-4 flex flex-col items-center gap-2 rounded-xl bg-cream-50 p-4">
          <div className="rounded-lg bg-white p-3 shadow-soft">
            <QRCodeSVG value={qrValue} size={172} level="M" marginSize={0} />
          </div>
          <p className="text-center text-sm font-semibold text-masala-700">
            {t("checkout.upi.scan")}
          </p>
          <p className="text-center text-xs text-masala-400">
            {t("checkout.upi.scanApps")}
          </p>
        </div>
      )}

      {/* UPI ID + copy */}
      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-masala-200 bg-cream-50 px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-masala-500">
            {t("checkout.upi.upiId")}
          </p>
          <p className="truncate font-mono text-sm font-bold text-masala-900">
            {UPI_VPA}
          </p>
        </div>
        <button
          type="button"
          onClick={copyVpa}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-masala-200 bg-white px-3 py-1.5 text-xs font-bold text-masala-700 transition-colors hover:border-saffron-400"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-leaf-600" /> {t("checkout.upi.copied")}
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> {t("checkout.upi.copy")}
            </>
          )}
        </button>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-masala-500">
        {t("checkout.upi.note")}
      </p>
    </div>
  );
}
