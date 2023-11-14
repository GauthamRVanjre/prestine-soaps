import { Products } from "@/app/types/types";
import prisma from "@/prisma/prisma";

type RequestBody = {
  productName: string;

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

export async function POST(req: Request, res: Response) {
  const values: Products = await req.json();
  console.log("values in api", values);

  try {
    await prisma.$connect();

    const chocolateItems = await prisma.chocolateProductItems.create({
      data: {
        chocolateEO: values?.chocolateProducts.chocolateEO,
        chocolateEOPrice: values?.chocolateProducts.chocolateEOPrice,
        dryFruits: values?.chocolateProducts.dryFruits,
        dryFruitsPrice: values?.chocolateProducts.dryFruitsPrice,
        milkMaid: values?.chocolateProducts.milkMaid,
        milkMaidPrice: values?.chocolateProducts.milkMaidPrice,
        coconutPowder: values?.chocolateProducts.coconutPowder,
        coconutPowderPrice: values?.chocolateProducts.coconutPowderPrice,
        chocolateWrappingPaper:
          values?.chocolateProducts.chocolateWrappingPaper,
        chocolateWrappingPaperPrice:
          values?.chocolateProducts.chocolateWrappingPaperPrice,
        chocolateMould: values?.chocolateProducts.chocolateMould,
        chocolateMouldPrice: values?.chocolateProducts.chocolateMouldPrice,
        chocolatePackingBags: values?.chocolateProducts.chocolatePackingBags,
        chocolatePackingBagsPrice:
          values?.chocolateProducts.chocolatePackingBagsPrice,
      },
    });

    // creating a product
    const product = await prisma.product.create({
      data: {
        productName: values?.productName,
        productCategory: "Chocolate",
        chocolateProduct: {
          connect: {
            id: chocolateItems.id,
          },
        },
      },
    });

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(`${error}`), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
