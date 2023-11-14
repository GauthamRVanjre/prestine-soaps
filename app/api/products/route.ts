import prisma from "@/prisma/prisma";

type SoapProductItems = {
  soapBase: string;
  soapBasePrice: number; // Changed to number
  EO: string;
  EOPrice: number; // Changed to number
  FO: string;
  FOPrice: number; // Changed to number
  oils: string;
  oilPrice: number; // Changed to number
  clay: string;
  clayPrice: number; // Changed to number
  Bottles: string;
  BottlePrice: number; // Changed to number
  wrappingPapers: string;
  wrappingPapersPrice: number; // Changed to number
  packingBags: string;
  packingBagsPrice: number; // Changed to number
};

type ChocolateProductItems = {
  chocolateEO: string;
  chocolateEOPrice: number; // Changed to number
  dryFruits: string;
  dryFruitsPrice: number; // Changed to number
  milkMaid: string;
  milkMaidPrice: number; // Changed to number
  coconutPowder: string;
  coconutPowderPrice: number; // Changed to number
  chocolateWrappingPaper: string;
  chocolateWrappingPaperPrice: number; // Changed to number
  chocolateMould: string;
  chocolateMouldPrice: number; // Changed to number
  chocolatePackingBags: string;
  chocolatePackingBagsPrice: number; // Changed to number
};

type RequestBody = {
  productName: string;
  productCategory: "Chocolate" | "Soap";
  soapProductItems?: SoapProductItems;
  chocolateProductItems?: ChocolateProductItems;
  costPrice: number;
};

export async function POST(req: Request, res: Response) {
  const values: RequestBody = await req.json();

  try {
    await prisma.$connect();

    let productData: RequestBody = {
      productName: values.productName,
      productCategory: values.productCategory,
      costPrice: values.costPrice,
    };
    if (values.productCategory === "Soap") {
      productData.soapProductItems = values.soapProductItems;
    } else {
      productData.chocolateProductItems = values.chocolateProductItems;
    }

    // Create product
    const product = await prisma.product.create({
      data: productData,
    });

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify(error), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    await prisma.$connect();

    const products = await prisma.product.findMany();

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify(error), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
