import { z } from "zod";

export const orderFormValidator = z.object({
  customerName: z.string(),
  orderItems: z.array(
    z.object({
      productName: z.string(),
      quantity: z.number(),
      sellingPrice: z.number(),
    })
  ),
});
