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

type ChocolateProductItems = {
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

type RequestBody = {
  productName: string;
  productCategory: "Chocolate" | "Soap";
  soapProductItems?: SoapProductItems;
  chocolateProductItems?: ChocolateProductItems;
};

export async function POST(req: Request, res: Response) {
  const values: RequestBody = await req.json();

  try {
    await prisma.$connect();
    let itemsResponse;

    if (values.productCategory === "Soap" && values.soapProductItems) {
      console.log("soap items");
      itemsResponse = await prisma.soapProductItems.create({
        data: {
          ...values.soapProductItems,
        },
      });
    } else if (
      values.productCategory === "Chocolate" &&
      values.chocolateProductItems
    ) {
      itemsResponse = await prisma.chocolateProductItems.create({
        data: { ...values.chocolateProductItems },
      });
    }

    if (itemsResponse) {
      console.log("items response id", itemsResponse.id);
      console.log(values.productCategory.toLowerCase() + "Product");
      let productResponse;

      if (values.productCategory === "Chocolate") {
        productResponse = await prisma.product.create({
          data: {
            productName: values?.productName,
            productCategory: "Chocolate",
            chocolateProduct: {
              connect: {
                id: itemsResponse.id,
              },
            },
            soapProductId: undefined,
          },
        });
      } else {
        productResponse = await prisma.product.create({
          data: {
            productName: values?.productName,
            productCategory: "Soap",
            soapProduct: {
              connect: {
                id: itemsResponse.id,
              },
            },
            chocolateProductId: undefined,
          },
        });
      }

      //   [values.productCategory.toLowerCase() + "Product"]: {
      //     connect: { id: itemsResponse.id },
      //   },
      //   console.log("product response", productResponse);

      return new Response(JSON.stringify(productResponse), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: "Invalid request" }), {
        status: 400,
      });
    }
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
