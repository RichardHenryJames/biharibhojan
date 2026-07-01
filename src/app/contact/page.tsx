import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Questions, bulk orders or catering in Hazaribagh? Call +91 99340 12345 or message BihariBhojan. Homestyle Bihari food, cooked fresh and delivered hot.",
  alternates: { canonical: "https://biharibhojan.com/contact" },
  openGraph: {
    title: "Contact Us · BihariBhojan",
    description:
      "Reach the BihariBhojan home kitchen in Hazaribagh: orders, catering and feedback.",
    url: "https://biharibhojan.com/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
