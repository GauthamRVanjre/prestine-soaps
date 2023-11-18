import prisma from "@/prisma/prisma";

type RequestBody = {
  customerName: string;
  items: Array<{
    productName: string;
    quantity: number;
    sellingPrice: number;
  }>;
};

export async function POST(req: Request, res: Response) {
  const values: RequestBody = await req.json();

  try {
    await prisma.$connect();

    // Create the order
    const order = await prisma.orders.create({
      data: {
        customerName: values.customerName,
        status: "InProcess",
      },
    });

    // Create order items
    const orderItems = values.items.map(
      async (item: {
        productName: string;
        quantity: number;
        sellingPrice: number;
      }) => {
        const product = await prisma.product.findUnique({
          where: {
            productName: item.productName,
          },
        });

        if (!product) {
          throw new Error(`Product with name ${item.productName} not found`);
        }

        let productSellingPrice = item.sellingPrice
          ? item.sellingPrice * item.quantity
          : product?.costPrice
          ? (product.costPrice + 100) * item.quantity
          : 100 * item.quantity;

        return prisma.orderItem.create({
          data: {
            quantity: item.quantity,
            orderId: order.id,
            productId: product.id,
            sellingPrice: productSellingPrice,
          },
        });
      }
    );

    // Wait for all order items to be created
    await Promise.all(orderItems);

    return new Response(
      JSON.stringify({ message: "Order created successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(req: Request, res: Response) {
  try {
    await prisma.$connect();

    const orders = await prisma.orders.findMany({
      include: {
        orderItems: {
          select: {
            quantity: true,
            product: {
              select: {
                productName: true,
                costPrice: true,
              },
            },
            sellingPrice: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
