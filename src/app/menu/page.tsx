import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllProducts, getCategories } from "@/lib/products";
import MenuBrowser from "@/components/menu/MenuBrowser";
import MenuHeader from "@/components/menu/MenuHeader";

// Rendered per request (DB isn't reachable at image-build time); the DB reads
// themselves are cached in the data layer, so warm loads stay fast.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Menu · Aloo Bhujia, Dal Tadka & Ghar ka Khana",
  description:
    "Browse the full BihariBhojan menu: dry sabzi, gravy sabzi, dal, rice & roti, protein and homestyle sides & chokha. Fresh-cooked ghar ka khana in Hazaribagh.",
};

export default async function MenuPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  return (
    <>
      <MenuHeader dishCount={products.length} categoryCount={categories.length} />

      <div className="pt-6">
        <Suspense fallback={<div className="container-bb py-20 text-center text-masala-500">Loading…</div>}>
          <MenuBrowser products={products} categories={categories} />
        </Suspense>
      </div>
    </>
  );
}
