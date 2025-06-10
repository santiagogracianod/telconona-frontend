// components/auth-provider.tsx
"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { authService, type User } from "@/lib/services/auth-service"
import { useIdleTimer } from "@/hooks/use-idle-timer"


type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

type AuthProviderProps = Readonly<{
  children: React.ReactNode;
}>;


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Manejar el cierre de sesión por inactividad
  const handleSessionTimeout = () => {
    console.warn("Sesión expirada por inactividad.")
    localStorage.removeItem("telconova-token")
    localStorage.removeItem("telconova-user")
    setUser(null)
    router.push("/login?expired=true")
  }

  // Configurar el temporizador de inactividad (15 minutos = 900000 ms)
  useIdleTimer(3000, handleSessionTimeout)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("telconova-user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error)
        localStorage.removeItem("telconova-user") // Limpia el almacenamiento si el JSON es inválido
      }
    } else {
      setUser(null)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Protect routes
    if (!isLoading) {
      if (!user && pathname !== "/login") {
          router.push("/login")
      } else if (user && pathname === "/login") {
        router.push("/dashboard")
      }
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)

      // Código para producción con REST API
      const response = await authService.login(email, password)
      if (response?.token) {
        localStorage.setItem("telconova-token", response.token)
        localStorage.setItem("telconova-user", JSON.stringify(response.userId))

        setUser(response.userId)
        router.push("/dashboard")
        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    authService.logout()
    localStorage.removeItem("telconova-token")
    localStorage.removeItem("telconova-user")
    setUser(null)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}