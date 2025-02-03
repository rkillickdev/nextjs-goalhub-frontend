"use client"

import {usePathname, useRouter, useSearchParams } from "next/navigation";

const { createContext, useContext, useState, useEffect } = require("react");
const AuthContext = createContext(null);

const LOGIN_REDIRECT_URL = "/"
const LOGOUT_REDIRECT_URL = "/login"
const LOGIN_REQUIRED_URL = "/login"
const LOCAL_STORAGE_KEY = "is-logged-in"
const LOCAL_USER_EMAIL_KEY = "user-email"

export function AuthProvider({children}) {
  const [isAuthenticated, setIsAuthenticated] =useState(false)
  const [email, setEmail] = useState("")
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const storedAuthStatus = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedAuthStatus) {
      const storedAuthStatusInt = parseInt(storedAuthStatus)
      setIsAuthenticated(storedAuthStatusInt === 1)
    }
    const storedEmail = localStorage.getItem(LOCAL_USER_EMAIL_KEY)
    if (storedEmail) {
      setEmail(storedEmail)
    }
  }, [])

  const login  = (email) => {
    setIsAuthenticated(true)
    localStorage.setItem(LOCAL_STORAGE_KEY, "1")
    if (email) {
      localStorage.setItem(LOCAL_USER_EMAIL_KEY, `${email}`)
      setEmail(email)
    } else {
      localStorage.removeItem(LOCAL_USER_EMAIL_KEY)
    }
    const nextUrl = searchParams.get("next")
    const invalidNextUrl = ['/login', '/logout']
    const nextUrlValid = nextUrl && nextUrl.startsWith("/") && !invalidNextUrl.includes(nextUrl)
    if (nextUrlValid) {
      router.replace(nextUrl)
      return
    } else {
      router.replace(LOGIN_REDIRECT_URL)
      return
    }
  }

  const logout  = () => {
    setIsAuthenticated(false)
    localStorage.setItem(LOCAL_STORAGE_KEY, "0")
    router.replace(LOGOUT_REDIRECT_URL)
  }

  const loginRequiredRedirect  = () => {
    // user is not logged in via API
    setIsAuthenticated(false)
    localStorage.setItem(LOCAL_STORAGE_KEY, "0")
    let loginWithNextUrl = `${LOGIN_REQUIRED_URL}?next=${pathname}`
    if (LOGIN_REQUIRED_URL === pathname) {
      loginWithNextUrl = `${LOGIN_REQUIRED_URL}`
    }
    router.replace(loginWithNextUrl)
  }

  return <AuthContext.Provider value={{isAuthenticated, login, logout, loginRequiredRedirect, email}}>
    {children}
  </AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}