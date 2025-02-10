"use server"

import { DJANGO_API_ENDPOINT } from "@/config/defaults"
import { setRefreshToken, setToken } from "@/lib/auth"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const DJANGO_API_LOGIN_URL = `${DJANGO_API_ENDPOINT}/token/pair`

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
      const {email, access, refresh} = responseData
      console.log(email)
      setToken(access)
      setRefreshToken(refresh)
      const cookieStore = await cookies()
      const allTokens =cookieStore.getAll()
      // console.log(allTokens)
      return NextResponse.json({"loggedIn": true, "email": email}, {status: 200})
  }
  return NextResponse.json({"loggedIn": false, ...responseData}, {status: 400})
}