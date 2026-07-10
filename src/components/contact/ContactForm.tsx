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
    <div className="contact-form-shell">
      <h2 className="contact-form-title">{t("contact.eyebrow")}</h2>
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="form-success"
          >
            <CheckCircle2 className="h-10 w-10" />
            <h3>{t("contact.form.sentTitle")}</h3>
            <p>
              {t("contact.form.sentBody", { name: form.name.split(" ")[0] || t("contact.form.friend") })}
            </p>
            <button
              onClick={() => {
                setSent(false);
                setError(null);
                setForm({ name: "", email: "", subject: "", message: "" });
              }}
              className="btn-ghost mt-6 px-6 py-3"
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
            className="form-grid"
          >
            <div className="form-grid form-grid--two">
              <Field label={t("contact.form.name")}>
                <input
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder={t("contact.form.namePlaceholder")}
                  className="bb-input"
                />
              </Field>
              <Field label={t("contact.form.email")}>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder={t("contact.form.emailPlaceholder")}
                  className="bb-input"
                />
              </Field>
            </div>

            <Field label={t("contact.form.subject")}>
              <select value={form.subject || subjects[0] || ""} onChange={update("subject")} className="bb-input">
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
                className="bb-input resize-none"
              />
            </Field>

            {error && (
              <p className="form-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-saffron mt-2 w-full py-4"
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
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="form-field">
      <span className="form-field__label">{label}</span>
      {children}
    </label>
  );
}
