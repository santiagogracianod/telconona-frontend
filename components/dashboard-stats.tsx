"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, CheckCircle, AlertCircle, PauseCircle } from "lucide-react"

type DashboardStatsProps = Readonly<{ orders: any[] }>

export function DashboardStats({ orders }: DashboardStatsProps) {
  console.log("DashboardStats rendered with orders:", orders)

  /* helper para no repetir lógica */
  const count = (estadoId: number) =>
    orders.filter(o => Number(o?.estado?.id) === estadoId).length

  const stats = [
    { title: "Asignada",                value: count(1), icon: Clock,
      color: "text-blue-500",  bg: "bg-blue-100" },
    { title: "En proceso",              value: count(2), icon: PauseCircle,
      color: "text-yellow-500", bg: "bg-yellow-100" },
    { title: "Cerradas",                value: count(3), icon: CheckCircle,
      color: "text-green-500", bg: "bg-green-100" },
    { title: "Requerimientos adicionales", value: count(4), icon: AlertCircle,
      color: "text-red-500",   bg: "bg-red-100" },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map(s => (
        <Card key={s.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{s.title}</CardTitle>
            <div className={`${s.bg} ${s.color} rounded-full p-2`}>
              <s.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{s.value}</div>
            <p className="text-xs text-muted-foreground">Órdenes asignadas</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
