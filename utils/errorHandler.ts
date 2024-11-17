
import { NextResponse } from "next/server";
import { ZodError } from "zod";


export function handleErrors(error: unknown): NextResponse {
  if (!(error instanceof Error)) {
    console.error("Invalid error:", error);
    const responseBody = {
      success: false,
      message: "Invalid error",
    };
    return NextResponse.json(responseBody, { status: 400 });
  }
  if (error instanceof ZodError) {
    const responseBody = {
      success: false,
      message: error.issues
    }
    return NextResponse.json(responseBody, { status: 400 });
  }

  if (error instanceof Error) {
    const responseBody = {
      success: false,
      message: error.message
    }
    return NextResponse.json(responseBody, { status: 400 });
  }


  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}