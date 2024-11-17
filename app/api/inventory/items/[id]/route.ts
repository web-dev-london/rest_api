/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client-prisma";
import { itemSchema } from "@/schema/validation";
import { handleSingleRequest } from "@/utils/handleSingleRequest";
import { z } from "zod";



export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse> {
  const response = await handleSingleRequest(
    request,
    context,
    async (id) => {
      const item = await prisma.inventoryItem.findUnique({
        where: {
          id,
        },
      });
      return { message: "Item fetched successfully", item };
    }
  );
  return response;
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






/* 

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


*/