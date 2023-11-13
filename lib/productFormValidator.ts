import { z } from "zod";

const soapProductItemsSchema = z.object({
  soapBase: z.string(),
  soapBasePrice: z.string(),
  EO: z.string(),
  EOPrice: z.string(),
  FO: z.string(),
  FOPrice: z.string(),
  oils: z.string(),
  oilPrice: z.string(),
  clay: z.string(),
  clayPrice: z.string(),
  Bottles: z.string(),
  BottlePrice: z.string(),
  wrappingPapers: z.string(),
  wrappingPapersPrice: z.string(),
  packingBags: z.string(),
  packingBagsPrice: z.string(),
});

const chocolateProductItemsSchema = z.object({
  chocolateBags: z.string(),
  chocolateBagsPrice: z.string(),
  chocolateEO: z.string(),
  chocolateEOPrice: z.string(),
  dryFruits: z.string(),
  dryFruitsPrice: z.string(),
  milkMaid: z.string(),
  milkMaidPrice: z.string(),
  coconutPowder: z.string(),
  coconutPowderPrice: z.string(),
  chocolateWrappingPaper: z.string(),
  chocolateWrappingPaperPrice: z.string(),
  chocolateMould: z.string(),
  chocolateMouldPrice: z.string(),
  chocolatePackingBags: z.string(),
  chocolatePackingBagsPrice: z.string(),
});

export const productForm = z.object({
  productName: z.string().nonempty("name is required"),
  productCategory: z.string().nonempty("category is required"),

  soapProductItems: soapProductItemsSchema,

  //   chocolate product items
  chocolateProducts: chocolateProductItemsSchema,
});
