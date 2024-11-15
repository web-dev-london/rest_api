import { NextResponse } from "next/server";
import prisma from "@/prisma/client-prisma";
import { z } from "zod";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: id,
      },
    });

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    return NextResponse.json(restaurant);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid query parameters", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}