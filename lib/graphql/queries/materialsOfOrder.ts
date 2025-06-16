import { gql } from "@apollo/client"

export const MaterialsOfOrderQuery = gql`
  query MaterialsOfOrder($ordenId: ID!) {
    obtenerMaterialesDeOrden(ordenId: $ordenId) {
      id
      cantidad
      material { id nombre codigo }
    }
  }
`
