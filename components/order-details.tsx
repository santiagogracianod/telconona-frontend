"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  User,
  MapPin,
  Calendar,
  AlertTriangle,
  FileText,
} from "lucide-react"

export function OrderDetails({ order }: { order: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalles de la orden</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Cliente */}
          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">
              Cliente
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{order.cliente.nombre}</span>
            </div>
          </div>
          {/* Dirección */}
          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">
              Dirección
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{order.cliente.direccion}</span>
            </div>
          </div>
          {/* Fecha */}
          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">
              Fecha de creación
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>
                {new Date(order.fechaCreacion).toLocaleDateString()}
              </span>
            </div>
          </div>
          {/* Estado */}
          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">
              Estado
            </div>
            <Badge className="bg-green-500">{order.estado.nombre}</Badge>
          </div>
          {/* Tipo */}
          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">
              Tipo de orden
            </div>
            <span>{order.tipo.nombre}</span>
          </div>
        </div>

        {/* Descripción */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">
            Descripción
          </div>
          <div className="flex items-start gap-2 rounded-md border p-3">
            <FileText className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <p className="text-sm">{order.descripcion}</p>
          </div>
        </div>

        {/* Notas adicionales */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">
            Notas adicionales
          </div>
          <div className="flex items-start gap-2 rounded-md border p-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <p className="text-sm">{order.tipo.descripcion}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
