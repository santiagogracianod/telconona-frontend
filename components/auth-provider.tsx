"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
// import { useMutation } from "@apollo/client"
// import { LOGIN } from "@/lib/graphql/mutations"

// Constante para habilitar el modo de desarrollo
const DEV_MODE = true // Cambia a false cuando el backend esté listo

type User = {
  id: string
  name: string
  email: string
  role: string
}

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

  // Comentamos temporalmente la mutación de Apollo
  // const [loginMutation] = useMutation(LOGIN)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("telconova-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Protect routes
    if (!isLoading) {
      if (!user && pathname !== "/login") {
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

      // Código para producción con GraphQL (comentado temporalmente)
      /*
      const { data } = await loginMutation({
        variables: { email, password },
      })

      if (data?.login) {
        const { token, user: userData } = data.login

        localStorage.setItem("telconova-token", token)
        localStorage.setItem("telconova-user", JSON.stringify(userData))

        setUser(userData)
        router.push("/dashboard")
        return true
      }
      */

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("telconova-token")
    localStorage.removeItem("telconova-user")
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
