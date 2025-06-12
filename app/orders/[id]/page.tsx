"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import { OrderDetails } from "@/components/order-details"
import { OrderStatusUpdate } from "@/components/order-status-update"
import { OrderEvidence } from "@/components/order-evidence"
import { OrderMaterials } from "@/components/order-materials"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

type OrderPageProps = {
  params: Promise<{ id: string }>
}

export default function OrderPage({ params }: OrderPageProps) {
  const { id } = React.use(params)

  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrder = async () => {
    try {
      setLoading(true)
      setError(null)
      const { data } = await axios.get(
        `https://didactic-space-journey-q7vp4wrrqrwjh9w6v-8080.app.github.dev/ordenes/${id}`
      )
      setOrder(data)
    } catch (err: any) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.statusText ?? err.message
          : "Error inesperado"
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrder()
  }, [id])

  const handleStatusUpdate = async (newStatus: string) => {
  
    try {
      await axios.patch(
        `https://didactic-space-journey-q7vp4wrrqrwjh9w6v-8080.app.github.dev/ordenes/${id}/estado`,
        newStatus,
        { headers: { "Content-Type": "application/json" } }
      )
      await fetchOrder()
    } catch (err) {
      console.error("Error actualizando el estado", err)
    }
  }

  if (loading) return <p>Cargando orden…</p>
  if (error) return <p className="text-red-500">Error: {error}</p>
  if (!order) return <p>Orden no encontrada.</p>

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Volver
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Orden #{id}</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <OrderDetails order={order} />
            <OrderEvidence id={id} />
          </div>
          <div className="space-y-6">
            <OrderStatusUpdate
              id={id}
              currentStatus={order.estado.nombre}
              onStatusChange={handleStatusUpdate}
            />
            <OrderMaterials id={id} />
          </div>
        </div>
      </main>
    </div>
  )
}
