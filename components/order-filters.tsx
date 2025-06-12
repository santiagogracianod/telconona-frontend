// src/components/order-filters.tsx
"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

type OrderFiltersProps = {
  status: string
  onStatusChange: (newStatus: string) => void
}

export function OrderFilters({ status, onStatusChange }: OrderFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Asignada">Asignada</SelectItem>
            <SelectItem value="En curso">En curso</SelectItem>
            <SelectItem value="Pausada">Pausada</SelectItem>
            <SelectItem value="Finalizada">Finalizada</SelectItem>
            <SelectItem value="Requiere aprobación adicional">
              Requiere aprobación adicional
            </SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Aplicar filtro</span>
        </Button>
      </div>
    </div>
  )
}
