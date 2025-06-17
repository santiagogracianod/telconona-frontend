// app/error.tsx         (o en /src/app si usas esa carpeta)
"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // opcional: registra el error en tu sistema de logging
    console.error(error)
  }, [error])

  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-background">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold">¡Algo salió mal! 😟</h2>
          <p className="text-muted-foreground">
            {error.message || "Ha ocurrido un error inesperado."}
          </p>

          <Button onClick={() => reset()}>Reintentar</Button>
        </div>
      </body>
    </html>
  )
}
