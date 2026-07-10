"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { BRAND } from "@/data/i18n";

type Section = { heading: string; body: string };

const CONTENT: Record<
  "en" | "hi",
  { eyebrow: string; titleA: string; titleHighlight: string; intro: string; updated: string; sections: Section[]; contactCta: string }
> = {
  en: {
    eyebrow: "Your privacy",
    titleA: "Privacy",
    titleHighlight: "Policy",
    intro:
      "Your trust matters. Here's exactly what we collect, why, and how we look after it, in plain language.",
    updated: "Last updated: July 2026",
    contactCta: "Questions about your privacy?",
    sections: [
      {
        heading: "What we collect",
        body: "When you place an order or contact us, we collect your name, phone number, delivery address, and, only if you choose to share it, your email. We also store the items in your order so we can prepare it.",
      },
      {
        heading: "How we use it",
        body: "We use these details only to prepare, confirm and deliver your order, and to reach you if there's a question about it. That's it, no spam, no selling.",
      },
      {
        heading: "Payments",
        body: "You pay by Cash on Delivery or UPI. We never see or store your card, bank or UPI PIN details. UPI payments go directly through your own payment app.",
      },
      {
        heading: "What stays on your device",
        body: "Your cart and language preference are saved in your browser so your choices aren't lost between visits. This information never leaves your device.",
      },
      {
        heading: "Sharing",
        body: "We do not sell or rent your information to anyone. We share it only with the kitchen and the person delivering your order.",
      },
      {
        heading: "Keeping your data",
        body: "We keep order records so we can run the kitchen and handle any follow-up. You can ask us to view, correct or delete your details at any time.",
      },
    ],
  },
  hi: {
    eyebrow: "आपकी निजता",
    titleA: "प्राइवेसी",
    titleHighlight: "नीति",
    intro:
      "आपका भरोसा हमारे लिए ज़रूरी है। यहाँ साफ़ शब्दों में बताया है कि हम क्या जानकारी लेते हैं, क्यों लेते हैं, और उसे कैसे सँभालते हैं।",
    updated: "अंतिम अपडेट: जुलाई 2026",
    contactCta: "अपनी निजता को लेकर कोई सवाल?",
    sections: [
      {
        heading: "हम क्या जानकारी लेते हैं",
        body: "जब आप ऑर्डर करते हैं या हमसे संपर्क करते हैं, तो हम आपका नाम, फ़ोन नंबर, डिलीवरी का पता और, अगर आप देना चाहें तो, ईमेल लेते हैं। साथ ही आपके ऑर्डर में शामिल व्यंजन भी सहेजते हैं ताकि उसे बना सकें।",
      },
      {
        heading: "इसका इस्तेमाल कैसे होता है",
        body: "यह जानकारी सिर्फ़ आपका ऑर्डर बनाने, पक्का करने और आप तक पहुँचाने के लिए, और ज़रूरत पड़ने पर आपसे बात करने के लिए इस्तेमाल होती है। बस इतना ही, न कोई स्पैम, न बेचना।",
      },
      {
        heading: "भुगतान",
        body: "आप कैश ऑन डिलीवरी या UPI से भुगतान करते हैं। आपके कार्ड, बैंक या UPI पिन की जानकारी हम कभी नहीं देखते या सहेजते। UPI का भुगतान सीधे आपके अपने पेमेंट ऐप से होता है।",
      },
      {
        heading: "आपके डिवाइस पर क्या रहता है",
        body: "आपकी कार्ट और भाषा की पसंद आपके ब्राउज़र में सहेजी जाती है ताकि हर बार आपका चुनाव न खोए। यह जानकारी आपके डिवाइस से बाहर नहीं जाती।",
      },
      {
        heading: "जानकारी साझा करना",
        body: "हम आपकी जानकारी न किसी को बेचते हैं, न किराए पर देते हैं। इसे सिर्फ़ रसोई और आपके ऑर्डर को पहुँचाने वाले तक साझा किया जाता है।",
      },
      {
        heading: "आपकी जानकारी रखना",
        body: "हम ऑर्डर का रिकॉर्ड रखते हैं ताकि रसोई ठीक से चल सके। आप कभी भी अपनी जानकारी देखने, बदलवाने या हटवाने के लिए कह सकते हैं।",
      },
    ],
  },
};

export default function PrivacyContent() {
  const { lang } = useLanguage();
  const c = CONTENT[lang];

  return (
    <>
      <section className="relative overflow-hidden border-b border-masala-100 bg-cream-200/40">
        <div className="pointer-events-none absolute -left-8 top-0 text-[9rem] opacity-10">
          🔒
        </div>
        <div className="container-bb relative py-14 lg:py-20">
          <span className="eyebrow mb-3">
            <ShieldCheck className="h-3.5 w-3.5" /> {c.eyebrow}
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
            <Link
              href={`mailto:${BRAND.email}`}
              className="mt-1.5 inline-block font-semibold text-saffron-300 hover:text-saffron-200"
            >
              {BRAND.email}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
