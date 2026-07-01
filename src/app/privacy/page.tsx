import type { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How BihariBhojan collects, uses and protects your information when you order homestyle Bihari food in Hazaribagh.",
  alternates: { canonical: "https://biharibhojan.com/privacy" },
  openGraph: {
    title: "Privacy Policy · BihariBhojan",
    description:
      "What we collect, why, and how we look after it, in plain language.",
    url: "https://biharibhojan.com/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
