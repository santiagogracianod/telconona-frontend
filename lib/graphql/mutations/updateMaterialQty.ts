import { gql } from "@apollo/client"

export const UpdateMaterialQtyMutation = gql`
  mutation UpdateMaterialQty($input: ModificarCantidadMaterialInput!) {
    modificarCantidadMaterial(input: $input) {
      id
      cantidad
      material { nombre }
    }
  }
`
