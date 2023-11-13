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
  const values: RequestBody = await req.json();

  try {
    await prisma.$connect();

    const chocolateItems = await prisma.chocolateProductItems.create({
      data: {
        chocolateEO: values?.chocolateEO,
        chocolateEOPrice: values?.chocolateEOPrice,
        dryFruits: values?.dryFruits,
        dryFruitsPrice: values?.dryFruitsPrice,
        milkMaid: values?.milkMaid,
        milkMaidPrice: values?.milkMaidPrice,
        coconutPowder: values?.coconutPowder,
        coconutPowderPrice: values?.coconutPowderPrice,
        chocolateWrappingPaper: values?.chocolateWrappingPaper,
        chocolateWrappingPaperPrice: values?.chocolateWrappingPaperPrice,
        chocolateMould: values?.chocolateMould,
        chocolateMouldPrice: values?.chocolateMouldPrice,
        chocolatePackingBags: values?.chocolatePackingBags,
        chocolatePackingBagsPrice: values?.chocolatePackingBagsPrice,
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
