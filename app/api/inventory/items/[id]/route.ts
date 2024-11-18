import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client-prisma";
import { itemSchema } from "@/schema/validation";
import { z } from "zod"
// import { handleSingleRequest } from "@/utils/handleSingleRequest";
// import { handleSingleUpdateRequest } from "@/utils/handleSingleUpdateRequest";



// export async function GET(
//   request: NextRequest,
//   context: { params: { id: string } }
// ): Promise<NextResponse> {
//   const response = await handleSingleRequest(
//     request,
//     context,
//     async (id) => {
//       const item = await prisma.inventoryItem.findUnique({
//         where: {
//           id,
//         },
//       });
//       return { message: "Item fetched successfully", item };
//     }
//   );
//   return response;
// }

// export async function PUT(
//   request: NextRequest,
//   context: { params: { id: string } }
// ): Promise<NextResponse> {
//   const response = await handleSingleUpdateRequest(
//     request,
//     context,
//     itemSchema,
//     async (id, data) => {
//       const updatedItem = await prisma.inventoryItem.update({
//         where: { id },
//         data,
//       });
//       return {
//         message: "Item updated successfully",
//         item: updatedItem,
//       };
//     }
//   );

//   return response;
// }

// export async function PATCH(
//   request: NextRequest,
//   context: { params: { id: string } }
// ): Promise<NextResponse> {
//   const response = await handleSingleUpdateRequest(
//     request,
//     context,
//     itemSchema.partial(),
//     async (id, data) => {
//       const updatedItem = await prisma.inventoryItem.update({
//         where: { id },
//         data,
//       });
//       return {
//         message: "Item updated successfully",
//         item: updatedItem,
//       };
//     }
//   );
//   return response;
// }

// export async function DELETE(
//   request: NextRequest,
//   context: { params: { id: string } }
// ): Promise<NextResponse> {
//   const response = await handleSingleRequest(
//     request,
//     context,
//     async (id) => {
//       const item = await prisma.inventoryItem.delete({
//         where: {
//           id,
//         },
//       });
//       return { message: "Item deleted successfully", item };
//     }
//   );
//   return response;
// }











export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!params?.id) {
      return NextResponse.json({ error: "Missing or invalid ID" }, { status: 400 });
    }
    const item = await prisma.inventoryItem.findUnique({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(item, { status: 200 });
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid query parameters", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}






export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!params?.id) {
      return NextResponse.json({ error: "Missing or invalid ID" }, { status: 400 });
    }

    const requestBody = await request.json();
    const validatedData = itemSchema.safeParse(requestBody);

    if (!validatedData.success) {
      return NextResponse.json({ error: validatedData.error.format() }, { status: 400 });
    }

    const updatedItem = await prisma.inventoryItem.update({
      where: {
        id: params.id,
      },
      data: validatedData.data,
    });

    return NextResponse.json(updatedItem, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid query parameters", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};







export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!params?.id) {
      return NextResponse.json({ error: "Missing or invalid ID" }, { status: 400 });
    }
    const body = await request.json();
    const updatedItem = await prisma.inventoryItem.update({
      where: {
        id: params.id,
      },
      data: body,
    });
    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid query parameters", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};





export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!params?.id) {
      return NextResponse.json({ error: "Missing or invalid ID" }, { status: 400 });
    }
    const item = await prisma.inventoryItem.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid query parameters", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};