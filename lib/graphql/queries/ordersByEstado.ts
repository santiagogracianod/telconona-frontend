import { gql } from "@apollo/client"

/**
 * Devuelve todas las órdenes que coincidan con:
 *   - estado  (obligatorio)
 *   - usuario (obligatorio ⇒ únicamente las del técnico conectado)
 *
 * 
 */
export const OrdersByEstadoQuery = gql`
  query OrdersByEstado($estado: String!, $usuarioId: ID!) {
    filtrarOrdenes(estado: $estado, usuarioId: $usuarioId) {
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
