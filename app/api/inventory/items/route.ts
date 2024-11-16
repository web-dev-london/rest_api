/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client-prisma";
import { inventoryItemSchema } from "@/schema/validation";
import { z } from "zod";


export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const validatedData = inventoryItemSchema.safeParse(requestBody);

    if (!validatedData.success) {
      return NextResponse.json({ error: validatedData.error.format() }, { status: 400 });
    }

    const newItem = await prisma.inventoryItem.create({
      data: validatedData.data,
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid query parameters", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const items = await prisma.inventoryItem.findMany();
    return NextResponse.json(items);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid query parameters", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

