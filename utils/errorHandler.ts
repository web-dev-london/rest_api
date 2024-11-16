import { NextResponse } from "next/server";
import { z } from "zod";

export function handleErrors(error: unknown) {
  if (error instanceof z.ZodError) {
    return NextResponse.json({ error: "Invalid query parameters", details: error.errors }, { status: 400 });
  }
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}