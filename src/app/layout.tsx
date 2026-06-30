import type { Metadata, Viewport } from "next";
import {
  Playfair_Display,
  Plus_Jakarta_Sans,
  Tiro_Devanagari_Hindi,
} from "next/font/google";
import "./globals.css";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://biharibhojan.com"),
  title: {
    default: "BihariBhojan — Authentic Bihari Food, Delivered Hot",
    template: "%s · BihariBhojan",
  },
  description:
    "Order authentic Bihari food online — Litti Chokha, Champaran Handi Mutton, Sattu Paratha, Thekua & Silao Khaja. Coal-roasted, ghee-soaked, delivered hot to your door.",
  keywords: [
    "Bihari food",
    "Litti Chokha",
    "Champaran mutton",
    "Sattu",
    "Thekua",
    "Bihari thali",
    "order Bihari food online",
  ],
  authors: [{ name: "BihariBhojan" }],
  openGraph: {
    title: "BihariBhojan — Authentic Bihari Food, Delivered Hot",
    description:
      "Litti Chokha to Champaran Handi Mutton. Real Bihari flavours, delivered hot.",
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
      lang="en"
      className={`${display.variable} ${sans.variable} ${hindi.variable}`}
    >
      <body>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
