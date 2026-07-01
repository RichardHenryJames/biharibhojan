import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Review your thali and place your BihariBhojan order.",
  robots: { index: false, follow: true },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
