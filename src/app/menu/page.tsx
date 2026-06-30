import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllProducts, getCategories } from "@/lib/products";
import MenuBrowser from "@/components/menu/MenuBrowser";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Menu — Litti Chokha, Champaran Mutton & more",
  description:
    "Browse the full BihariBhojan menu: Litti & Chokha, Bihari thalis, Champaran handi meats, street snacks, mithai and sattu coolers.",
};

export default async function MenuPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  return (
    <>
      {/* Page header band */}
      <section className="relative overflow-hidden border-b border-masala-100 bg-cream-200/40">
        <div className="pointer-events-none absolute -right-10 -top-10 text-[10rem] opacity-10">
          🍛
        </div>
        <div className="container-bb relative py-12 lg:py-16">
          <span className="eyebrow mb-3">
            <span className="h-px w-6 bg-chili-500" /> The full spread
          </span>
          <h1 className="section-title max-w-2xl">
            Our <span className="text-gradient">menu</span>
          </h1>
          <p className="mt-3 max-w-xl text-masala-600">
            {products.length} dishes, freshly cooked to order across {categories.length}{" "}
            categories — pick your plate and we&apos;ll fire up the coal.
          </p>
        </div>
      </section>

      <div className="pt-6">
        <Suspense fallback={<div className="container-bb py-20 text-center text-masala-500">Loading menu…</div>}>
          <MenuBrowser products={products} categories={categories} />
        </Suspense>
      </div>
    </>
  );
}
