import { gql } from "@apollo/client"

export const OrderByIdQuery = gql`
  query OrderById($id: ID!) {
    obtenerOrdenPorId(id: $id) {
      id
      codigo
      descripcion
      fechaCreacion
      fechaCierre
      cliente {
        id
        nombre
        direccion
        email
        telefono
      }
      estado  { id nombre descripcion }
      tipo    { id nombre descripcion }
    }
  }
`
