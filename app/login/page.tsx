"use client"

import { LoginForm } from "@/components/login-form"
import { Logo } from "@/components/logo"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const expired = typeof window !== "undefined" ? searchParams.get("expired") : null;

    if (expired) {
      setMessage("Su sesión ha expirado por inactividad.")
    }
  }, [searchParams])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-telco-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Logo className="h-12 w-12" />
          <h1 className="text-2xl font-bold text-telco-800">TelcoNova</h1>
          <p className="text-sm text-muted-foreground">Ingresa a tu cuenta para gestionar órdenes</p>
        </div>
        {message && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Sesión expirada</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        <div className="bg-telco-500 text-white p-4 rounded-t-md -mx-8 -mt-8 mb-6">
          <h2 className="text-xl font-semibold text-center">Inicia sesión</h2>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}