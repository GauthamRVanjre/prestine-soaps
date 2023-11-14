import { z } from "zod";

const soapProductItemsSchema = z.object({
  soapBase: z.string(),
  soapBasePrice: z.number(), // Changed to number
  EO: z.string(),
  EOPrice: z.number(), // Changed to number
  FO: z.string(),
  FOPrice: z.number(), // Changed to number
  oils: z.string(),
  oilPrice: z.number(), // Changed to number
  clay: z.string(),
  clayPrice: z.number(), // Changed to number
  Bottles: z.string(),
  BottlePrice: z.number(), // Changed to number
  wrappingPapers: z.string(),
  wrappingPapersPrice: z.number(), // Changed to number
  packingBags: z.string(),
  packingBagsPrice: z.number(), // Changed to number
});

const chocolateProductItemsSchema = z.object({
  chocolateBags: z.string(),
  chocolateBagsPrice: z.number(), // Changed to number
  chocolateEO: z.string(),
  chocolateEOPrice: z.number(), // Changed to number
  dryFruits: z.string(),
  dryFruitsPrice: z.number(), // Changed to number
  milkMaid: z.string(),
  milkMaidPrice: z.number(), // Changed to number
  coconutPowder: z.string(),
  coconutPowderPrice: z.number(), // Changed to number
  chocolateWrappingPaper: z.string(),
  chocolateWrappingPaperPrice: z.number(), // Changed to number
  chocolateMould: z.string(),
  chocolateMouldPrice: z.number(), // Changed to number
  chocolatePackingBags: z.string(),
  chocolatePackingBagsPrice: z.number(), // Changed to number
});

export const productForm = z.object({
  productName: z.string().nonempty("name is required"),
  productCategory: z.string().nonempty("category is required"),

  soapProductItems: soapProductItemsSchema,

  //   chocolate product items
  chocolateProductsItems: chocolateProductItemsSchema,
});
