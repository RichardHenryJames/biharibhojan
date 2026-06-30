import { prisma } from "./prisma";
import type { ProductDTO, CategoryDTO } from "./types";

type DbProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
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
  category: { slug: string; name: string };
};

function toDTO(p: DbProduct): ProductDTO {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
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
  };
}

export async function getAllProducts(): Promise<ProductDTO[]> {
  const rows = (await prisma.product.findMany({
    include: { category: true },
    orderBy: [{ isSignature: "desc" }, { isBestseller: "desc" }, { createdAt: "asc" }],
  })) as unknown as DbProduct[];
  return rows.map(toDTO);
}

export async function getBestsellers(limit = 8): Promise<ProductDTO[]> {
  const rows = (await prisma.product.findMany({
    where: { OR: [{ isBestseller: true }, { isSignature: true }] },
    include: { category: true },
    orderBy: [{ isSignature: "desc" }, { rating: "desc" }],
    take: limit,
  })) as unknown as DbProduct[];
  return rows.map(toDTO);
}

export async function getCategories(): Promise<CategoryDTO[]> {
  const cats = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });
  return cats.map((c) => ({
    name: c.name,
    slug: c.slug,
    emoji: c.emoji,
    tagline: c.tagline ?? "",
    count: c._count.products,
  }));
}
