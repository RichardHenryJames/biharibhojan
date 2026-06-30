import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a whole-rupee number as Indian currency, e.g. 1499 -> "₹1,499". */
export function formatINR(n: number) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

/** Per-category background gradients used on dish cards & hero chips. */
export const categoryGradients: Record<string, string> = {
  "litti-chokha": "from-saffron-400 via-saffron-500 to-chili-600",
  "bihari-thali": "from-gold-400 via-saffron-500 to-saffron-700",
  "champaran-special": "from-chili-500 via-chili-600 to-masala-900",
  "street-snacks": "from-leaf-400 via-leaf-500 to-leaf-700",
  "mithai-sweets": "from-gold-400 via-gold-500 to-chili-500",
  "sharbat-drinks": "from-leaf-400 via-saffron-300 to-saffron-500",
};

export function gradientFor(slug?: string) {
  return (slug && categoryGradients[slug]) || "from-saffron-400 via-saffron-500 to-chili-600";
}

/** Deterministic delivery-time copy. */
export function deliveryWindow(minutes: number) {
  const lo = Math.max(20, minutes - 5);
  const hi = minutes + 10;
  return `${lo}–${hi} min`;
}
