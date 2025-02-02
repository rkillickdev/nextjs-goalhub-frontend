"use server"

import { setRefreshToken, setToken } from "@/app/lib/auth"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const DJANGO_API_LOGIN_URL = "http://127.0.0.1:8001/api/token/pair"

export async function POST(request) {
  const requestData = await request.json()
  const jsonData = JSON.stringify(requestData)
  const requestOptions = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: jsonData
  }
  const response = await fetch(DJANGO_API_LOGIN_URL, requestOptions)
  const responseData = await response.json()
  if (response.ok) {
      console.log("logged in")
      const {username, access, refresh} = responseData
      // console.log(access, refresh)
      setToken(access)
      setRefreshToken(refresh)
      const cookieStore = await cookies()
      const allTokens =cookieStore.getAll()
      console.log(allTokens)
      return NextResponse.json({"loggedIn": true, "username": username}, {status: 200})
  }
  return NextResponse.json({"loggedIn": false, ...responseData}, {status: 400})
}