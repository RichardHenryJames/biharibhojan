import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { ProductDTO } from "@/lib/types";

export const dynamic = "force-dynamic";

type ProductWithCategory = Awaited<
  ReturnType<typeof prisma.product.findMany>
>[number] & { category: { slug: string; name: string; nameHi: string | null } };

function toDTO(p: ProductWithCategory): ProductDTO {
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const veg = searchParams.get("veg");
  const q = searchParams.get("q")?.trim();
  const bestseller = searchParams.get("bestseller");

  const where: Prisma.ProductWhereInput = {
    ...(category && category !== "all" ? { category: { slug: category } } : {}),
    ...(veg === "true" ? { isVeg: true } : {}),
    ...(bestseller === "true" ? { isBestseller: true } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q } },
            { description: { contains: q } },
            { tags: { contains: q.toLowerCase() } },
          ],
        }
      : {}),
  };

  try {
    const products = (await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: [
        { isSignature: "desc" },
        { isBestseller: "desc" },
        { createdAt: "asc" },
      ],
    })) as ProductWithCategory[];

    return NextResponse.json(products.map(toDTO));
  } catch (e) {
    console.error("GET /api/products failed:", e);
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 },
    );
  }
}
