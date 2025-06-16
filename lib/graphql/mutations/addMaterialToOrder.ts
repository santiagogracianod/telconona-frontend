import { gql } from "@apollo/client"

/**
 * Registra un material en una orden.
 * El backend ahora exige un único argumento 'input'.
 */
export const AddMaterialToOrderMutation = gql`
  mutation AddMaterialToOrder($input: RegistrarMaterialOrdenInput!) {
    registrarMaterialOrden(input: $input) {
      id          # id del registro material-orden
      cantidad
      material {
        id
        nombre
        codigo
      }
    }
  }
`
