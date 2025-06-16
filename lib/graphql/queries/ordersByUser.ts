import { gql } from "@apollo/client"

export const OrdersByUserQuery = gql`
  query OrdersByUser($userId: ID!) {
    obtenerOrdenesPorUsuarioId(usuario_id: $userId) {
      id
      codigo
      descripcion
      fechaCreacion
      cliente {
        id
        nombre
        direccion
        email
        telefono
      }
      estado { id nombre descripcion }
      tipo   { id nombre descripcion }
    }
  }
`
