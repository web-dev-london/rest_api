/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client-prisma";
import { orderSchema } from "@/schema/validation";
import { buildOrderFilters } from "@/utils/filters";
import { handleErrors } from "@/utils/errorHandler";
import { handleRequest } from "@/utils/handleRequest";



export async function GET(request: NextRequest) {
  const { sort, order, itemId, startDate, endDate, page = '1', limit = '10' } = Object.fromEntries(request.nextUrl.searchParams);

  // Convert pagination parameters
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const offset = (pageNumber - 1) * limitNumber;

  // Generate filters 
  const filters = buildOrderFilters(itemId, startDate, endDate);

  // Sorting logic
  const sorting = sort ? { [sort]: order === 'desc' ? 'desc' : 'asc' } : {};

  try {
    // Fetch filtered, sorted, paginated data
    const orders = await prisma.order.findMany({
      where: filters,
      orderBy: sorting,
      skip: offset,
      take: limitNumber,
      include: {
        inventoryItem: true,
      },
    });

    // Total count for pagination
    const totalOrders = await prisma.order.count({ where: filters });

    return NextResponse.json({
      data: orders,
      pagination: {
        total: totalOrders,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(totalOrders / limitNumber),
      },
    });
  } catch (error) {
    return handleErrors(error);
  }
}



export async function POST(request: NextRequest) {
  const response = await handleRequest(request, orderSchema, async (parsed) => {
    const { quantity, inventoryItemId } = parsed;
    const order = await prisma.order.create({
      data: {
        quantity,
        inventoryItemId,
      },
    });
    return { message: "Order created successfully", order };
  });

  return response;
};








/* 

const { quantity, inventoryItemId } = validatedData.data;

    const order = await prisma.order.create({
      data: {
        quantity,
        inventoryItemId,
      },
    });

    return NextResponse.json(order, { status: 201 });

 */