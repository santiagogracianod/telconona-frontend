"use client"

import { useState } from "react"
// Comentamos temporalmente la importación de Apollo
// import { useQuery } from "@apollo/client"
// import { GET_ASSIGNED_ORDERS } from "@/lib/graphql/queries"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle, AlertCircle, PauseCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

// Constante para habilitar el modo de desarrollo
const DEV_MODE = true

// Datos de ejemplo para modo de desarrollo
const mockOrders = [
  {
    id: "ORD-1234",
    client: "Empresa ABC",
    address: "Av. Principal 123, Ciudad",
    status: "in-progress",
    priority: "high",
    progress: 45,
    assignedDate: "2023-05-10",
  },
  {
    id: "ORD-1235",
    client: "Corporación XYZ",
    address: "Calle Secundaria 456, Ciudad",
    status: "paused",
    priority: "medium",
    progress: 30,
    assignedDate: "2023-05-09",
  },
  {
    id: "ORD-1236",
    client: "Industrias 123",
    address: "Blvd. Industrial 789, Ciudad",
    status: "completed",
    priority: "low",
    progress: 100,
    assignedDate: "2023-05-08",
  },
  {
    id: "ORD-1237",
    client: "Servicios Técnicos",
    address: "Av. Tecnológica 234, Ciudad",
    status: "additional",
    priority: "high",
    progress: 75,
    assignedDate: "2023-05-07",
  },
  {
    id: "ORD-1238",
    client: "Telecomunicaciones SA",
    address: "Calle Conectividad 567, Ciudad",
    status: "in-progress",
    priority: "medium",
    progress: 60,
    assignedDate: "2023-05-06",
  },
]

export function OrdersTable() {
  const [page, setPage] = useState(1)
  const ordersPerPage = 5

  // En modo desarrollo, usamos datos de ejemplo
  // En producción, usaríamos la consulta GraphQL
  /*
  const { loading, error, data } = useQuery(GET_ASSIGNED_ORDERS, {
    variables: {
      status: status || undefined,
      priority: priority || undefined,
      search: search || undefined,
    },
    fetchPolicy: "network-only",
  });

  const orders = data?.assignedOrders || [];
  */

  // Usar datos de ejemplo en modo desarrollo
  const orders = DEV_MODE ? mockOrders : []

  const totalPages = Math.ceil(orders.length / ordersPerPage)
  const paginatedOrders = orders.slice((page - 1) * ordersPerPage, page * ordersPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-progress":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200">
            <Clock className="h-3 w-3" />
            En curso
          </Badge>
        )
      case "paused":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-yellow-50 text-yellow-700 border-yellow-200">
            <PauseCircle className="h-3 w-3" />
            Pausado
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3" />
            Finalizado
          </Badge>
        )
      case "additional":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-red-50 text-red-700 border-red-200">
            <AlertCircle className="h-3 w-3" />
            Req. adicional
          </Badge>
        )
      default:
        return null
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-500">Alta</Badge>
      case "medium":
        return <Badge className="bg-yellow-500">Media</Badge>
      case "low":
        return <Badge className="bg-green-500">Baja</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead className="hidden md:table-cell">Dirección</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="hidden md:table-cell">Prioridad</TableHead>
              <TableHead className="hidden md:table-cell">Progreso</TableHead>
              <TableHead className="hidden md:table-cell">Fecha</TableHead>
              <TableHead className="text-right">Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.client}</TableCell>
                  <TableCell className="hidden md:table-cell">{order.address}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">{getPriorityBadge(order.priority)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <Progress value={order.progress} className="h-2 w-[60px]" />
                      <span className="text-xs text-muted-foreground">{order.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{order.assignedDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/orders/${order.id}`}>
                        <span className="sr-only md:not-sr-only md:inline-block">Ver</span>
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No se encontraron órdenes que coincidan con los criterios de búsqueda.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {paginatedOrders.length > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (page > 1) setPage(page - 1)
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                {page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (page < totalPages) setPage(page + 1)
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
