import { JsonValue } from "@prisma/client/runtime/library";

export type Products = {
  id: string;
  productName: string;
  productCategory: string;
  productImage: string;
  createdDate: Date;
  costPrice: number | null;
  soapProductItems: soapProductTypes;
  chocolateProductItems: chocolateProductTypes;
};

export type chocolateProductTypes = {
  id: string;
  chocolateEO: string;
  chocolateEOPrice: string;
  dryFruits: string;
  dryFruitsPrice: string;
  milkMaid: string;
  milkMaidPrice: string;
  coconutPowder: string;
  coconutPowderPrice: string;
  chocolateWrappingPaper: string;
  chocolateWrappingPaperPrice: string;
  chocolateMould: string;
  chocolateMouldPrice: string;
  chocolatePackingBags: string;
  chocolatePackingBagsPrice: string;
};

export type soapProductTypes = {
  id: string;
  soapBase: string;
  soapBasePrice: string;
  EO: string;
  EOPrice: string;
  FO: string;
  FOPrice: string;
  oils: string;
  oilPrice: string;
  clay: string;
  clayPrice: string;
  Bottles: string;
  BottlePrice: string;
  wrappingPapers: string;
  wrappingPapersPrice: string;
  packingBags: string;
  packingBagsPrice: string;
};

export type orders = {
  id: string;
  customerName: string;
  status: string;
  orderItems: Array<itemsOrdered>;
};

export type itemsOrdered = {
  quantity: number;
  product: itemsOrderedProductType;
  sellingPrice: number;
};

export type itemsOrderedProductType = {
  productName: string;
  costPrice: number;
};
