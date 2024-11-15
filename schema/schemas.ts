import { z } from "zod";

export const restaurantSchema = z.object({
  name: z.string(),
  address: z.string(),
  description: z.string(),
});