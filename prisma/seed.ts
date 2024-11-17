import prisma from "./client-prisma";
import { listOfInventoryItems, listOfInventoryOrders } from "@/data/inventories";
import { z } from "zod";

const inventoryItemSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1),
  quantity: z.number().int().nonnegative(),
  price: z.number().positive(),
  supplier: z.string().min(1),
});

const inventoryOrderSchema = z.object({
  quantity: z.number().int().nonnegative(),
  inventoryItemId: z.string().cuid(),
});


function validateData<T>(data: T[], schema: z.ZodSchema<T>, type: string) {
  try {
    data.forEach((item) => schema.parse(item));
    console.log(`${type} data validated successfully!`);
  } catch (error) {
    console.error(`Error validating ${type} data: ${error}`);
    process.exit(1);
  }
}


async function main() {
  validateData(listOfInventoryItems, inventoryItemSchema, "Inventory Items");
  validateData(listOfInventoryOrders, inventoryOrderSchema, "Inventory Orders");

  await prisma.inventoryItem.createMany({ data: listOfInventoryItems });
  await prisma.order.createMany({ data: listOfInventoryOrders });

  console.log("Database seeded successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });