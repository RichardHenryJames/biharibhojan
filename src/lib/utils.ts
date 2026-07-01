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

/** Per-category bold gradients (used on the Home category tiles). */
export const categoryGradients: Record<string, string> = {
  "dry-sabzi": "from-leaf-400 via-leaf-500 to-leaf-700",
  "gravy-sabzi": "from-saffron-400 via-saffron-500 to-chili-600",
  dal: "from-gold-400 via-saffron-500 to-saffron-700",
  "rice-roti": "from-saffron-300 via-gold-400 to-gold-600",
  protein: "from-chili-500 via-chili-600 to-masala-900",
  sides: "from-leaf-400 via-saffron-300 to-saffron-500",
};

export function gradientFor(slug?: string) {
  return (slug && categoryGradients[slug]) || "from-saffron-400 via-saffron-500 to-chili-600";
}

/** Per-category SOFT tints for the dish-card art zone — refined, image-ready
 *  placeholders (a real photo replaces the emoji later). */
export const categoryTints: Record<string, string> = {
  "dry-sabzi": "from-leaf-100 to-cream-200",
  "gravy-sabzi": "from-saffron-100 to-cream-200",
  dal: "from-gold-400/15 to-cream-200",
  "rice-roti": "from-cream-100 to-cream-300",
  protein: "from-chili-100 to-cream-200",
  sides: "from-leaf-100 to-saffron-100",
};

export function tintFor(slug?: string) {
  return (slug && categoryTints[slug]) || "from-saffron-100 to-cream-200";
}

/** Deterministic delivery-time copy. */
export function deliveryWindow(minutes: number) {
  const lo = Math.max(20, minutes - 5);
  const hi = minutes + 10;
  return `${lo}–${hi} min`;
}
