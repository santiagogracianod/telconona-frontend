"use client"

import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function MockStatusBanner() {
  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV !== "development") return null

  return (
    <Alert variant="warning" className="mb-4 border-telco-300 bg-telco-50">
      <AlertCircle className="h-4 w-4 text-telco-500" />
      <AlertTitle className="text-telco-700">Modo de desarrollo</AlertTitle>
      <AlertDescription className="text-telco-600">
        Estás utilizando datos de ejemplo. Las credenciales de acceso son:{" "}
        <strong>tecnico@telconova.com / password</strong>
      </AlertDescription>
    </Alert>
  )
}
