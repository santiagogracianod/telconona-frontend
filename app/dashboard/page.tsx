"use client"
import { useEffect, useState } from "react";
import { fetchOrdersByUser } from "@/lib/services/orders-service";
import { DashboardHeader } from "@/components/dashboard-header";
import { OrdersTable } from "@/components/orders-table";
import { OrderFilters } from "@/components/order-filters";
import { DashboardStats } from "@/components/dashboard-stats";

export default function DashboardPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem("telconova-user");
      if (!userId) {
        console.error("No se encontró el ID del usuario en localStorage");
        return;
      }

      try {
        const data = await fetchOrdersByUser(userId);
        setOrders(data);
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
      }
    };

    fetchOrders();
  }, []);
  return (
    <div className="flex min-h-screen flex-col bg-telco-50/50">
      <DashboardHeader />
      <main className="flex-1 space-y-6 p-6">
        {/* <MockStatusBanner /> */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-telco-800">
            Panel de Órdenes
          </h1>
          <p className="text-muted-foreground">
            Gestiona tus órdenes asignadas y actualiza su progreso
          </p>
        </div>
        <DashboardStats orders={orders} />
        <OrderFilters />
        <OrdersTable orders={orders} />
      </main>
    </div>
  );
}
