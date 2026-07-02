// Dishes that have a real photo in public/dishes/<slug>.webp.
// Surfaces render the photo when present and fall back to the emoji otherwise,
// so partial photo coverage never breaks the UI.
export const DISH_IMAGE_SLUGS: ReadonlySet<string> = new Set([
  "ghar-ki-thali",
  "aloo-bhujia",
  "matar-aloo-bhujia",
  "besan-aloo-sabzi",
  "aloo-dum",
  "kaddu-ki-sabzi",
  "arhar-dal-tadka",
  "jeera-rice",
  "khichdi",
  "kala-chana-ghugni",
  "rajma-masala",
  "egg-curry",
  "bihari-chicken-curry",
  "aloo-chokha",
  "baingan-chokha",
  "thekua",
  // batch 2
  "karela-bhujia",
  "baingan-bhujia",
  "beans-aloo-bhujia",
  "band-gobhi-bhujia",
  "mix-veg-bhujia",
  "soya-bhujia",
  "aloo-parwal-sabzi",
  "lauki-chana-dal",
  "nenua-ki-sabzi",
  "tori-ki-sabzi",
  "lauki-tamatar",
  "mix-veg-curry",
  "baingan-aloo-sabzi",
  "roti",
  "steamed-rice",
  "tawa-paratha",
  "kabuli-chana-masala",
  "poori",
  "soya-curry",
  // batch 3
  "bhindi-bhujia",
  "parwal-bhujia",
  "tamatar-chokha",
  "green-chutney",
  "papad",
  "mixed-pickle",
  "onion-salad",
  "boondi-raita",
  "plain-curd",
]);

/** Returns the public path to a dish photo, or null if none exists for the slug. */
export function dishImage(slug: string): string | null {
  return DISH_IMAGE_SLUGS.has(slug) ? `/dishes/${slug}.webp` : null;
}
