"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("authToken")
      const userData = sessionStorage.getItem("userData")

      if (token && userData) {
        setUser(JSON.parse(userData))
        setIsAuthenticated(true)
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Simulate API call
      const mockUser = {
        id: 1,
        name: "John Doe",
        email: email,
        avatar: null,
      }

      const mockToken = "mock-jwt-token-" + Date.now()

      if (typeof window !== "undefined") {
        sessionStorage.setItem("authToken", mockToken)
        sessionStorage.setItem("userData", JSON.stringify(mockUser))
      }

      setUser(mockUser)
      setIsAuthenticated(true)

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const signup = async (name, email, password) => {
    try {
      // Simulate API call
      const mockUser = {
        id: Date.now(),
        name: name,
        email: email,
        avatar: null,
      }

      const mockToken = "mock-jwt-token-" + Date.now()

      if (typeof window !== "undefined") {
        sessionStorage.setItem("authToken", mockToken)
        sessionStorage.setItem("userData", JSON.stringify(mockUser))
      }

      setUser(mockUser)
      setIsAuthenticated(true)

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("authToken")
      sessionStorage.removeItem("userData")
    }
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
