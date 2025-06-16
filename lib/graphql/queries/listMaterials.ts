import { gql } from "@apollo/client"

export const ListMaterialsQuery = gql`
  query ListMaterials {
    listarMateriales {
      id
      nombre
      codigo
      stock
    }
  }
`
