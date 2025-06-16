"use client"

import { useQuery,useMutation } from "@apollo/client"
import { OrdersByUserQuery }   from "@/lib/graphql/queries/ordersByUser"
import { OrdersByEstadoQuery } from "@/lib/graphql/queries/ordersByEstado"
import { OrderByIdQuery }             from "@/lib/graphql/queries/orderById"
import { UpdateOrderStatusMutation }  from "@/lib/graphql/mutations/updateOrderStatus"


export function useOrdersByUser(userId: string) {
  return useQuery(OrdersByUserQuery, { variables: { userId } })
}

export function useOrdersByEstado(estado: string) {
  return useQuery(OrdersByEstadoQuery, { variables: { estado } })
}


export function useOrderById(id: string) {
  return useQuery(OrderByIdQuery, { variables: { id } })
}

export function useUpdateOrderStatus() {
  return useMutation(UpdateOrderStatusMutation) 
}