import { z } from "zod";

export const orderFormValidator = z.object({
  status: z.string(),
});
