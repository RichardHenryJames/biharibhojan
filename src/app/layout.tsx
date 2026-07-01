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
    default: "BihariBhojan — Ghar ka Bihari Khana, Hazaribagh",
    template: "%s · BihariBhojan",
  },
  description:
    "Order homestyle Bihari food in Hazaribagh — Aloo Bhujia, Arhar Dal Tadka, Rajma Masala, Aloo Dum & Aloo Chokha. Fresh-cooked ghar ka khana, delivered hot.",
  keywords: [
    "Bihari food Hazaribagh",
    "ghar ka khana",
    "homestyle Bihari food",
    "Aloo Bhujia",
    "Arhar Dal Tadka",
    "Rajma Masala",
    "Aloo Chokha",
    "Sattu",
    "home food delivery Hazaribagh",
  ],
  authors: [{ name: "BihariBhojan" }],
  openGraph: {
    title: "BihariBhojan — Ghar ka Bihari Khana, Hazaribagh",
    description:
      "Homestyle Aloo Bhujia, Arhar Dal Tadka & Aloo Chokha. Real ghar ka khana, delivered hot in Hazaribagh.",
    url: "https://biharibhojan.com",
    siteName: "BihariBhojan",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%F0%9F%94%A5%3C/text%3E%3C/svg%3E",
      },
    ],
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
  return (
    <html
      lang="hi"
      className={`${display.variable} ${sans.variable} ${hindi.variable} ${hindiSans.variable}`}
    >
      <body>
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
