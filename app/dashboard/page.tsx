import { DashboardHeader } from "@/components/dashboard-header"
import { OrdersTable } from "@/components/orders-table"
import { OrderFilters } from "@/components/order-filters"
import { DashboardStats } from "@/components/dashboard-stats"
import { MockStatusBanner } from "@/components/mock-status-banner"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-telco-50/50">
      <DashboardHeader />
      <main className="flex-1 space-y-6 p-6">
        {/* <MockStatusBanner /> */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-telco-800">Panel de Órdenes</h1>
          <p className="text-muted-foreground">Gestiona tus órdenes asignadas y actualiza su progreso</p>
        </div>
        <DashboardStats />
        <OrderFilters />
        <OrdersTable />
      </main>
    </div>
  )
}
