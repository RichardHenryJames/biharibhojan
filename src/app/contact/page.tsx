import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Questions, bulk orders or catering? Get in touch with the BihariBhojan team — we're in Patna and ready to help.",
};

const INFO = [
  {
    icon: MapPin,
    title: "Visit the kitchen",
    lines: ["Boring Road, Patna", "Bihar 800001, India"],
  },
  {
    icon: Phone,
    title: "Call us",
    lines: ["+91 612 345 6789", "Daily, 9 AM – 11 PM"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["hello@biharibhojan.com", "orders@biharibhojan.com"],
  },
];

const FAQS = [
  {
    q: "Which areas do you deliver to?",
    a: "We currently deliver across Patna and nearby areas, with fresh-cooked orders reaching you in 35–50 minutes. New cities are coming soon.",
  },
  {
    q: "Do you take bulk or catering orders?",
    a: "Absolutely — from house parties to Chhath gatherings. Drop us a message with your headcount and date and we'll craft a menu.",
  },
  {
    q: "Is the food freshly cooked?",
    a: "Always. Nothing is pre-made or frozen. Your littis hit the coal and your handi starts cooking only after you order.",
  },
  {
    q: "What are the payment options?",
    a: "Cash on delivery and UPI/online payment are both supported at checkout.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-masala-100 bg-cream-200/40">
        <div className="pointer-events-none absolute -right-8 top-0 text-[9rem] opacity-10">
          📞
        </div>
        <div className="container-bb relative py-14 lg:py-20">
          <span className="eyebrow mb-3">
            <span className="h-px w-6 bg-chili-500" /> We&apos;d love to hear from you
          </span>
          <h1 className="section-title max-w-2xl">
            Get in <span className="text-gradient">touch</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-masala-600">
            Craving a custom thali, planning a feast, or just want to say the chokha
            was perfect? We&apos;re all ears.
          </p>
        </div>
      </section>

      <section className="container-bb py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Left: info */}
          <div className="space-y-5">
            {INFO.map((c) => (
              <div
                key={c.title}
                className="flex gap-4 rounded-2xl border border-masala-100 bg-cream-50 p-5 shadow-soft"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-saffron-400 to-chili-600 text-white shadow-warm">
                  <c.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold">{c.title}</h3>
                  {c.lines.map((l) => (
                    <p key={l} className="text-sm text-masala-500">
                      {l}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex items-center gap-3 rounded-2xl bg-leaf-100 p-5">
              <Clock className="h-5 w-5 text-leaf-700" />
              <p className="text-sm font-semibold text-leaf-700">
                Kitchen open now · serving till 11 PM
              </p>
            </div>

            <a
              href="tel:+916123456789"
              className="flex items-center justify-center gap-2 rounded-2xl bg-masala-900 p-5 font-semibold text-cream-50 transition-colors hover:bg-masala-800"
            >
              <MessageCircle className="h-5 w-5 text-saffron-400" />
              Chat with us on WhatsApp
            </a>
          </div>

          {/* Right: form */}
          <ContactForm />
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="section-title !text-3xl text-center">
            Frequently asked <span className="text-gradient">questions</span>
          </h2>
          <div className="mx-auto mt-8 grid max-w-3xl gap-3">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-masala-100 bg-cream-50 p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-masala-900">
                  {f.q}
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cream-200 text-lg transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-masala-500">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
