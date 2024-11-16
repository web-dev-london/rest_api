/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client-prisma";
import { inventoryItemSchema } from "@/schema/validation";
import { z } from "zod";


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
    const validatedData = inventoryItemSchema.safeParse(requestBody);

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
}