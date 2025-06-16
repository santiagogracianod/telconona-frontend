"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { DashboardHeader }   from "@/components/dashboard-header"
import { OrderDetails }      from "@/components/order-details"
import { OrderStatusUpdate } from "@/components/order-status-update"
import { OrderEvidence }     from "@/components/order-evidence"
import { OrderMaterials }    from "@/components/order-materials"
import { Button }            from "@/components/ui/button"
import { useParams } from "next/navigation"

import {
  useOrderById,
  useUpdateOrderStatus,
} from "@/lib/services/orders-graphql"

type PageProps = { params: { id: string } }

export default function OrderPage() {
  /* obtiene params desde el hook */
  const { id } = useParams<{ id: string }>()  // id es string

  /* 1· lee la orden */
  const { data, loading, error, refetch } = useOrderById(id)
  const order = data?.obtenerOrdenPorId

  /* 2· mutación cambio de estado */
  const [updateStatus, { loading: updating }] = useUpdateOrderStatus()

  const handleStatusUpdate = async (newStatus: string) => {
    await updateStatus({ variables: { id, estado: newStatus } })
    await refetch()
  }

  if (loading) return <p>Cargando orden…</p>
  if (error)   return <p className="text-red-500">Error: {error.message}</p>
  if (!order)  return <p>Orden no encontrada.</p>

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 space-y-6 p-6">
        {/* --- encabezado --- */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">
              <ChevronLeft className="mr-1 h-4 w-4" /> Volver
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Orden #{order.codigo}</h1>
        </div>

        {/* --- layout columnas --- */}
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
              loading={updating}
            />
            <OrderMaterials id={id} />
          </div>
        </div>
      </main>
    </div>
  )
}
