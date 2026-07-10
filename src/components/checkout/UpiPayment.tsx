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
    <div className="upi-panel">
      <div className="upi-panel__amount">
        <span>
          {t("checkout.upi.amount")}
        </span>
        <strong>
          {formatINR(amount)}
        </strong>
      </div>

      {isMobile && (
        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-wider text-masala-600">
            {t("checkout.upi.chooseApp")}
          </p>
          <div className="upi-apps">
            {APPS.map((a) => (
              <a
                key={a.key}
                href={buildUpiLink(a.key, amount, note)}
                className="upi-app"
              >
                <span className="upi-app__mark" style={{ backgroundColor: a.color }}>
                  {t(a.label).charAt(0)}
                </span>
                <span>{t(a.label)}</span>
                <ChevronRight className="h-4 w-4" />
              </a>
            ))}
            <a href={buildUpiLink("any", amount, note)} className="upi-app">
              <span className="upi-app__mark bg-masala-900">
                <Smartphone className="h-4 w-4" />
              </span>
              <span>{t("checkout.upi.anyUpi")}</span>
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setShowQr((v) => !v)}
            className="mt-4 inline-flex items-center gap-1.5 border-b border-current pb-1 text-xs font-bold uppercase tracking-wider text-chili-700"
          >
            <QrCode className="h-4 w-4" />
            {showQr ? t("checkout.upi.hideQr") : t("checkout.upi.showQr")}
          </button>
        </div>
      )}

      {qrVisible && (
        <div className="upi-qr">
          <div className="upi-qr__code">
            <QRCodeSVG value={qrValue} size={172} level="M" marginSize={0} />
          </div>
          <p>{t("checkout.upi.scan")}</p>
          <small>{t("checkout.upi.scanApps")}</small>
        </div>
      )}

      <div className="upi-id">
        <div className="min-w-0">
          <small>{t("checkout.upi.upiId")}</small>
          <strong className="truncate">{UPI_VPA}</strong>
        </div>
        <button
          type="button"
          onClick={copyVpa}
          className="upi-copy"
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

      <p className="upi-note">
        {t("checkout.upi.note")}
      </p>
    </div>
  );
}
