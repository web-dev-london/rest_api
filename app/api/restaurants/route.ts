
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client-prisma";
import { z } from "zod";

const querySchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
});


const restaurantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  description: z.string().optional(),
});


export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url);
    const parsed = querySchema.parse(requestUrl.searchParams);

    const restaurants = await prisma.restaurant.findMany({
      where: parsed
    });
    return NextResponse.json(restaurants, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid query parameters", details: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to fetch restaurants" },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = restaurantSchema.parse(body);

    const newRestaurant = await prisma.restaurant.create({
      data: validatedData,
    });

    return NextResponse.json({ success: true, restaurant: newRestaurant }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }

    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

