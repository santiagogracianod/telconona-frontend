"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, CheckCircle, AlertCircle, PauseCircle } from "lucide-react"

export function DashboardStats({ orders }: { orders: any[] }) {
  const stats = [
    {
      title: "Asignada",
      value: orders.filter((order) => order.estado.id === 1).length,
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "En proceso",
      value: orders.filter((order) => order.estado.id === 2).length,
      icon: PauseCircle,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Cerradas",
      value: orders.filter((order) => order.estado.id === 3).length,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "Requerimientos adicionales",
      value: orders.filter((order) => order.estado.id === 4).length,
      icon: AlertCircle,
      color: "text-red-500",
      bgColor: "bg-red-100",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`${stat.bgColor} ${stat.color} rounded-full p-2`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">Órdenes asignadas</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
