import { gql } from "@apollo/client"

export const OrdersByEstadoQuery = gql`
  query OrdersByEstado($estado: String!) {
    filtrarOrdenes(estado: $estado) {
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
