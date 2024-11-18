// import { NextRequest, NextResponse } from "next/server";
// import { handleErrors } from "./errorHandler";
// import { z } from "zod";

// type UpdateItemCallback<T, U> = (id: string, data: T) => Promise<U>;

// export async function handleSingleUpdateRequest<T, U>(
//   request: NextRequest,
//   { params }: { params: { id: string } },
//   schema: z.ZodSchema<T>,
//   updateItemCallback: UpdateItemCallback<T, U>
// ): Promise<NextResponse> {
//   try {
//     const { id } = params;
//     if (!id) {
//       return NextResponse.json({ error: "Missing or invalid ID" }, { status: 400 });
//     }

//     const requestBody = await request.json();
//     const validatedData = schema.safeParse(requestBody);

//     if (!validatedData.success) {
//       return NextResponse.json({ error: validatedData.error.format() }, { status: 400 });
//     }

//     const updatedItem = await updateItemCallback(id, validatedData.data);
//     return NextResponse.json({ success: true, ...updatedItem }, { status: 200 });
//   } catch (error) {
//     return handleErrors(error);
//   }
// }
