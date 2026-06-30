import { PrismaClient } from "@prisma/client";
import { menuData } from "../src/data/menu";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱  Seeding BihariBhojan database...");

  // Clean slate (safe for dev seeding)
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  let productCount = 0;

  for (const cat of menuData) {
    const category = await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        emoji: cat.emoji,
        tagline: cat.tagline,
        sortOrder: cat.sortOrder,
      },
    });

    for (const it of cat.items) {
      await prisma.product.create({
        data: {
          name: it.name,
          slug: it.slug,
          description: it.description,
          price: it.price,
          oldPrice: it.oldPrice ?? null,
          image: it.image,
          isVeg: it.isVeg,
          spiceLevel: it.spiceLevel,
          isBestseller: !!it.isBestseller,
          isSignature: !!it.isSignature,
          rating: it.rating,
          reviews: it.reviews,
          prepTime: it.prepTime,
          serves: it.serves,
          region: it.region ?? null,
          tags: it.tags.join(","),
          categoryId: category.id,
        },
      });
      productCount++;
    }

    console.log(`   ✓ ${cat.emoji}  ${cat.name} (${cat.items.length} dishes)`);
  }

  console.log(
    `\n✅  Seeded ${menuData.length} categories and ${productCount} dishes.\n`,
  );
}

main()
  .catch((e) => {
    console.error("❌  Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
