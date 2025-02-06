import { getToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import APIProxy from "../proxy";

const DJANGO_API_TEAMS_URL="http://127.0.0.1:8001/api/teams/"

export async function GET(request){
  const response = await APIProxy.get(DJANGO_API_TEAMS_URL, true)
  const result = await response.json()
  let status = response.status
  return NextResponse.json(result, {status: status})
}

export async function POST(request) {
  const requestData = await request.json()
  const response = await APIProxy.post(DJANGO_API_TEAMS_URL, requestData, true)
  try {
    await response.json()
  } catch(error) {
    return NextResponse.json({message: "Invalid request"}, {status: response.status})
  }
  if (response.ok) {
      // const cookieStore = await cookies()
      // const allTokens =cookieStore.getAll()
      return NextResponse.json({}, {status: 200})
  }
  return NextResponse.json({}, {status: 400})
}