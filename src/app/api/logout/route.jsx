import { deleteTokens } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function  POST(request) {
  deleteTokens()
  const cookieStore = await cookies()
  const allTokens = cookieStore.getAll()
  console.log(allTokens)
  return NextResponse.json({}, {status: 200})
}