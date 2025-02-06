import { getToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import APIProxy from "../proxy";

const DJANGO_API_TEAMS_URL="http://127.0.0.1:8001/api/teams/"

export async function GET(request){
  const {data, status} = await APIProxy.get(DJANGO_API_TEAMS_URL, true)
  return NextResponse.json(data, {status: status})
}

export async function POST(request) {
  const requestData = await request.json()
  const {data, status} = await APIProxy.post(DJANGO_API_TEAMS_URL, requestData, true)
  return NextResponse.json(data, {status: status})
}