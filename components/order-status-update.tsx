"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Loader2,
  CheckCircle,
  Clock,
  PauseCircle,
  AlertCircle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type OrderStatusProps = {
  id: string
  currentStatus: string
  onStatusChange: (newStatus: string) => void
}

export function OrderStatusUpdate({
  id,
  currentStatus,
  onStatusChange,
}: OrderStatusProps) {
  const [status, setStatus] = useState<string>(currentStatus)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setStatus(currentStatus)
  }, [currentStatus])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onStatusChange(status)
      toast({
        title: "Estado actualizado",
        description: `La orden ${id} ha sido actualizada.`,
      })
    } catch (err) {
      console.error("Error al actualizar estado:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const iconByStatus = {
    "En curso": <Clock className="h-5 w-5 text-blue-500" />,
    "Pausada": <PauseCircle className="h-5 w-5 text-yellow-500" />,
    "Finalizada": <CheckCircle className="h-5 w-5 text-green-500" />,
    "Requiere aprobacion adicional": (
      <AlertCircle className="h-5 w-5 text-red-500" />
    ),
  }

  return (
    <Card className="border-telco-200">
      <CardHeader className="bg-telco-500 text-white rounded-t-lg">
        <CardTitle>Actualizar estado</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="estado-select"
              className="text-sm font-medium"
            >
              Estado actual
            </label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger
                id="estado-select"
                className="border-telco-200 bg-telco-50/50"
              >
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(iconByStatus).map((label) => (
                  <SelectItem key={label} value={label}>
                    <div className="flex items-center gap-2">
                      {iconByStatus[label as keyof typeof iconByStatus]}
                      <span>{label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="telco"
            >
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
