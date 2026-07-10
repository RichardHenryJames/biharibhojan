import type { Metadata, Viewport } from "next";
import {
  Playfair_Display,
  Plus_Jakarta_Sans,
  Tiro_Devanagari_Hindi,
  Noto_Sans_Devanagari,
} from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SplashScreen from "@/components/SplashScreen";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const hindi = Tiro_Devanagari_Hindi({
  subsets: ["latin", "devanagari"],
  variable: "--font-hindi",
  weight: "400",
  display: "swap",
});

// Clean, modern Devanagari for Hindi UI text — the family big Indian apps use.
const hindiSans = Noto_Sans_Devanagari({
  subsets: ["latin", "devanagari"],
  variable: "--font-hindi-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://biharibhojan.com"),
  title: {
    default: "BihariBhojan · Ghar ka Bihari Khana, Hazaribagh",
    template: "%s · BihariBhojan",
  },
  description:
    "Order homestyle Bihari food in Hazaribagh: Aloo Bhujia, Arhar Dal Tadka, Rajma Masala, Aloo Dum & Aloo Chokha. Fresh-cooked ghar ka khana, delivered hot in 30–45 min.",
  applicationName: "BihariBhojan",
  keywords: [
    "Bihari food Hazaribagh",
    "ghar ka khana Hazaribagh",
    "homestyle Bihari food",
    "tiffin service Hazaribagh",
    "home food delivery Hazaribagh",
    "Bihari thali",
    "Aloo Bhujia",
    "Arhar Dal Tadka",
    "Rajma Masala",
    "Aloo Chokha",
    "sattu",
    "litti chokha Hazaribagh",
    "बिहारी भोजन",
    "घर का खाना हज़ारीबाग़",
  ],
  authors: [{ name: "BihariBhojan", url: "https://biharibhojan.com" }],
  creator: "BihariBhojan",
  publisher: "BihariBhojan",
  category: "food",
  alternates: {
    canonical: "https://biharibhojan.com",
    languages: {
      "hi-IN": "https://biharibhojan.com",
      "en-IN": "https://biharibhojan.com",
    },
  },
  openGraph: {
    type: "website",
    url: "https://biharibhojan.com",
    siteName: "BihariBhojan",
    title: "BihariBhojan · Ghar ka Bihari Khana, Hazaribagh",
    description:
      "Homestyle Aloo Bhujia, Arhar Dal Tadka & Aloo Chokha. Real ghar ka khana, delivered hot in Hazaribagh.",
    locale: "hi_IN",
    alternateLocale: ["en_IN"],
  },
  twitter: {
    card: "summary_large_image",
    title: "BihariBhojan · Ghar ka Bihari Khana, Hazaribagh",
    description:
      "Homestyle Bihari ghar ka khana, fresh-cooked and delivered hot in Hazaribagh.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#E8890B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://biharibhojan.com/#organization",
        name: "BihariBhojan",
        alternateName: "बिहारी भोजन",
        url: "https://biharibhojan.com",
        logo: {
          "@type": "ImageObject",
          url: "https://biharibhojan.com/icon-512.png",
          width: 512,
          height: 512,
        },
        image: "https://biharibhojan.com/biharibhojanlogo.png",
        description:
          "Homestyle (ghar ka khana) Bihari tiffin food, cooked fresh in Hazaribagh and delivered hot.",
        email: "ghar@biharibhojan.com",
        telephone: "+91-99340-12345",
      },
      {
        "@type": "WebSite",
        "@id": "https://biharibhojan.com/#website",
        url: "https://biharibhojan.com",
        name: "BihariBhojan",
        inLanguage: ["hi-IN", "en-IN"],
        publisher: { "@id": "https://biharibhojan.com/#organization" },
      },
      {
        "@type": "Restaurant",
        "@id": "https://biharibhojan.com/#restaurant",
        name: "BihariBhojan",
        image: "https://biharibhojan.com/biharibhojanlogo.png",
        url: "https://biharibhojan.com",
        servesCuisine: ["Bihari", "North Indian", "Home-style"],
        priceRange: "₹₹",
        telephone: "+91-99340-12345",
        parentOrganization: { "@id": "https://biharibhojan.com/#organization" },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Vishnupuri",
          addressLocality: "Hazaribagh",
          addressRegion: "Jharkhand",
          postalCode: "825301",
          addressCountry: "IN",
        },
        areaServed: { "@type": "City", name: "Hazaribagh" },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "08:00",
            closes: "22:00",
          },
        ],
      },
    ],
  };

  return (
    <html
      lang="hi"
      className={`${display.variable} ${sans.variable} ${hindi.variable} ${hindiSans.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SplashScreen />
        <LanguageProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
