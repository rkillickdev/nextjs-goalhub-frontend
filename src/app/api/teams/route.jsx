import { getToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const TOKEN_NAME = 'auth-token'

const DJANGO_API_TEAMS_URL="http://127.0.0.1:8001/api/teams/"

export async function GET(request){
  const cookieStore = await cookies()
  const myAuthToken  = cookieStore.get(TOKEN_NAME)
  const token = myAuthToken?.value
  if (!token) {
    console.log('could not get token')
    return NextResponse.json({}, {status: 401})
  }

  const options  = {
    method: "GET",
    headers:  {
      "Content-Type" : "application/json",
      "Accept" : "application/json",
      "Authorization" :  `Bearer ${token}`
    }
  }
  // console.log(options)
  const response = await fetch(DJANGO_API_TEAMS_URL, options)
  // console.log(response)
  const result = await response.json()
  let status = 200
  if (!response.ok) {
    status = 401
    // return NextResponse.json({...result}, {status: 401})
  }

  return NextResponse.json({...result}, {status: status})
}

export async function POST(request) {
  const requestData = await request.json()
  const jsonData = JSON.stringify(requestData)
  let headers = {
    "Content-Type" : "application/json",
    "Accept" : "application/json",
  }
  const cookieStore = await cookies()
  const myAuthToken  = cookieStore.get(TOKEN_NAME)
  const token = myAuthToken?.value
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }
  const requestOptions = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: jsonData
  }
  const response = await fetch(DJANGO_API_TEAMS_URL, requestOptions)
  console.log(response.status)
  try {
    const responseData = await response.json()
    console.log(responseData)
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