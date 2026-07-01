// Dishes that have a real photo in public/dishes/<slug>.webp.
// Surfaces render the photo when present and fall back to the emoji otherwise,
// so partial photo coverage never breaks the UI.
export const DISH_IMAGE_SLUGS: ReadonlySet<string> = new Set([
  "aloo-bhujia",
  "matar-aloo-bhujia",
  "besan-aloo-sabzi",
  "aloo-dum",
  "kaddu-ki-sabzi",
  "arhar-dal-tadka",
  "dal-tadka",
  "jeera-rice",
  "khichdi",
  "kala-chana-ghugni",
  "rajma-masala",
  "egg-curry",
  "bihari-chicken-curry",
  "aloo-chokha",
  "baingan-chokha",
  "thekua",
]);

/** Returns the public path to a dish photo, or null if none exists for the slug. */
export function dishImage(slug: string): string | null {
  return DISH_IMAGE_SLUGS.has(slug) ? `/dishes/${slug}.webp` : null;
}
