import { restaurantSchema } from "@/schema/schemas";
import prisma from "../prisma/client-prisma";
import { listOfRestaurants } from "@/app/data/restaurants";


async function main() {
  console.log("Seeding database...");

  await prisma.restaurant.deleteMany();

  for (const restaurant of listOfRestaurants) {
    const parsed = restaurantSchema.safeParse(restaurant);

    if (!parsed.success) {
      console.error("Invalid restaurant data:", parsed.error.format());
      continue;
    }

    await prisma.restaurant.create({
      data: parsed.data,
    });
  }

  console.log("Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });