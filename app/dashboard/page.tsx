// src/app/dashboard/page.tsx   (o src/pages/dashboard.tsx según tu estructura)
"use client";

import { useState, useEffect } from "react";
import { fetchOrdersByUser, fetchOrdersByFilter } from "@/lib/services/orders-service";
import { DashboardHeader } from "@/components/dashboard-header";
import { OrdersTable } from "@/components/orders-table";
import { OrderFilters } from "@/components/order-filters";
import { DashboardStats } from "@/components/dashboard-stats";

export default function DashboardPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [status, setStatus] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem("telconova-user");
      if (!userId) return console.error("Sin ID de usuario");

      setLoading(true);
      setError(null);

      try {
        const data =
          status === "all"
            ? await fetchOrdersByUser(userId)
            : await fetchOrdersByFilter(status);

        setOrders(data);
      } catch (err: any) {
        setError(err.response?.statusText || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [status]);

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

        {/* Aquí el filtro pasa status y la función para cambiarlo */}
        <OrderFilters status={status} onStatusChange={setStatus} />

        {loading && <p>Cargando órdenes…</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && <OrdersTable orders={orders} />}
      </main>
    </div>
  );
}
