import { graphql, HttpResponse } from "msw"
import { mockOrders } from "./data/orders"
import { mockUsers } from "./data/users"

// Handlers para interceptar las solicitudes GraphQL
export const handlers = [
  // Mutation: Login
  graphql.mutation("Login", ({ variables }) => {
    const { email, password } = variables

    // Verificar credenciales
    if (email === "tecnico@telconova.com" && password === "password") {
      const user = mockUsers.find((u) => u.email === email)

      return HttpResponse.json({
        data: {
          login: {
            token: "mock-jwt-token-123456789",
            user,
          },
        },
      })
    }

    // Credenciales inválidas
    return HttpResponse.json(
      {
        errors: [
          {
            message: "Credenciales inválidas",
            locations: [{ line: 2, column: 3 }],
            path: ["login"],
          },
        ],
        data: null,
      },
      { status: 401 },
    )
  }),

  // Query: GetAssignedOrders
  graphql.query("GetAssignedOrders", ({ variables }) => {
    const { status, priority, search } = variables

    let filteredOrders = [...mockOrders]

    // Aplicar filtros si existen
    if (status) {
      filteredOrders = filteredOrders.filter((order) => order.status === status)
    }

    if (priority) {
      filteredOrders = filteredOrders.filter((order) => order.priority === priority)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.id.toLowerCase().includes(searchLower) ||
          order.client.toLowerCase().includes(searchLower) ||
          order.address.toLowerCase().includes(searchLower),
      )
    }

    return HttpResponse.json({
      data: {
        assignedOrders: filteredOrders,
      },
    })
  }),

  // Query: GetOrderById
  graphql.query("GetOrderById", ({ variables }) => {
    const { id } = variables
    const order = mockOrders.find((order) => order.id === id)

    if (!order) {
      return HttpResponse.json({
        errors: [
          {
            message: `Orden con ID ${id} no encontrada`,
            locations: [{ line: 2, column: 3 }],
            path: ["order"],
          },
        ],
        data: { order: null },
      })
    }

    return HttpResponse.json({
      data: {
        order,
      },
    })
  }),

  // Query: GetOrderStats
  graphql.query("GetOrderStats", () => {
    const inProgress = mockOrders.filter((order) => order.status === "in-progress").length
    const paused = mockOrders.filter((order) => order.status === "paused").length
    const completed = mockOrders.filter((order) => order.status === "completed").length
    const additionalRequirements = mockOrders.filter((order) => order.status === "additional").length

    return HttpResponse.json({
      data: {
        orderStats: {
          inProgress,
          paused,
          completed,
          additionalRequirements,
          total: mockOrders.length,
        },
      },
    })
  }),

  // Mutation: UpdateOrderStatus
  graphql.mutation("UpdateOrderStatus", ({ variables }) => {
    const { id, status, progress, comment } = variables
    const orderIndex = mockOrders.findIndex((order) => order.id === id)

    if (orderIndex === -1) {
      return HttpResponse.json({
        errors: [
          {
            message: `Orden con ID ${id} no encontrada`,
            locations: [{ line: 2, column: 3 }],
            path: ["updateOrderStatus"],
          },
        ],
        data: null,
      })
    }

    // Actualizar la orden (en una aplicación real, esto modificaría la base de datos)
    const updatedOrder = {
      ...mockOrders[orderIndex],
      status,
      progress: progress ?? mockOrders[orderIndex].progress,
    }

    // Añadir entrada al historial
    const newHistoryEntry = {
      id: `hist-${Date.now()}`,
      date: new Date().toISOString(),
      status,
      comment: comment ?? `Estado actualizado a ${status}`,
      user: {
        id: "1",
        name: "Técnico Demo",
      },
    }

    updatedOrder.history = [newHistoryEntry, ...(updatedOrder.history || [])]

    // En una aplicación real, aquí se guardarían los cambios en la base de datos
    // Para nuestro mock, actualizamos el array en memoria
    mockOrders[orderIndex] = updatedOrder

    return HttpResponse.json({
      data: {
        updateOrderStatus: updatedOrder,
      },
    })
  }),

  // Mutation: AddOrderEvidence
  graphql.mutation("AddOrderEvidence", ({ variables }) => {
    const { orderId, comment, images } = variables
    const orderIndex = mockOrders.findIndex((order) => order.id === orderId)

    if (orderIndex === -1) {
      return HttpResponse.json({
        errors: [
          {
            message: `Orden con ID ${orderId} no encontrada`,
            locations: [{ line: 2, column: 3 }],
            path: ["addOrderEvidence"],
          },
        ],
        data: null,
      })
    }

    // Crear nueva evidencia
    const newEvidence = {
      id: `ev-${Date.now()}`,
      date: new Date().toISOString(),
      comment,
      imageUrl: images && images.length > 0 ? "/placeholder.svg?height=300&width=300" : null,
      user: {
        id: "1",
        name: "Técnico Demo",
      },
    }

    // Actualizar la orden
    const updatedOrder = {
      ...mockOrders[orderIndex],
      evidence: [newEvidence, ...(mockOrders[orderIndex].evidence || [])],
    }

    // En una aplicación real, aquí se guardarían los cambios en la base de datos
    mockOrders[orderIndex] = updatedOrder

    return HttpResponse.json({
      data: {
        addOrderEvidence: updatedOrder,
      },
    })
  }),
]
