import { z } from "zod";

export const productForm = z.object({
  productName: z.string().nonempty("name is required"),
  productCategory: z.string(),
});
