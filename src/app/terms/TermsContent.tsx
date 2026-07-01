"use client";

import Link from "next/link";
import { ScrollText } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { BRAND } from "@/data/i18n";

type Section = { heading: string; body: string };

const CONTENT: Record<
  "en" | "hi",
  { eyebrow: string; titleA: string; titleHighlight: string; intro: string; updated: string; sections: Section[]; contactCta: string }
> = {
  en: {
    eyebrow: "The ground rules",
    titleA: "Terms of",
    titleHighlight: "Service",
    intro: "The simple, friendly rules for ordering homestyle Bihari food from our kitchen.",
    updated: "Last updated: July 2026",
    contactCta: "Need anything?",
    sections: [
      {
        heading: "Ordering",
        body: "All prices are in Indian Rupees (₹) and depend on what's fresh that day. After you place an order we may call to confirm it before we start cooking.",
      },
      {
        heading: "Payment",
        body: "Pay by Cash on Delivery or UPI. For UPI, please pay to the UPI ID shown at checkout — we begin preparing your order once payment is confirmed.",
      },
      {
        heading: "Delivery",
        body: "We deliver within Hazaribagh. The delivery times shown are estimates and can vary with distance, weather and how busy the kitchen is. Orders over ₹399 get free delivery.",
      },
      {
        heading: "Cancellations & refunds",
        body: "Plans change — just call us as soon as you can. If we've already cooked your food we may not be able to refund it, but we'll always try to be fair.",
      },
      {
        heading: "Our food",
        body: "Everything is home-cooked in small, fresh batches. If you have any allergies or dietary needs, please tell us in the order notes or over the phone before you order.",
      },
      {
        heading: "Changes to these terms",
        body: "We may update these terms as the kitchen grows. The latest version will always live on this page.",
      },
    ],
  },
  hi: {
    eyebrow: "बुनियादी नियम",
    titleA: "सेवा की",
    titleHighlight: "शर्तें",
    intro: "हमारी रसोई से घर जैसा बिहारी खाना ऑर्डर करने के आसान और सीधे नियम।",
    updated: "अंतिम अपडेट: जुलाई 2026",
    contactCta: "कोई भी ज़रूरत हो?",
    sections: [
      {
        heading: "ऑर्डर करना",
        body: "सभी दाम भारतीय रुपये (₹) में हैं और उस दिन क्या ताज़ा है, उस पर निर्भर करते हैं। ऑर्डर करने के बाद खाना बनाने से पहले हम पुष्टि के लिए आपको कॉल कर सकते हैं।",
      },
      {
        heading: "भुगतान",
        body: "कैश ऑन डिलीवरी या UPI से भुगतान करें। UPI के लिए, कृपया चेकआउट पर दिखाए गए UPI ID पर भुगतान करें — भुगतान की पुष्टि होते ही हम आपका ऑर्डर बनाना शुरू कर देते हैं।",
      },
      {
        heading: "डिलीवरी",
        body: "हम हज़ारीबाग़ में डिलीवरी करते हैं। दिखाया गया समय अनुमानित है और दूरी, मौसम व रसोई की व्यस्तता से बदल सकता है। ₹399 से ऊपर के ऑर्डर पर डिलीवरी मुफ़्त है।",
      },
      {
        heading: "रद्द करना और रिफ़ंड",
        body: "इरादे बदलते हैं — बस जितनी जल्दी हो सके हमें कॉल कर दें। अगर आपका खाना बन चुका है तो शायद रिफ़ंड न हो पाए, पर हम हमेशा सही करने की कोशिश करेंगे।",
      },
      {
        heading: "हमारा खाना",
        body: "सब कुछ छोटे, ताज़ा बैच में घर पर बनता है। अगर आपको किसी चीज़ से एलर्जी है या कोई ख़ास ज़रूरत है, तो ऑर्डर करने से पहले ऑर्डर नोट्स में या फ़ोन पर ज़रूर बता दें।",
      },
      {
        heading: "शर्तों में बदलाव",
        body: "रसोई के बढ़ने के साथ हम इन शर्तों को अपडेट कर सकते हैं। नया संस्करण हमेशा इसी पेज पर मिलेगा।",
      },
    ],
  },
};

export default function TermsContent() {
  const { lang } = useLanguage();
  const c = CONTENT[lang];

  return (
    <>
      <section className="relative overflow-hidden border-b border-masala-100 bg-cream-200/40">
        <div className="pointer-events-none absolute -left-8 top-0 text-[9rem] opacity-10">
          📜
        </div>
        <div className="container-bb relative py-14 lg:py-20">
          <span className="eyebrow mb-3">
            <ScrollText className="h-3.5 w-3.5" /> {c.eyebrow}
          </span>
          <h1 className="section-title max-w-3xl">
            {c.titleA} <span className="text-gradient">{c.titleHighlight}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-masala-600">{c.intro}</p>
          <p className="mt-3 text-sm font-medium text-masala-400">{c.updated}</p>
        </div>
      </section>

      <section className="container-bb py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          {c.sections.map((s, i) => (
            <div key={i} className="card-surface p-6 sm:p-7">
              <h2 className="font-display text-xl font-bold text-masala-900">{s.heading}</h2>
              <p className="mt-2.5 text-[15px] leading-relaxed text-masala-600">{s.body}</p>
            </div>
          ))}

          <div className="rounded-2xl bg-masala-900 px-6 py-6 text-cream-50">
            <p className="font-display text-lg font-bold">{c.contactCta}</p>
            <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 font-semibold text-saffron-300">
              <Link href={`mailto:${BRAND.email}`} className="hover:text-saffron-200">
                {BRAND.email}
              </Link>
              <Link
                href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                className="hover:text-saffron-200"
              >
                {BRAND.phone}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
