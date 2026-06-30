import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cats = await prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: { _count: { select: { products: true } } },
    });

    return NextResponse.json(
      cats.map((c) => ({
        name: c.name,
        slug: c.slug,
        emoji: c.emoji,
        tagline: c.tagline ?? "",
        count: c._count.products,
      })),
    );
  } catch (e) {
    console.error("GET /api/categories failed:", e);
    return NextResponse.json(
      { error: "Failed to load categories" },
      { status: 500 },
    );
  }
}
