import { NextResponse } from "next/server";
import prisma from "@/prisma/client-prisma";
import { z } from "zod";
import { restaurantSchema } from "@/schema/schemas";


export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  try {
    const restaurant = await prisma.restaurant.findUnique({ where: { id } });
    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }
    return NextResponse.json(restaurant, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid query parameters", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const body = await req.json();
    const validatedData = restaurantSchema.parse(body);

    const updatedRestaurant = await prisma.restaurant.update({
      where: { id },
      data: validatedData || null
    })
    return NextResponse.json(updatedRestaurant, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid query parameters", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const body = await req.json();
    const validatedData = restaurantSchema.partial().parse(body);

    const updatedRestaurant = await prisma.restaurant.update({
      where: { id },
      data: validatedData || null
    })
    return NextResponse.json(updatedRestaurant, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid query parameters", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  try {
    const deletedRestaurant = await prisma.restaurant.delete({ where: { id } });
    return NextResponse.json(deletedRestaurant, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid query parameters", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}