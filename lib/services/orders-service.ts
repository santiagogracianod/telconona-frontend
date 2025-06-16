// src/lib/services/orders-service.ts
import axios from "axios";

const API_BASE = "https://didactic-space-journey-q7vp4wrrqrwjh9w6v-8080.app.github.dev";

export const fetchOrdersByUser = async (userId: string) => {
  const response = await axios.get(
    `${API_BASE}/ordenes/usuario/${userId}`,
    { headers: { accept: "*/*" } }
  );
  return response.data;
};

/**
 * Si status === "all" devuelve todas las órdenes,
 * de lo contrario aplica el filtro por estado.
 */
export const fetchOrdersByFilter = async (status: string) => {
  const url =
    status === "all"
      ? `${API_BASE}/ordenes`
      : `${API_BASE}/ordenes/filtro?estado=${encodeURIComponent(status)}`;
  const response = await axios.get(url, { headers: { accept: "*/*" } });
  return response.data;
};

