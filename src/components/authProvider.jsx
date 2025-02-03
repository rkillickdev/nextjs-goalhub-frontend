"use client"

import { usePathname, useRouter } from "next/navigation";

const { createContext, useContext, useState, useEffect } = require("react");
const AuthContext = createContext(null);

const LOGIN_REDIRECT_URL = "/"
const LOGOUT_REDIRECT_URL = "/logout"
const LOGIN_REQUIRED_URL = "/login"
const LOCAL_STORAGE_KEY = "is-logged-in"

export function AuthProvider({children}) {
  const [isAuthenticated, setIsAuthenticated] =useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const storedAuthStatus = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedAuthStatus) {
      const storedAuthStatusInt = parseInt(storedAuthStatus)
      setIsAuthenticated(storedAuthStatusInt === 1)
    }
  }, [])

  const login  = () => {
    setIsAuthenticated(true)
    localStorage.setItem(LOCAL_STORAGE_KEY, "1")
    router.replace(LOGIN_REDIRECT_URL)
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
    router.replace(LOGIN_REQUIRED_URL)
  }

  return <AuthContext.Provider value={{isAuthenticated, login, logout, loginRequiredRedirect}}>
    {children}
  </AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}