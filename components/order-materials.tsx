"use client"

import { useState } from "react"
import {
  useAllMaterials,
  useMaterialsOfOrder,
  useAddMaterialToOrder,
  useUpdateMaterialQty,
} from "@/lib/services/materials-graphql"

import {
  Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input }  from "@/components/ui/input"
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem,
} from "@/components/ui/select"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"

import { Plus, Pencil } from "lucide-react"

type Props = { id: string }          // id de la orden

export function OrderMaterials({ id }: Props) {
  /* ---------- queries ---------- */
  const { data: catData } = useAllMaterials()
  const { data: ordData, refetch } = useMaterialsOfOrder(id)

  const [addMaterial,  { loading: adding }] = useAddMaterialToOrder()
  const [updateQty]   = useUpdateMaterialQty()

  const materials = catData?.listarMateriales ?? []
  const used      = ordData?.obtenerMaterialesDeOrden ?? []

  /* ---------- estado UI ---------- */
  const [selectedId, setSelectedId] = useState<string>("")
  const [qty,        setQty]        = useState(1)

  const [editOpen,   setEditOpen]   = useState(false)
  const [editRow,    setEditRow]    = useState<{ id: string; cantidad: number } | null>(null)
  const [reason,     setReason]     = useState("")

  /* ---------- handlers ---------- */
  async function handleAdd() {
    if (!selectedId) return
    const mat = materials.find((m: any) => m.id === selectedId)
    if (!mat) return

    await addMaterial({
      variables: {
        input: {
          ordenId:        id,
          nombreMaterial: mat.nombre,
          cantidad:       qty,
        },
      },
    })

    setSelectedId("")
    setQty(1)
    refetch()
  }

  async function handleSaveEdit() {
    if (!editRow) return
    await updateQty({
      variables: {
        input: {
          materialOrdenId: editRow.id,
          nuevaCantidad:   qty,
          justificacion:   reason,
        },
      },
    })
    setEditOpen(false)
    setEditRow(null)
    setQty(1)
    setReason("")
    refetch()
  }

  /* ---------- vista ---------- */
  return (
    <Card>
      <CardHeader>
        <CardTitle>Materiales utilizados</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* -------- formulario agregar -------- */}
        <div className="flex items-end gap-2">
          <Select value={selectedId} onValueChange={setSelectedId}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Selecciona material" />
            </SelectTrigger>
            <SelectContent>
              {materials.map((m: any) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="number" min={1} className="w-20"
            value={qty} onChange={e => setQty(Number(e.target.value))}
          />

          <Button
            size="sm"
            onClick={handleAdd}
            disabled={!selectedId || adding}
          >
            <Plus className="mr-1 h-4 w-4" /> Añadir
          </Button>
        </div>

        {/* -------- lista materiales orden -------- */}
        {used.length ? (
          <ul className="space-y-2">
            {used.map((u: any) => (
              <li
                key={u.id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>
                  {u.material.nombre}
                  <span className="ml-2 text-muted-foreground">
                    x{u.cantidad}
                  </span>
                </span>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditRow(u)
                    setQty(u.cantidad)
                    setReason("")
                    setEditOpen(true)
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            No hay materiales registrados.
          </p>
        )}

        {/* -------- modal editar -------- */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="space-y-4">
            <DialogHeader>
              <DialogTitle>Editar material</DialogTitle>
            </DialogHeader>

            <Input
              type="number"
              min={1}
              value={qty}
              onChange={e => setQty(Number(e.target.value))}
              placeholder="Cantidad"
            />

            <Input
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Justificación"
            />

            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setEditOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveEdit}
                disabled={!reason.trim()}
              >
                Guardar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
