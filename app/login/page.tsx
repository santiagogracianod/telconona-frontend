"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { LoginForm } from "@/components/login-form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Componente que utiliza useSearchParams
function LoginContent() {
  const searchParams = useSearchParams()
  const [message, setMessage] = useState<string | null>(null)
  
  useEffect(() => {
    const expired = searchParams.get("expired")
    if (expired) {
      setMessage("Su sesión ha expirado por inactividad.")
    }
  }, [searchParams])
  
  return (
    <>
      {message && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Sesión expirada</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      <LoginForm />
    </>
  )
}

// Componente de fallback mientras se carga
function LoginFallback() {
  return (
    <>
      <LoginForm />
    </>
  )
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-telco-800">TelcoNova</h1>
        <p className="text-sm text-muted-foreground">Ingresa a tu cuenta para gestionar órdenes</p>
        
        <Suspense fallback={<LoginFallback />}>
          <LoginContent />
        </Suspense>
      </div>
    </div>
  )
}