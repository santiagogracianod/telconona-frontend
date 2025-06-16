"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { OrdersTable }     from "@/components/orders-table"
import { OrderFilters }    from "@/components/order-filters"
import { DashboardStats }  from "@/components/dashboard-stats"
import {
  useOrdersByUser,
  useOrdersByEstado,
} from "@/lib/services/orders-graphql"

export default function DashboardPage() {
  const [status, setStatus] = useState<"all" | string>("all")
  const userId = typeof window !== "undefined"
    ? localStorage.getItem("telconova-user")
    : ""

  // Llamamos ambos hooks **siempre** y en el mismo orden
  const userResult   = useOrdersByUser(userId)
  const estadoResult = useOrdersByEstado(status, userId)

  // Seleccionamos los valores según el filtro
  const { data, loading, error } =
    status === "all" ? userResult   : estadoResult

  const orders = data
    ? status === "all"
      ? data.obtenerOrdenesPorUsuarioId
      : data.filtrarOrdenes
    : []

  return (
    <div className="flex min-h-screen flex-col bg-telco-50/50">
      <DashboardHeader />

      <main className="flex-1 space-y-6 p-6">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-telco-800">Panel de Órdenes</h1>
          <p className="text-muted-foreground">
            Gestiona tus órdenes asignadas y actualiza su progreso
          </p>
        </div>

        <DashboardStats orders={orders} />
        <OrderFilters status={status} onStatusChange={setStatus} />

        {loading && <p>Cargando órdenes…</p>}
        {error && (
          <p className="text-red-500">
            Error: {error.message}
          </p>
        )}

        {!loading && !error && <OrdersTable orders={orders} />}
      </main>
    </div>
  )
}
