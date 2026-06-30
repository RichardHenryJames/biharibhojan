import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllProducts, getCategories } from "@/lib/products";
import MenuBrowser from "@/components/menu/MenuBrowser";
import MenuHeader from "@/components/menu/MenuHeader";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Menu — Besan Aloo, Litti Chokha & Ghar ka Khana",
  description:
    "Browse the full BihariBhojan menu: Ghar ka Khana, Litti & Chokha, Rice & Pulao, Parathas, homestyle thalis, mithai and sattu coolers — fresh in Hazaribagh.",
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
