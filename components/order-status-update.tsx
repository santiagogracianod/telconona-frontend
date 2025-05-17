"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle, Clock, PauseCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function OrderStatusUpdate({ id }: { id: string }) {
  const [status, setStatus] = useState<string>("")
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Obtener el estado actual de la orden
  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const response = await fetch(
          `https://didactic-space-journey-q7vp4wrrqrwjh9w6v-8080.app.github.dev/ordenes/${id}`
        )
        if (!response.ok) {
          throw new Error("Error al obtener el estado de la orden")
        }
        const data = await response.json()
        setStatus(data.estado.nombre.toLowerCase().replace(" ", "-")) // Convertir el estado a un formato compatible
      } catch (error) {
        console.error("Error al obtener el estado de la orden:", error)
      }
    }

    fetchOrderStatus()
  }, [id])

  // Simulación de actualización de estado
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulamos una operación asíncrona
    setTimeout(() => {
      toast({
        title: "Estado actualizado",
        description: `La orden ${id} ha sido actualizada correctamente.`,
      })
      setComment("")
      setIsSubmitting(false)
    }, 1000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "paused":
        return <PauseCircle className="h-5 w-5 text-yellow-500" />
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "additional":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  return (
    <Card className="border-telco-200">
      <CardHeader className="bg-telco-500 text-white rounded-t-lg">
        <CardTitle>Actualizar estado</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Estado actual</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="border-telco-200 bg-telco-50/50">
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in-progress" className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span>En curso</span>
                  </div>
                </SelectItem>
                <SelectItem value="paused">
                  <div className="flex items-center gap-2">
                    <PauseCircle className="h-4 w-4 text-yellow-500" />
                    <span>Pausado</span>
                  </div>
                </SelectItem>
                <SelectItem value="completed">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Finalizado</span>
                  </div>
                </SelectItem>
                <SelectItem value="additional">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span>Req. adicional</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Comentario</label>
            <Textarea
              placeholder="Añade un comentario sobre el cambio de estado..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="border-telco-200 bg-telco-50/50"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon(status)}
              <span className="text-sm font-medium">
                {status === "in-progress" && "En curso"}
                {status === "paused" && "Pausado"}
                {status === "completed" && "Finalizado"}
                {status === "additional" && "Req. adicional"}
              </span>
            </div>

            <Button type="submit" disabled={isSubmitting} variant="telco">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Actualizando...
                </>
              ) : (
                "Actualizar estado"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}