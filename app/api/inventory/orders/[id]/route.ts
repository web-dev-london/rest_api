import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client-prisma";
import { orderSchema } from "@/schema/validation";
import { handleSingleUpdateRequest } from "@/utils/handleSingleUpdateRequest";
import { handleSingleRequest } from "@/utils/handleSingleRequest";



export async function GET(request: NextRequest, context: { params: { id: string } }): Promise<NextResponse> {
  const response = await handleSingleRequest(
    request,
    context,
    async (id) => {
      const order = await prisma.order.findUnique({
        where: {
          id,
        },
        include: {
          inventoryItem: true,
        },
      });
      return { message: "Order fetched successfully", order };
    }
  );
  return response;
}



export async function PUT(request: NextRequest, context: { params: { id: string } }): Promise<NextResponse> {
  const response = await handleSingleUpdateRequest(
    request,
    context,
    orderSchema,
    async (id, data) => {
      const updatedOrder = await prisma.order.update({
        where: { id },
        data,
      });
      return {
        message: "Order updated successfully",
        order: updatedOrder,
      };
    }
  );

  return response;
}



export async function PATCH(request: NextRequest, context: { params: { id: string } }): Promise<NextResponse> {
  const response = await handleSingleUpdateRequest(
    request,
    context,
    orderSchema.partial(),
    async (id, data) => {
      const updatedOrder = await prisma.order.update({
        where: { id },
        data,
      });
      return {
        message: "Order updated successfully",
        order: updatedOrder,
      };
    }
  );
  return response;
}




export async function DELETE(request: NextRequest, context: { params: { id: string } }): Promise<NextResponse> {
  const response = await handleSingleRequest(
    request,
    context,
    async (id) => {
      const order = await prisma.order.delete({
        where: {
          id,
        },
      });
      return { message: "Order deleted successfully", order };
    }
  );
  return response;
}












//   export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     if (!params?.id) {
//       return NextResponse.json({ error: "Missing or invalid ID" }, { status: 400 });
//     }
//     const order = await prisma.order.findUnique({
//       where: {
//         id: params.id,
//       },
//       include: {
//         inventoryItem: true,
//       },
//     });
//     return NextResponse.json(order, { status: 200 });
//   }
//   catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json({ error: "Invalid query parameters", details: error.errors }, { status: 400 });
//     }
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }






// export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     if (!params?.id) {
//       return NextResponse.json({ error: "Missing or invalid ID" }, { status: 400 });
//     }

//     const requestBody = await request.json();
//     const validatedData = orderSchema.safeParse(requestBody);

//     if (!validatedData.success) {
//       return NextResponse.json({ error: validatedData.error.format() }, { status: 400 });
//     }

//     const updatedOrder = await prisma.order.update({
//       where: {
//         id: params.id,
//       },
//       data: validatedData.data,
//     });

//     return NextResponse.json(updatedOrder, {
//       status: 200,
//     });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json({ error: "Invalid query parameters", details: error.errors }, { status: 400 });
//     }
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// };




// export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     if (!params?.id) {
//       return NextResponse.json({ error: "Missing or invalid ID" }, { status: 400 });
//     }
//     const body = await request.json();
//     const updatedOrder = await prisma.order.update({
//       where: {
//         id: params.id,
//       },
//       data: body,
//     });
//     return NextResponse.json(updatedOrder, { status: 200 });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json({ error: "Invalid query parameters", details: error.errors }, { status: 400 });
//     }
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// };





// export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     if (!params?.id) {
//       return NextResponse.json({ error: "Missing or invalid ID" }, { status: 400 });
//     }
//     const order = await prisma.order.delete({
//       where: {
//         id: params.id,
//       },
//     });
//     return NextResponse.json(order, { status: 200 });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json({ error: "Invalid query parameters", details: error.errors }, { status: 400 });
//     }
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// };