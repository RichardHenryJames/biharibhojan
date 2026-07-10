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
      <div className="container-bb flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
        <span className="grid h-24 w-24 place-items-center rounded-full bg-cream-200 text-5xl">
          🛒
        </span>
        <h1 className="font-display text-3xl font-bold">{t("checkout.emptyTitle")}</h1>
        <p className="max-w-sm text-masala-500">
          {t("checkout.emptyBody")}
        </p>
        <Link href="/menu" className="btn-primary mt-2">
          {t("checkout.emptyCta")}
        </Link>
      </div>
    );
  }

  return (
    <div className="container-bb py-12">
      <Link
        href="/menu"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-masala-500 hover:text-chili-600"
      >
        <ArrowLeft className="h-4 w-4" /> {t("checkout.backToMenu")}
      </Link>

      <h1 className="section-title !text-4xl">
        {t("checkout.titleA")} <span className="text-gradient">{t("checkout.titleHighlight")}</span>
      </h1>

      <form onSubmit={onSubmit} className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        {/* Left: details */}
        <div className="space-y-6">
          <fieldset className="card-surface p-6">
            <legend className="px-2 font-display text-lg font-bold">
              {t("checkout.deliveryDetails")}
            </legend>
            <div className="grid gap-4 pt-4 sm:grid-cols-2">
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

          {/* Payment */}
          <fieldset className="card-surface p-6">
            <legend className="px-2 font-display text-lg font-bold">{t("checkout.paymentMethod")}</legend>
            <div className="grid gap-3 pt-4 sm:grid-cols-2">
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

        {/* Right: summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="card-surface overflow-hidden">
            <div className="flex items-center gap-2 border-b border-masala-100 bg-cream-200/40 px-6 py-4">
              <ShoppingBag className="h-5 w-5 text-chili-600" />
              <h2 className="font-display text-lg font-bold">
                {t("checkout.orderSummary")}{" "}
                <span className="text-masala-400">({count})</span>
              </h2>
            </div>

            <div className="max-h-72 space-y-3 overflow-y-auto px-6 py-4">
              {lines.map((l) => (
                <div key={l.slug} className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-cream-200 text-2xl">
                    {dishImage(l.slug) ? (
                      <Image
                        src={dishImage(l.slug) as string}
                        alt={l.name}
                        width={44}
                        height={44}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      l.image
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-masala-900">
                      {l.name}
                    </p>
                    <p className="text-xs text-masala-500">
                      {formatINR(l.price)} × {l.qty}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-masala-900">
                    {formatINR(l.price * l.qty)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-masala-100 px-6 py-4 text-sm">
              <Row label={t("checkout.subtotal")} value={formatINR(subtotal)} />
              <Row
                label={t("checkout.deliveryFee")}
                value={
                  deliveryFee === 0 ? (
                    <span className="font-semibold text-leaf-600">{t("checkout.free")}</span>
                  ) : (
                    formatINR(deliveryFee)
                  )
                }
              />
              {deliveryFee > 0 && (
                <p className="text-xs text-masala-400">
                  {t("checkout.addMore", { amount: formatINR(FREE_DELIVERY_THRESHOLD - subtotal) })}
                </p>
              )}
              <div className="flex items-center justify-between border-t border-masala-100 pt-3">
                <span className="font-display text-lg font-bold">{t("checkout.total")}</span>
                <span className="font-display text-2xl font-extrabold text-masala-900">
                  {formatINR(total)}
                </span>
              </div>
            </div>

            <div className="px-6 pb-6">
              {error && (
                <p className="mb-3 rounded-xl bg-chili-100 px-4 py-2.5 text-sm font-medium text-chili-700">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full py-3.5 text-base"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> {t("checkout.placing")}
                  </>
                ) : (
                  <>{t("checkout.placeOrder")} · {formatINR(total)}</>
                )}
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-masala-400">
                <Lock className="h-3.5 w-3.5" /> {t("checkout.secure")}
              </p>
            </div>
          </div>
        </div>
      </form>

      <style jsx global>{`
        .ck-input {
          width: 100%;
          border-radius: 0.9rem;
          border: 1px solid #e0d1c2;
          background: #fffdf9;
          padding: 0.7rem 0.95rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: #241910;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .ck-input:focus {
          border-color: #f4a52c;
          box-shadow: 0 0 0 3px rgba(252, 215, 141, 0.5);
        }
      `}</style>
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
    <label className={cn("block", span && "sm:col-span-2")}>
      <span className="mb-1.5 block text-sm font-semibold text-masala-700">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-masala-500">{label}</span>
      <span className="font-semibold text-masala-800">{value}</span>
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
      className={cn(
        "flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all",
        active
          ? "border-chili-500 bg-chili-50/60 shadow-soft"
          : "border-masala-200 bg-cream-50 hover:border-masala-300",
      )}
    >
      <span
        className={cn(
          "grid h-10 w-10 place-items-center rounded-xl",
          active ? "bg-chili-600 text-white" : "bg-cream-200 text-masala-600",
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-sm font-bold text-masala-900">{title}</span>
        <span className="block text-xs text-masala-500">{sub}</span>
      </span>
    </button>
  );
}
