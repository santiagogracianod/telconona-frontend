// Datos de ejemplo para las órdenes
export const mockOrders = [
  {
    id: "ORD-1234",
    client: "Empresa ABC",
    description: "Instalación de fibra óptica",
    fullDescription:
      "Instalación de fibra óptica en oficinas centrales. Incluye tendido de cable, instalación de rosetas y configuración de equipos.",
    address: "Av. Principal 123, Ciudad",
    status: "in-progress",
    priority: "high",
    progress: 45,
    assignedDate: "2023-05-10",
    scheduledTime: "10:00 - 12:00",
    contactName: "Juan Pérez",
    contactPhone: "+1234567890",
    contactEmail: "juan@empresaabc.com",
    notes:
      "El cliente ha solicitado que se realice la instalación con la menor interrupción posible a sus operaciones diarias.",
    history: [
      {
        id: "hist-1",
        date: "2023-05-10T09:00:00Z",
        status: "assigned",
        comment: "Orden asignada al técnico",
        user: {
          id: "1",
          name: "Administrador",
        },
      },
      {
        id: "hist-2",
        date: "2023-05-10T10:30:00Z",
        status: "in-progress",
        comment: "Iniciando trabajos de instalación",
        user: {
          id: "1",
          name: "Técnico Demo",
        },
      },
    ],
    evidence: [
      {
        id: "ev-1",
        date: "2023-05-10T10:45:00Z",
        comment: "Llegada al sitio",
        imageUrl: "/placeholder.svg?height=300&width=300",
        user: {
          id: "1",
          name: "Técnico Demo",
        },
      },
    ],
    materials: ["Cable de fibra óptica (50m)", "Rosetas de fibra (5)", "Conectores SC/APC (10)"],
  },
  {
    id: "ORD-1235",
    client: "Corporación XYZ",
    description: "Reparación de conexión ADSL",
    fullDescription:
      "Cliente reporta intermitencia en la conexión ADSL. Se requiere revisión de cableado y posible cambio de módem.",
    address: "Calle Secundaria 456, Ciudad",
    status: "paused",
    priority: "medium",
    progress: 30,
    assignedDate: "2023-05-09",
    scheduledTime: "14:00 - 16:00",
    contactName: "María González",
    contactPhone: "+1234567891",
    contactEmail: "maria@corporacionxyz.com",
    notes: "El cliente ha reportado que los problemas ocurren principalmente en horario de tarde.",
    history: [
      {
        id: "hist-3",
        date: "2023-05-09T13:00:00Z",
        status: "assigned",
        comment: "Orden asignada al técnico",
        user: {
          id: "1",
          name: "Administrador",
        },
      },
      {
        id: "hist-4",
        date: "2023-05-09T14:30:00Z",
        status: "in-progress",
        comment: "Iniciando diagnóstico",
        user: {
          id: "1",
          name: "Técnico Demo",
        },
      },
      {
        id: "hist-5",
        date: "2023-05-09T15:15:00Z",
        status: "paused",
        comment: "Se requiere material adicional",
        user: {
          id: "1",
          name: "Técnico Demo",
        },
      },
    ],
    evidence: [
      {
        id: "ev-2",
        date: "2023-05-09T14:45:00Z",
        comment: "Estado del módem actual",
        imageUrl: "/placeholder.svg?height=300&width=300",
        user: {
          id: "1",
          name: "Técnico Demo",
        },
      },
    ],
    materials: ["Módem ADSL de repuesto", "Cable telefónico (10m)", "Conectores RJ11 (5)"],
  },
  {
    id: "ORD-1236",
    client: "Industrias 123",
    description: "Mantenimiento de red WiFi",
    fullDescription:
      "Mantenimiento preventivo de la red WiFi. Incluye revisión de access points, actualización de firmware y optimización de cobertura.",
    address: "Blvd. Industrial 789, Ciudad",
    status: "completed",
    priority: "low",
    progress: 100,
    assignedDate: "2023-05-08",
    scheduledTime: "09:00 - 13:00",
    contactName: "Roberto Sánchez",
    contactPhone: "+1234567892",
    contactEmail: "roberto@industrias123.com",
    notes: "Mantenimiento rutinario programado cada 6 meses.",
    history: [
      {
        id: "hist-6",
        date: "2023-05-08T08:00:00Z",
        status: "assigned",
        comment: "Orden asignada al técnico",
        user: {
          id: "1",
          name: "Administrador",
        },
      },
      {
        id: "hist-7",
        date: "2023-05-08T09:30:00Z",
        status: "in-progress",
        comment: "Iniciando mantenimiento",
        user: {
          id: "1",
          name: "Técnico Demo",
        },
      },
      {
        id: "hist-8",
        date: "2023-05-08T12:45:00Z",
        status: "completed",
        comment: "Mantenimiento completado satisfactoriamente",
        user: {
          id: "1",
          name: "Técnico Demo",
        },
      },
    ],
    evidence: [
      {
        id: "ev-3",
        date: "2023-05-08T09:45:00Z",
        comment: "Access point principal",
        imageUrl: "/placeholder.svg?height=300&width=300",
        user: {
          id: "1",
          name: "Técnico Demo",
        },
      },
      {
        id: "ev-4",
        date: "2023-05-08T11:30:00Z",
        comment: "Medición de señal WiFi",
        imageUrl: "/placeholder.svg?height=300&width=300",
        user: {
          id: "1",
          name: "Técnico Demo",
        },
      },
      {
        id: "ev-5",
        date: "2023-05-08T12:30:00Z",
        comment: "Configuración completada",
        imageUrl: "/placeholder.svg?height=300&width=300",
        user: {
          id: "1",
          name: "Técnico Demo",
        },
      },
    ],
    materials: ["Access points de repuesto (2)", "Cable de red Cat6 (20m)", "Herramientas de diagnóstico WiFi"],
  },
  {
    id: "ORD-1237",
    client: "Servicios Técnicos",
    description: "Instalación de central telefónica IP",
    fullDescription:
      "Instalación y configuración de central telefónica IP con 15 extensiones. Incluye programación de IVR y configuración de buzones de voz.",
    address: "Av. Tecnológica 234, Ciudad",
    status: "additional",
    priority: "high",
    progress: 75,
    assignedDate: "2023-05-07",
    scheduledTime: "08:00 - 17:00",
    contactName: "Ana López",
    contactPhone: "+1234567893",
    contactEmail: "ana@servicios-tecnicos.com",
    notes: "Proyecto de migración de telefonía analógica a IP.",
    history: [
      {
        id: "hist-9",
        date: "2023-05-07T07:30:00Z",
        status: "assigned",
        comment: "Orden asignada al técnico",
        user: {
          id: "1",
          name: "Administrador",
        },
      },
      {
        id: "hist-10",
        date: "2023-05-07T08:30:00Z",
        status: "in-progress",
        comment: "Iniciando instalación",
        user: {
          id: "1",
          name: "Técnico Demo",
        },
      },
      {
        id: "hist-11",
        date: "2023-05-07T14:00:00Z",
        status: "additional",
        comment: "Se requieren teléfonos IP adicionales no contemplados inicialmente",
        user: {
          id: "1",
          name: "Técnico Demo",
        },
      },
    ],
    evidence: [
      {
        id: "ev-6",
        date: "2023-05-07T09:15:00Z",
        comment: "Rack de comunicaciones",
        imageUrl: "/placeholder.svg?height=300&width=300",
        user: {
          id: "1",
          name: "Técnico Demo",
        },
      },
      {
        id: "ev-7",
        date: "2023-05-07T11:30:00Z",
        comment: "Instalación de central",
        imageUrl: "/placeholder.svg?height=300&width=300",
        user: {
          id: "1",
          name: "Técnico Demo",
        },
      },
    ],
    materials: ["Central telefónica IP", "Teléfonos IP (15)", "Switch PoE", "Cable de red Cat6 (100m)"],
  },
  {
    id: "ORD-1238",
    client: "Telecomunicaciones SA",
    description: "Configuración de router",
    fullDescription:
      "Configuración de router para nuevo servicio de internet. Incluye configuración de WiFi, contraseñas y control parental.",
    address: "Calle Conectividad 567, Ciudad",
    status: "in-progress",
    priority: "medium",
    progress: 60,
    assignedDate: "2023-05-06",
    scheduledTime: "16:00 - 18:00",
    contactName: "Carlos Martínez",
    contactPhone: "+1234567894",
    contactEmail: "carlos@telecomunicaciones-sa.com",
    notes: "Cliente nuevo, primera instalación.",
    history: [
      {
        id: "hist-12",
        date: "2023-05-06T15:00:00Z",
        status: "assigned",
        comment: "Orden asignada al técnico",
        user: {
          id: "1",
          name: "Administrador",
        },
      },
      {
        id: "hist-13",
        date: "2023-05-06T16:15:00Z",
        status: "in-progress",
        comment: "Iniciando configuración",
        user: {
          id: "1",
          name: "Técnico Demo",
        },
      },
    ],
    evidence: [],
    materials: ["Router WiFi", "Cable de red (3m)", "Documentación de configuración"],
  },
]
