import Hero from "@/components/home/Hero";
import HomeSections from "@/components/home/HomeSections";
import { getBestsellers, getCategories } from "@/lib/products";

// Rendered per request (DB isn't reachable at image-build time); the DB reads
// themselves are cached in the data layer, so warm loads stay fast.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [bestsellers, categories] = await Promise.all([
    getBestsellers(8),
    getCategories(),
  ]);

  return (
    <>
      <Hero />
      <HomeSections bestsellers={bestsellers} categories={categories} />
    </>
  );
}
