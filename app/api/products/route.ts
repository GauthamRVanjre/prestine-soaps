import { Products } from "@/app/types/types";
import prisma from "@/prisma/prisma";
type SoapProductItems = {
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

type chocolateProducts = {
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

type RequestBody = {
  productName: string;
  productCategory: "Chocolate" | "Soap";
  soapProductItems?: SoapProductItems;
  chocolateProducts?: chocolateProducts;
};

type productType = {
  productName: string;
  productCategory: "Chocolate" | "Soap";
  soapProduct?: { connect: { id: string } };
  chocolateProduct?: { connect: { id: string } };
};

export async function POST(req: Request, res: Response) {
  const values: RequestBody = await req.json();

  try {
    await prisma.$connect();

    let chocolateProduct;
    let soapProduct;
    if (values.productCategory === "Chocolate") {
      chocolateProduct = await prisma.chocolateProductItems.create({
        data: {
          chocolateEO: values?.chocolateProducts?.chocolateEO,
          chocolateEOPrice: values?.chocolateProducts?.chocolateEOPrice,
          dryFruits: values?.chocolateProducts?.dryFruits,
          dryFruitsPrice: values?.chocolateProducts?.dryFruitsPrice,
          milkMaid: values?.chocolateProducts?.milkMaid,
          milkMaidPrice: values?.chocolateProducts?.milkMaidPrice,
          coconutPowder: values?.chocolateProducts?.coconutPowder,
          coconutPowderPrice: values?.chocolateProducts?.coconutPowderPrice,
          chocolateWrappingPaper:
            values?.chocolateProducts?.chocolateWrappingPaper,
          chocolateWrappingPaperPrice:
            values?.chocolateProducts?.chocolateWrappingPaperPrice,
          chocolateMould: values?.chocolateProducts?.chocolateMould,
          chocolateMouldPrice: values?.chocolateProducts?.chocolateMouldPrice,
          chocolatePackingBags: values?.chocolateProducts?.chocolatePackingBags,
          chocolatePackingBagsPrice:
            values?.chocolateProducts?.chocolatePackingBagsPrice,
        },
      });
    }
    if (values.productCategory === "Soap") {
      soapProduct = await prisma.soapProductItems.create({
        data: {
          soapBase: values?.soapProductItems?.soapBase,
          soapBasePrice: values?.soapProductItems?.soapBasePrice,
          EO: values?.soapProductItems?.EO,
          EOPrice: values?.soapProductItems?.EOPrice,
          FO: values?.soapProductItems?.FO,
          FOPrice: values?.soapProductItems?.FOPrice,
          oils: values?.soapProductItems?.oils,
          oilPrice: values?.soapProductItems?.oilPrice,
          clay: values?.soapProductItems?.clay,
          clayPrice: values?.soapProductItems?.clayPrice,
          Bottles: values?.soapProductItems?.Bottles,
          BottlePrice: values?.soapProductItems?.BottlePrice,
          wrappingPapers: values?.soapProductItems?.wrappingPapers,
          wrappingPapersPrice: values?.soapProductItems?.wrappingPapersPrice,
          packingBags: values?.soapProductItems?.packingBags,
          packingBagsPrice: values?.soapProductItems?.packingBagsPrice,
        },
      });
    }

    console.log("soap product", soapProduct);
    console.log("chocolate product", chocolateProduct);
    let product;
    product = await prisma.product.create({
      data: {
        productName: values.productName,
        productCategory: values.productCategory,
      },
    });
    if (values.productCategory === "Chocolate") {
      await prisma.product.update({
        where: {
          id: product.id,
        },
        data: {
          chocolateProduct: {
            connect: {
              id: chocolateProduct?.id,
            },
          },
        },
      });
    } else {
      await prisma.product.update({
        where: {
          id: product.id,
        },
        data: {
          soapProduct: {
            connect: {
              id: soapProduct?.id,
            },
          },
        },
      });
    }
    console.log("product", product);
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(req: Request, res: Response) {
  try {
    await prisma.$connect();

    const products = await prisma.product.findMany({
      include: {
        soapProduct: true,
        chocolateProduct: true,
      },
    });

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
