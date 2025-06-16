import { gql } from "@apollo/client"

export const UpdateOrderStatusMutation = gql`
  mutation UpdateOrderStatus($id: ID!, $estado: String!) {
    cambiarEstadoOrden(id: $id, estado: $estado) {
      id          # solo devuelve el id — ajusta si el backend retorna más
    }
  }
`
