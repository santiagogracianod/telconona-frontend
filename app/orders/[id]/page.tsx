import { OrderDetails } from "@/components/order-details"
import { OrderStatusUpdate } from "@/components/order-status-update"
import { OrderEvidence } from "@/components/order-evidence"
import { OrderMaterials } from "@/components/order-materials" // Importa el nuevo componente
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

type OrderPageProps = Readonly<{
  params: {
    id: string;
  };
}>;


export default function OrderPage( { params }: OrderPageProps) {
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
          <h1 className="text-2xl font-bold">Orden #{params.id}</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <OrderDetails id={params.id} />
            <OrderEvidence id={params.id} />
          </div>
          <div>
            <OrderStatusUpdate id={params.id} />
            <OrderMaterials id={params.id} />
          </div>
        </div>
      </main>
    </div>
  )
}


