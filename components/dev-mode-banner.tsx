"use client"

import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Constante para habilitar el modo de desarrollo (debe coincidir con auth-provider.tsx)
const DEV_MODE = true

export function DevModeBanner() {
  if (!DEV_MODE) return null

  return (
    <Alert variant="warning" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Modo de desarrollo activo</AlertTitle>
      <AlertDescription>
        Estás utilizando una versión de demostración sin conexión al backend. Los datos mostrados son de ejemplo y no se
        guardarán los cambios.
      </AlertDescription>
    </Alert>
  )
}
