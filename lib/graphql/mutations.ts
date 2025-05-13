import { gql } from "@apollo/client"

// Mutación para iniciar sesión
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        role
      }
    }
  }
`

// Mutación para actualizar el estado de una orden
export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($id: ID!, $status: String!, $progress: Int, $comment: String) {
    updateOrderStatus(id: $id, status: $status, progress: $progress, comment: $comment) {
      id
      status
      progress
      history {
        id
        date
        status
        comment
      }
    }
  }
`

// Mutación para añadir evidencia a una orden
export const ADD_ORDER_EVIDENCE = gql`
  mutation AddOrderEvidence($orderId: ID!, $comment: String!, $images: [Upload!]) {
    addOrderEvidence(orderId: $orderId, comment: $comment, images: $images) {
      id
      evidence {
        id
        date
        comment
        imageUrl
      }
    }
  }
`
