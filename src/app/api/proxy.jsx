import { NextResponse } from "next/server"

export default class APIProxy {

  static async getHeaders(requireAuth) {
    let headers = {
      "Content-Type" : "application/json",
      "Accept" : "application/json",
    }
    const cookieStore = await cookies()
    const myAuthToken  = cookieStore.get(TOKEN_NAME)
    const token = myAuthToken?.value
    if (token && requireAuth) {
      headers["Authorization"] = `Bearer ${token}`
    }
    return headers
  }

  static async post(endpoint, object, requireAuth) {
    const jsonData = JSON.stringify(object)
    const headers = await APIProxy.getHeaders(requireAuth)
    const requestOptions = {
        method: "POST",
        headers: headers,
        body: jsonData
    }
    return await fetch(endpoint, requestOptions)
  }

  static async get(endpoint, requireAuth) {
    const headers = await APIProxy.getHeaders(requireAuth)
    const requestOptions = {
        method: "GET",
        headers: headers
    }
    return await fetch(endpoint, requestOptions)
  }
}