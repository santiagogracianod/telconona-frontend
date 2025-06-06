// components/auth-provider.tsx
"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { authService, type User } from "@/lib/services/auth-service"
import { useIdleTimer } from "@/hooks/use-idle-timer"

// Constante para habilitar el modo de desarrollo
const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === "true"

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
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
        console.log("DEV_MODE", DEV_MODE)

        // En modo desarrollo, podemos omitir la redirección para pruebas
        if (!DEV_MODE) {
          router.push("/login")
        }
      } else if (user && pathname === "/login") {
        router.push("/dashboard")
      }
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)

      // En modo desarrollo, aceptamos credenciales de prueba
      if (DEV_MODE) {
        console.log("Modo de desarrollo activado")

        // Aceptamos las credenciales originales o cualquier entrada en modo dev
        if (email === "tecnico@telconova.com" && password === "password") {
          const userData = {
            id: "1",
            name: "Técnico Demo",
            email: "tecnico@telconova.com",
            role: "technician",
          }

          localStorage.setItem("telconova-token", "dev-token-123")
          localStorage.setItem("telconova-user", JSON.stringify(userData))

          setUser(userData)
          router.push("/dashboard")
          return true
        }
        return false
      }

      // Código para producción con REST API
      const response = await authService.login(email, password)
      if (response && response.token) {
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