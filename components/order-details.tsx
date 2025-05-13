"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { User, MapPin, Calendar, Clock, AlertTriangle, Phone, Mail, FileText } from "lucide-react"

// Datos de ejemplo - en una aplicación real, estos vendrían de una API
const getOrderDetails = (id: string) => {
  return {
    id,
    client: "Empresa ABC",
    address: "Av. Principal 123, Ciudad",
    status: "in-progress",
    priority: "high",
    progress: 45,
    date: "2023-05-10",
    scheduledTime: "10:00 - 12:00",
    contactName: "Juan Pérez",
    contactPhone: "+1234567890",
    contactEmail: "juan@empresaabc.com",
    description:
      "Instalación de fibra óptica y configuración de router para servicio de internet de alta velocidad. Cliente requiere conexión en 3 puntos diferentes del local.",
    notes:
      "El cliente ha solicitado que se realice la instalación con la menor interrupción posible a sus operaciones diarias.",
  }
}

export function OrderDetails({ id }: { id: string }) {
  const order = getOrderDetails(id)

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
              <span>{order.client}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">Dirección</div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{order.address}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">Fecha</div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{order.date}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">Horario</div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{order.scheduledTime}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">Prioridad</div>
            <div>
              <Badge className="bg-red-500">Alta</Badge>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">Progreso</div>
            <div className="flex items-center gap-2">
              <Progress value={order.progress} className="h-2 w-[100px]" />
              <span className="text-xs">{order.progress}%</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">Contacto</div>
          <div className="grid gap-2 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{order.contactName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{order.contactPhone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{order.contactEmail}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">Descripción</div>
          <div className="flex items-start gap-2 rounded-md border p-3">
            <FileText className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <p className="text-sm">{order.description}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">Notas adicionales</div>
          <div className="flex items-start gap-2 rounded-md border p-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <p className="text-sm">{order.notes}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
