import prisma from "@/prisma/prisma";

type RequestBody = {
  productName: string;

  // soap product items
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

export async function POST(req: Request, res: Response) {
  const values: RequestBody = await req.json();

  try {
    await prisma.$connect();

    const soapItems = await prisma.soapProductItems.create({
      data: {
        soapBase: values?.soapBase,
        soapBasePrice: values?.soapBasePrice,
        EO: values?.EO,
        EOPrice: values?.EOPrice,
        FO: values?.FO,
        FOPrice: values?.FOPrice,
        oils: values?.oils,
        oilPrice: values?.oilPrice,
        clay: values?.clay,
        clayPrice: values?.clayPrice,
        Bottles: values?.Bottles,
        BottlePrice: values?.BottlePrice,
        wrappingPapers: values?.wrappingPapers,
        wrappingPapersPrice: values?.wrappingPapersPrice,
        packingBags: values?.packingBags,
        packingBagsPrice: values?.packingBagsPrice,
      },
    });

    // creating a product
    const product = await prisma.product.create({
      data: {
        productName: values?.productName,
        productCategory: "Soap",
        soapProduct: {
          connect: {
            id: soapItems.id,
          },
        },
      },
    });

    return new Response(JSON.stringify(soapItems), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: `${error}` }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
