/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client-prisma";
import { itemSchema } from "@/schema/validation";
import { handleGetAllRequest } from "@/utils/handleGetAllRequest";
import { handleRequest } from "@/utils/handleRequest";
import { buildItemFilters, ItemFilters } from "@/utils/filters";


interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  supplier: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const response = await handleGetAllRequest<ItemFilters, InventoryItem>(
    request,
    buildItemFilters,
    async ({ filters, sorting, offset, limit }) => {
      // Fetch filtered, sorted, paginated data
      const items = await prisma.inventoryItem.findMany({
        where: filters,
        orderBy: sorting,
        skip: offset,
        take: limit,
      });

      // Total count for pagination
      const totalItems = await prisma.inventoryItem.count({ where: filters });

      return { data: items, total: totalItems };
    }
  );

  return response;
}



export async function POST(request: NextRequest) {
  const response = await handleRequest(request, itemSchema, async (parsed) => {
    const item = await prisma.inventoryItem.create({
      data: parsed
    })
    return { message: "Item created successfully", item };
  })

  return response;
};








// export async function GET(request: NextRequest) {
//   const { search, sort, order, minQuantity, maxQuantity, page = '1', limit = '10' } = Object.fromEntries(request.nextUrl.searchParams);

//   // Convert pagination parameters
//   const pageNumber = parseInt(page, 10);
//   const limitNumber = parseInt(limit, 10);
//   const offset = (pageNumber - 1) * limitNumber;

//   // Generate filters 
//   const filters = buildItemFilters(search, minQuantity, maxQuantity);

//   // Sorting logic
//   const sorting = sort ? { [sort]: order === 'desc' ? 'desc' : 'asc' } : {};

//   try {
//     // Fetch filtered, sorted, paginated data
//     const items = await prisma.inventoryItem.findMany({
//       where: filters,
//       orderBy: sorting,
//       skip: offset,
//       take: limitNumber,
//     });

//     // Total count for pagination
//     const totalItems = await prisma.inventoryItem.count({ where: filters });

//     return NextResponse.json({
//       data: items,
//       pagination: {
//         total: totalItems,
//         page: pageNumber,
//         limit: limitNumber,
//         totalPages: Math.ceil(totalItems / limitNumber),
//       },
//     });
//   } catch (error) {
//     return handleErrors(error);
//   }
// }







// try {
//     const requestBody = await request.json();
//     const validatedData = itemSchema.safeParse(requestBody);

//     if (!validatedData.success) {
//       return NextResponse.json({ error: validatedData.error.format() }, { status: 400 });
//     }

//     const newItem = await prisma.inventoryItem.create({
//       data: validatedData.data,
//     });

//     return NextResponse.json(newItem, { status: 201 });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json({ error: "Invalid query parameters", details: error.errors }, { status: 400 });
//     }
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }

