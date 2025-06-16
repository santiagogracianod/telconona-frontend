"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { FeedbackDialog } from "@/components/feedback-dialog"

import {
  useAllMaterials,
  useMaterialsOfOrder,
  useAddMaterialToOrder,
  useUpdateMaterialQty,
} from "@/lib/services/materials-graphql"

import {
  Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem,
} from "@/components/ui/select"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Pencil } from "lucide-react"

type Props={ id:string; readonly?:boolean }

export function OrderMaterials({ id, readonly }:Props){
  const { data:all }          = useAllMaterials()
  const { data:used,refetch } = useMaterialsOfOrder(id)
  const [add]                 = useAddMaterialToOrder()
  const [upd]                 = useUpdateMaterialQty()

  /* estado ui */
  const [matId, setMatId]     = useState("")
  const [qty,   setQty]       = useState(1)
  const [edit,  setEdit]      = useState<any>(null)
  const [just,  setJust]      = useState("")
  const [dlg,   setDlg]       = useState<{m:string; ok:boolean}|null>(null)
  const { toast }             = useToast()

  async function handleAdd(){
    try{
      const mat = all?.listarMateriales.find((m:any)=>m.id===matId)
      await add({ variables:{input:{ ordenId:id, nombreMaterial:mat.nombre, cantidad:qty }} })
      setDlg({ m:`${mat.nombre} x${qty} añadido`, ok:true })
      toast({ title:"Material añadido",description:`${mat.nombre} x${qty}` })
      setMatId(""); setQty(1); refetch()
    }catch(e:any){
      setDlg({ m:e.message, ok:false })
      toast({ title:"Error", description:e.message,variant:"destructive"})
    }
  }

  async function saveEdit(){
    try{
      await upd({ variables:{input:{ materialOrdenId:edit.id,
                                     nuevaCantidad:qty,
                                     justificacion:just }} })
      setDlg({ m:`Cantidad actualizada (${qty})`, ok:true })
      toast({ title:"Actualizado", description:`Nueva cantidad: ${qty}` })
      setEdit(null); setQty(1); setJust(""); refetch()
    }catch(e:any){
      setDlg({ m:e.message, ok:false })
      toast({ title:"Error", description:e.message,variant:"destructive"})
    }
  }

  return(
    <>
      <Card>
        <CardHeader><CardTitle>Materiales utilizados</CardTitle></CardHeader>
        <CardContent className="space-y-4">

          {!readonly && (
            <div className="flex items-end gap-2">
              <Select value={matId} onValueChange={setMatId}>
                <SelectTrigger className="w-48"><SelectValue placeholder="Material"/></SelectTrigger>
                <SelectContent>
                  {all?.listarMateriales.map((m:any)=>
                    <SelectItem key={m.id} value={m.id}>{m.nombre}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input type="number" min={1} className="w-20" value={qty}
                     onChange={e=>setQty(Number(e.target.value))}/>
              <Button size="sm" onClick={handleAdd} disabled={!matId}>
                <Plus className="h-4 w-4 mr-1"/>Añadir
              </Button>
            </div>
          )}

          {used?.obtenerMaterialesDeOrden.length
            ? (
              <ul className="space-y-2">
                {used.obtenerMaterialesDeOrden.map((u:any)=>(
                  <li key={u.id} className="flex justify-between items-center border p-2 rounded">
                    <span>{u.material.nombre}<span className="ml-2 text-muted-foreground">x{u.cantidad}</span></span>
                    {!readonly && (
                      <Button variant="ghost" size="icon"
                              onClick={()=>{setEdit(u); setQty(u.cantidad); setJust("");}}>
                        <Pencil className="h-4 w-4"/>
                      </Button>)}
                  </li>
                ))}
              </ul>
            )
            : <p className="text-sm text-muted-foreground">No hay materiales.</p>}
        </CardContent>
      </Card>

      {/* dialog edición */}
      <Dialog open={!!edit} onOpenChange={()=>setEdit(null)}>
        <DialogContent className="space-y-4">
          <DialogHeader><DialogTitle>Editar material</DialogTitle></DialogHeader>
          <Input type="number" min={1} value={qty}
                 onChange={e=>setQty(Number(e.target.value))}/>
          <Input placeholder="Justificación" value={just}
                 onChange={e=>setJust(e.target.value)}/>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={()=>setEdit(null)}>Cancelar</Button>
            <Button onClick={saveEdit} disabled={!just.trim()}>Guardar</Button>
          </div>
        </DialogContent>
      </Dialog>

      {dlg && (
        <FeedbackDialog
          open={!!dlg}
          onOpenChange={()=>setDlg(null)}
          title={dlg.ok ? "Éxito" : "Error"}
          description={dlg.m}
          variant={dlg.ok ? "success":"error"}
        />
      )}
    </>
  )
}
