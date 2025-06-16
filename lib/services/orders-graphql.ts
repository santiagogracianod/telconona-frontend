"use client"

import { useQuery, useMutation } from "@apollo/client"

import { OrdersByUserQuery }        from "@/lib/graphql/queries/ordersByUser"
import { OrdersByEstadoQuery }      from "@/lib/graphql/queries/ordersByEstado"
import { OrderByIdQuery }           from "@/lib/graphql/queries/orderById"
import { UpdateOrderStatusMutation } from "@/lib/graphql/mutations/updateOrderStatus"

/* ─────── Listar órdenes por usuario (sin cambios) ─────── */
export function useOrdersByUser(userId: string) {
  return useQuery(OrdersByUserQuery, { variables: { userId } })
}

/* ─────── Listar órdenes por estado + usuario ─────── */
export function useOrdersByEstado(
  estado:    string,
  usuarioId: string,   // ← nuevo parámetro
) {
  return useQuery(OrdersByEstadoQuery, {
    variables: { estado, usuarioId },
  })
}

/* ─────── Obtener orden por ID (sin cambios) ─────── */
export function useOrderById(id: string) {
  return useQuery(OrderByIdQuery, { variables: { id } })
}

/* ─────── Mutación para actualizar estado (sin cambios) ─────── */
export function useUpdateOrderStatus() {
  return useMutation(UpdateOrderStatusMutation)
}
