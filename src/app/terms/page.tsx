import type { Metadata } from "next";
import TermsContent from "./TermsContent";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The simple rules for ordering homestyle Bihari food from BihariBhojan — pricing, payment, delivery and cancellations.",
  alternates: { canonical: "https://biharibhojan.com/terms" },
  openGraph: {
    title: "Terms of Service · BihariBhojan",
    description:
      "The simple, friendly rules for ordering homestyle Bihari food from our kitchen.",
    url: "https://biharibhojan.com/terms",
    type: "website",
  },
};

export default function TermsPage() {
  return <TermsContent />;
}
