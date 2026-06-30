"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General enquiry",
    message: "",
  });

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate a network request — wire to your inbox / CRM here.
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSent(true);
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
            <h3 className="font-display text-2xl font-bold">Message sent!</h3>
            <p className="max-w-sm text-sm text-masala-500">
              Thanks {form.name.split(" ")[0] || "friend"} — our team will get back to
              you within a few hours. Meanwhile, go grab some litti! 🔥
            </p>
            <button
              onClick={() => {
                setSent(false);
                setForm({ name: "", email: "", subject: "General enquiry", message: "" });
              }}
              className="btn-ghost mt-2"
            >
              Send another
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
              <Field label="Your name">
                <input
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Aditya Kumar"
                  className="input"
                />
              </Field>
              <Field label="Email">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@email.com"
                  className="input"
                />
              </Field>
            </div>

            <Field label="Subject">
              <select value={form.subject} onChange={update("subject")} className="input">
                <option>General enquiry</option>
                <option>Bulk &amp; catering order</option>
                <option>Feedback about my order</option>
                <option>Partnership</option>
              </select>
            </Field>

            <Field label="Message">
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={update("message")}
                placeholder="Tell us what's on your mind…"
                className="input resize-none"
              />
            </Field>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full py-3.5 text-base"
            >
              {submitting ? (
                "Sending…"
              ) : (
                <>
                  Send message <Send className="h-4 w-4" />
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
