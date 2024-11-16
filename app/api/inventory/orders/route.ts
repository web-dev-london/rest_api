/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client-prisma";
import { orderSchema } from "@/schema/validation";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const validatedData = orderSchema.safeParse(requestBody);

    if (!validatedData.success) {
      return NextResponse.json({ error: validatedData.error.format() }, { status: 400 });
    }

    const { quantity, inventoryItemId } = validatedData.data;

    const order = await prisma.order.create({
      data: {
        quantity,
        inventoryItemId,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid query parameters", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};


export async function GET(request: NextRequest) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        inventoryItem: true,
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid query parameters", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}