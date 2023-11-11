export type Products = {
  id: string;
  productName: string;
  productCategory: string;
  createdDate: string;
  costPrice: string;
  chocolateProduct: chocolateProductTypes;
  soapProduct: soapProductTypes;
};

export type chocolateProductTypes = {
  id: string;
  chocolateBags: string;
  chocolateBagsPrice: string;
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
