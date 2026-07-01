import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "How BihariBhojan began — a home kitchen in Hazaribagh cooking honest, ghee-touched Bihari ghar ka khana in small fresh batches, just like maa makes it.",
  alternates: { canonical: "https://biharibhojan.com/about" },
  openGraph: {
    title: "Our Story · BihariBhojan",
    description:
      "A Hazaribagh home kitchen bringing honest, homestyle Bihari food to your doorstep.",
    url: "https://biharibhojan.com/about",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
