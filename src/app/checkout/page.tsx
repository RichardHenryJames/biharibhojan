"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Banknote, Loader2, Lock, ShoppingBag, Smartphone } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn, formatINR } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { dishImage } from "@/data/dishImages";
import UpiPayment from "@/components/checkout/UpiPayment";

const FREE_DELIVERY_THRESHOLD = 399;
const DELIVERY_FEE = 39;

export default function CheckoutPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { lines, subtotal, count, clear, hydrated } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payment, setPayment] = useState<"COD" | "UPI">("COD");
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    notes: "",
  });

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          paymentMethod: payment,
          items: lines.map((l) => ({ slug: l.slug, qty: l.qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t("checkout.errorGeneric"));
        setSubmitting(false);
        return;
      }
      clear();
      router.push(
        `/order-success?o=${encodeURIComponent(data.orderNumber)}&t=${data.total}`,
      );
    } catch {
      setError(t("checkout.errorNetwork"));
      setSubmitting(false);
    }
  };

  // Empty cart
  if (hydrated && count === 0) {
    return (
      <div className="checkout-empty container-bb">
        <span className="checkout-empty__mark" aria-hidden>00</span>
        <h1>{t("checkout.emptyTitle")}</h1>
        <p>{t("checkout.emptyBody")}</p>
        <Link href="/menu" className="btn-primary mt-6 px-6 py-3">
          {t("checkout.emptyCta")}
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page container-bb">
      <Link
        href="/menu"
        className="checkout-back"
      >
        <ArrowLeft className="h-4 w-4" /> {t("checkout.backToMenu")}
      </Link>

      <h1 className="checkout-title">
        {t("checkout.titleA")} {t("checkout.titleHighlight")}
      </h1>

      <form onSubmit={onSubmit} className="checkout-layout">
        <div className="checkout-column">
          <fieldset className="checkout-section">
            <legend>
              {t("checkout.deliveryDetails")}
            </legend>
            <div className="checkout-fields">
              <Field label={t("checkout.fullName")} full={false}>
                <input
                  required
                  value={form.customerName}
                  onChange={update("customerName")}
                  placeholder={t("checkout.fullNamePlaceholder")}
                  className="ck-input"
                />
              </Field>
              <Field label={t("checkout.phone")}>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder={t("checkout.phonePlaceholder")}
                  className="ck-input"
                />
              </Field>
              <Field label={t("checkout.email")} span>
                <input
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder={t("checkout.emailPlaceholder")}
                  className="ck-input"
                />
              </Field>
              <Field label={t("checkout.address")} span>
                <textarea
                  required
                  rows={2}
                  value={form.address}
                  onChange={update("address")}
                  placeholder={t("checkout.addressPlaceholder")}
                  className="ck-input resize-none"
                />
              </Field>
              <Field label={t("checkout.city")}>
                <input
                  required
                  value={form.city}
                  onChange={update("city")}
                  placeholder={t("checkout.cityDefault")}
                  className="ck-input"
                />
              </Field>
              <Field label={t("checkout.pincode")}>
                <input
                  required
                  value={form.pincode}
                  onChange={update("pincode")}
                  placeholder={t("checkout.pincodePlaceholder")}
                  className="ck-input"
                />
              </Field>
              <Field label={t("checkout.notes")} span>
                <input
                  value={form.notes}
                  onChange={update("notes")}
                  placeholder={t("checkout.notesPlaceholder")}
                  className="ck-input"
                />
              </Field>
            </div>
          </fieldset>

          <fieldset className="checkout-section">
            <legend>{t("checkout.paymentMethod")}</legend>
            <div className="payment-grid">
              <PaymentOption
                active={payment === "COD"}
                onClick={() => setPayment("COD")}
                icon={Banknote}
                title={t("checkout.codTitle")}
                sub={t("checkout.codSub")}
              />
              <PaymentOption
                active={payment === "UPI"}
                onClick={() => setPayment("UPI")}
                icon={Smartphone}
                title={t("checkout.upiTitle")}
                sub={t("checkout.upiSub")}
              />
            </div>

            {payment === "UPI" && <UpiPayment amount={total} note={`BihariBhojan order`} />}
          </fieldset>
        </div>

        <div className="checkout-summary-wrap">
          <div className="checkout-summary">
            <div className="checkout-summary__head">
              <h2>
                {t("checkout.orderSummary")}{" "}
                <span>({count})</span>
              </h2>
              <ShoppingBag className="h-4 w-4" />
            </div>

            <div className="checkout-summary__lines">
              {lines.map((l) => (
                <div key={l.slug} className="checkout-summary__line">
                  <span className="checkout-summary__image">
                    {dishImage(l.slug) ? (
                      <Image
                        src={dishImage(l.slug) as string}
                        alt={l.name}
                        width={44}
                        height={44}
                      />
                    ) : (
                      l.image
                    )}
                  </span>
                  <div className="min-w-0">
                    <strong>{l.name}</strong>
                    <small>
                      {formatINR(l.price)} × {l.qty}
                    </small>
                  </div>
                  <span className="checkout-summary__price">
                    {formatINR(l.price * l.qty)}
                  </span>
                </div>
              ))}
            </div>

            <div className="checkout-totals">
              <Row label={t("checkout.subtotal")} value={formatINR(subtotal)} />
              <Row
                label={t("checkout.deliveryFee")}
                value={
                  deliveryFee === 0 ? (
                    <strong>{t("checkout.free")}</strong>
                  ) : (
                    formatINR(deliveryFee)
                  )
                }
              />
              {deliveryFee > 0 && (
                <p className="mt-2 text-xs opacity-50">
                  {t("checkout.addMore", { amount: formatINR(FREE_DELIVERY_THRESHOLD - subtotal) })}
                </p>
              )}
              <div className="checkout-totals-row checkout-totals__grand">
                <span>{t("checkout.total")}</span>
                <span>
                  {formatINR(total)}
                </span>
              </div>
            </div>

            <div className="checkout-submit">
              {error && (
                <p className="form-error mb-3">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full py-4"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> {t("checkout.placing")}
                  </>
                ) : (
                  <>{t("checkout.placeOrder")} · {formatINR(total)}</>
                )}
              </button>
              <p className="checkout-secure">
                <Lock className="h-3.5 w-3.5" /> {t("checkout.secure")}
              </p>
            </div>
          </div>
        </div>
      </form>

    </div>
  );
}

function Field({
  label,
  children,
  span,
}: {
  label: string;
  children: React.ReactNode;
  span?: boolean;
  full?: boolean;
}) {
  return (
    <label className={cn("form-field", span && "sm:col-span-2")}>
      <span className="form-field__label">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="checkout-totals-row">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function PaymentOption({
  active,
  onClick,
  icon: Icon,
  title,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Banknote;
  title: string;
  sub: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "payment-option",
        active && "is-active",
      )}
    >
      <span className="payment-option__icon">
        <Icon className="h-5 w-5" />
      </span>
      <span>
        <strong>{title}</strong>
        <small>{sub}</small>
      </span>
    </button>
  );
}
