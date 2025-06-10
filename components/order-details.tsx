"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, MapPin, Calendar, AlertTriangle, FileText } from "lucide-react"

type OrderDetailsProps = Readonly<{
  id: string;
}>;


export function OrderDetails({ id }: OrderDetailsProps) {
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await axios.get(
          `https://didactic-space-journey-q7vp4wrrqrwjh9w6v-8080.app.github.dev/ordenes/${id}`
        )
        setOrder(response.data)
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.statusText ?? err.message)
        } else {
          setError("Error inesperado al obtener los detalles de la orden")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [id])

  if (loading) {
    return <p>Cargando detalles de la orden...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  if (!order) {
    return <p>No se encontraron detalles para esta orden.</p>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalles de la orden</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">Cliente</div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{order.cliente.nombre}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">Dirección</div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{order.cliente.direccion}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">Fecha de creación</div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{new Date(order.fechaCreacion).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">Estado</div>
            <div>
              <Badge className="bg-green-500">{order.estado.nombre}</Badge>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">Tipo de orden</div>
            <div>
              <span>{order.tipo.nombre}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">Descripción</div>
          <div className="flex items-start gap-2 rounded-md border p-3">
            <FileText className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <p className="text-sm">{order.descripcion}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">Notas adicionales</div>
          <div className="flex items-start gap-2 rounded-md border p-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <p className="text-sm">{order.tipo.descripcion}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}