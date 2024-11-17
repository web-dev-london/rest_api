import prisma from "./client-prisma";
import { listOfInventoryItems, listOfInventoryOrders } from "@/data/inventories";
import { inventoryItemSchema, inventoryOrderSchema, validateData } from "@/schema/validation";




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