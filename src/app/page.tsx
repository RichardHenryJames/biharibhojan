import Hero from "@/components/home/Hero";
import HomeSections from "@/components/home/HomeSections";
import { getBestsellers, getCategories } from "@/lib/products";

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
