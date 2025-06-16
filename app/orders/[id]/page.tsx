"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import { DashboardHeader }   from "@/components/dashboard-header"
import { OrderDetails }      from "@/components/order-details"
import { OrderStatusUpdate } from "@/components/order-status-update"
import { OrderEvidence }     from "@/components/order-evidence"
import { OrderMaterials }    from "@/components/order-materials"
import { Button }            from "@/components/ui/button"

import {
  useOrderById,
  useUpdateOrderStatus,
} from "@/lib/services/orders-graphql"

/* -------------------------------------------------------------------------- */

export default function OrderPage() {
  /* ------------- obtener id de la URL ------------- */
  const { id } = useParams<{ id: string }>()           // “5”, “12”, …

  /* ------------- query: detalle de la orden ------------- */
  const { data, loading, error, refetch } = useOrderById(id)
  const order = data?.obtenerOrdenPorId

  /* ------------- estado “solo lectura” ------------- */
  const isReadonly = order?.estado?.nombre === "Finalizada"

  /* ------------- mutación: cambio de estado ------------- */
  const [ updateStatus, { loading: updating }] = useUpdateOrderStatus()

  const handleStatusUpdate = async (newStatus: string) => {
    if (isReadonly) return      // protección extra
    await updateStatus({ variables: { id, estado: newStatus } })
    await refetch()             // refresca la orden
  }

  /* ------------- estados de carga / error ------------- */
  if (loading)   return <p className="p-6">Cargando orden…</p>
  if (error)     return <p className="p-6 text-red-500">Error: {error.message}</p>
  if (!order)    return <p className="p-6">Orden no encontrada.</p>

  /* ---------------------------------------------------------------------- */

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 container mx-auto space-y-6 py-6">
        {/* ---------- encabezado ---------- */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">
              <ChevronLeft className="mr-1 h-4 w-4" /> Volver
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Orden #{order.codigo}</h1>
        </div>

        {/* ---------- columnas ---------- */}
        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          {/* ----------- izquierda ----------- */}
          <div className="space-y-6">
            <OrderDetails order={order} />

            <OrderEvidence
              id={id}
              readonly={isReadonly}
            />
          </div>

          {/* ----------- derecha ----------- */}
          <div className="space-y-6">
            {!isReadonly && (
              <OrderStatusUpdate
                id={id}
                currentStatus={order.estado.nombre}
                onStatusChange={handleStatusUpdate}
                loading={updating}
              />
            )}

            <OrderMaterials
              id={id}
              readonly={isReadonly}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
