import { z } from 'zod';

const inventoryItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  quantity: z.number().min(0, "Quantity must be zero or positive"),
  price: z.number().min(0, "Price must be zero or positive"),
  supplier: z.string().optional(),
});

const orderSchema = z.object({
  inventoryItemId: z.string().min(1, "Inventory item ID is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

export { inventoryItemSchema, orderSchema };