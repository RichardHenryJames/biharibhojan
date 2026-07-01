import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";
import type { ProductDTO, CategoryDTO } from "./types";

// The catalog changes rarely, so cache DB reads in the Next.js Data Cache.
// Warm instances serve repeat requests without re-hitting the database; a fresh
// reseed shows up within CATALOG_TTL. (Works under `force-dynamic` pages.)
const CATALOG_TTL = 300; // seconds

type DbProduct = {
  id: string;
  name: string;
  nameHi: string | null;
  slug: string;
  description: string;
  descriptionHi: string | null;
  price: number;
  oldPrice: number | null;
  image: string;
  isVeg: boolean;
  spiceLevel: number;
  isBestseller: boolean;
  isSignature: boolean;
  rating: number;
  reviews: number;
  prepTime: number;
  serves: string;
  region: string | null;
  tags: string;
  category: { slug: string; name: string; nameHi: string | null };
};

function toDTO(p: DbProduct): ProductDTO {
  return {
    id: p.id,
    name: p.name,
    nameHi: p.nameHi,
    slug: p.slug,
    description: p.description,
    descriptionHi: p.descriptionHi,
    price: p.price,
    oldPrice: p.oldPrice,
    image: p.image,
    isVeg: p.isVeg,
    spiceLevel: p.spiceLevel,
    isBestseller: p.isBestseller,
    isSignature: p.isSignature,
    rating: p.rating,
    reviews: p.reviews,
    prepTime: p.prepTime,
    serves: p.serves,
    region: p.region,
    tags: p.tags ? p.tags.split(",").filter(Boolean) : [],
    categorySlug: p.category.slug,
    categoryName: p.category.name,
    categoryNameHi: p.category.nameHi,
  };
}

export const getAllProducts = unstable_cache(
  async (): Promise<ProductDTO[]> => {
    const rows = (await prisma.product.findMany({
      include: { category: true },
      orderBy: [{ isSignature: "desc" }, { isBestseller: "desc" }, { createdAt: "asc" }],
    })) as unknown as DbProduct[];
    return rows.map(toDTO);
  },
  ["catalog:all-products"],
  { revalidate: CATALOG_TTL, tags: ["catalog"] },
);

export const getBestsellers = unstable_cache(
  async (limit = 8): Promise<ProductDTO[]> => {
    const rows = (await prisma.product.findMany({
      where: { OR: [{ isBestseller: true }, { isSignature: true }] },
      include: { category: true },
      orderBy: [{ isSignature: "desc" }, { rating: "desc" }],
      take: limit,
    })) as unknown as DbProduct[];
    return rows.map(toDTO);
  },
  ["catalog:bestsellers"],
  { revalidate: CATALOG_TTL, tags: ["catalog"] },
);

export const getCategories = unstable_cache(
  async (): Promise<CategoryDTO[]> => {
    const cats = await prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: { _count: { select: { products: true } } },
    });
    return cats.map((c) => ({
      name: c.name,
      nameHi: c.nameHi,
      slug: c.slug,
      emoji: c.emoji,
      tagline: c.tagline ?? "",
      taglineHi: c.taglineHi,
      count: c._count.products,
    }));
  },
  ["catalog:categories"],
  { revalidate: CATALOG_TTL, tags: ["catalog"] },
);
