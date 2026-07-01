"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactForm() {
  const { t, tRaw } = useLanguage();
  const subjects = tRaw<string[]>("contact.form.subjects") ?? [];
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          subject: form.subject || subjects[0] || "",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t("contact.form.error"));
        setSubmitting(false);
        return;
      }
      setSubmitting(false);
      setSent(true);
    } catch {
      setError(t("contact.form.error"));
      setSubmitting(false);
    }
  };

  return (
    <div className="card-surface relative overflow-hidden p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center gap-3 py-12 text-center"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-leaf-100 text-leaf-600">
              <CheckCircle2 className="h-9 w-9" />
            </span>
            <h3 className="font-display text-2xl font-bold">{t("contact.form.sentTitle")}</h3>
            <p className="max-w-sm text-sm text-masala-500">
              {t("contact.form.sentBody", { name: form.name.split(" ")[0] || t("contact.form.friend") })}
            </p>
            <button
              onClick={() => {
                setSent(false);
                setError(null);
                setForm({ name: "", email: "", subject: "", message: "" });
              }}
              className="btn-ghost mt-2"
            >
              {t("contact.form.sendAnother")}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={onSubmit}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t("contact.form.name")}>
                <input
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder={t("contact.form.namePlaceholder")}
                  className="input"
                />
              </Field>
              <Field label={t("contact.form.email")}>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder={t("contact.form.emailPlaceholder")}
                  className="input"
                />
              </Field>
            </div>

            <Field label={t("contact.form.subject")}>
              <select value={form.subject || subjects[0] || ""} onChange={update("subject")} className="input">
                {subjects.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>

            <Field label={t("contact.form.message")}>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={update("message")}
                placeholder={t("contact.form.messagePlaceholder")}
                className="input resize-none"
              />
            </Field>

            {error && (
              <p className="rounded-xl bg-chili-100 px-4 py-2.5 text-sm font-medium text-chili-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full py-3.5 text-base"
            >
              {submitting ? (
                t("contact.form.sending")
              ) : (
                <>
                  {t("contact.form.send")} <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <style jsx>{`
        :global(.input) {
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
        :global(.input:focus) {
          border-color: #f4a52c;
          box-shadow: 0 0 0 3px rgba(252, 215, 141, 0.5);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-masala-700">{label}</span>
      {children}
    </label>
  );
}
