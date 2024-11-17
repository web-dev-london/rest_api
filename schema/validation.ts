import { z } from 'zod';

const itemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  quantity: z.number().min(0, "Quantity must be zero or positive"),
  price: z.number().min(0, "Price must be zero or positive"),
  supplier: z.string().optional(),
});

const orderSchema = z.object({
  inventoryItemId: z.string().min(1, "Inventory item ID is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});


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


export function validateData<T>(data: T[], schema: z.ZodSchema<T>, type: string) {
  try {
    data.forEach((item) => schema.parse(item));
    console.log(`${type} data validated successfully!`);
  } catch (error) {
    console.error(`Error validating ${type} data: ${error}`);
    process.exit(1);
  }
}



export { itemSchema, orderSchema, inventoryItemSchema, inventoryOrderSchema };