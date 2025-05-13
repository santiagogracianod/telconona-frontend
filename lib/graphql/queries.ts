import { gql } from "@apollo/client"

// Fragmento para los datos comunes de órdenes
export const ORDER_FRAGMENT = gql`
  fragment OrderFields on Order {
    id
    client
    description
    address
    status
    priority
    progress
    assignedDate
    scheduledTime
    contactName
    contactPhone
    contactEmail
    notes
  }
`

// Consulta para obtener todas las órdenes asignadas al técnico
export const GET_ASSIGNED_ORDERS = gql`
  query GetAssignedOrders($status: String, $priority: String, $search: String) {
    assignedOrders(status: $status, priority: $priority, search: $search) {
      ...OrderFields
    }
  }
  ${ORDER_FRAGMENT}
`

// Consulta para obtener una orden específica por ID
export const GET_ORDER_BY_ID = gql`
  query GetOrderById($id: ID!) {
    order(id: $id) {
      ...OrderFields
      fullDescription
      history {
        id
        date
        status
        comment
        user {
          id
          name
        }
      }
      evidence {
        id
        date
        comment
        imageUrl
        user {
          id
          name
        }
      }
    }
  }
  ${ORDER_FRAGMENT}
`

// Consulta para obtener estadísticas de órdenes
export const GET_ORDER_STATS = gql`
  query GetOrderStats {
    orderStats {
      inProgress
      paused
      completed
      additionalRequirements
      total
    }
  }
`
