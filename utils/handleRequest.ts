import { NextRequest, NextResponse } from "next/server";
import { z, } from "zod";
import { handleErrors } from "./errorHandler";

export async function handleRequest<T, U>(request: NextRequest, schema: z.ZodSchema<T>, handle: (parsed: T) => Promise<U>) {
  try {
    const requestBody = await request.json();
    const parsed = schema.safeParse(requestBody);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const responseBody = await handle(parsed.data);

    return NextResponse.json({ succes: true, ...responseBody }, { status: 200 });
  } catch (error) {
    return handleErrors(error);
  }
}