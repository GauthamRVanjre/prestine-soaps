import { Products } from "@/app/types/types";
import prisma from "@/prisma/prisma";

type RequestBody = {
  productName: string;

  // soap product items
  // soapProductItems: {
  // };
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

    const result = await prisma.$transaction(async (tx) => {
      // Create soap product items within the transaction
      const soapItems = await tx.soapProductItems.create({
        data: values,
      });

      // Create product within the transaction
      const product = await tx.product.create({
        data: {
          productName: values.productName,
          productCategory: "Soap",
          soapProductId: soapItems.id,
        },
      });

      // Return the result of the transaction
      return product;
    });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: `${error}` }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
