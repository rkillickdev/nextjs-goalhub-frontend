import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const TOKEN_NAME = 'auth-token'

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

  static async handleFetch(endpoint, requestOptions) {
    let data = {}
    let status = 500
    try {
      const response = await fetch(endpoint, requestOptions)
      data = await response.json()
      status = response.status
    } catch (error) {
      data = {message: "Cannot reach API server", error: error}
      status = 500
    }
    return {data, status}
  }

  static async post(endpoint, object, requireAuth) {
    const jsonData = JSON.stringify(object)
    const headers = await APIProxy.getHeaders(requireAuth)
    const requestOptions = {
        method: "POST",
        headers: headers,
        body: jsonData
    }
    return await APIProxy.handleFetch(endpoint, requestOptions)
  }

  static async get(endpoint, requireAuth) {
    const headers = await APIProxy.getHeaders(requireAuth)
    const requestOptions = {
        method: "GET",
        headers: headers
    }
    return await APIProxy.handleFetch(endpoint, requestOptions)
  }
}