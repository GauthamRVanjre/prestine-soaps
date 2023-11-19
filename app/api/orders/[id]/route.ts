import prisma from "@/prisma/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.$connect();

    const orderDetails = await prisma.orders.findUnique({
      where: {
        id: params.id,
      },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                productName: true,
                costPrice: true,
                chocolateProductItems: true,
                soapProductItems: true,
              },
            },
          },
        },
      },
    });

    return new Response(JSON.stringify(orderDetails), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

type RequestBody = {
  status: "InProcess" | "Done";
};

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data: RequestBody = await req.json();

  try {
    await prisma.$connect();

    const orderUpdate = await prisma.orders.update({
      where: {
        id: params.id,
      },
      data: {
        status: data.status,
      },
    });

    return new Response(JSON.stringify(orderUpdate), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
