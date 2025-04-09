"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    // For demo, we'll simulate authentication with hardcoded values
    try {
      setLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check against hardcoded users (in a real app, this would be a database check)
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const foundUser = users.find((u: any) => u.email === email)

      if (foundUser && foundUser.password === password) {
        const userData = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
        }

        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    try {
      setLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user already exists
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      if (users.some((u: any) => u.email === email)) {
        return false
      }

      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        password,
      }

      // Save to localStorage (in a real app, this would be saved to a database)
      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))

      // Log in the new user
      const userData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))

      return true
    } catch (error) {
      console.error("Signup error:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, loading, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

