"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { FeedbackDialog } from "@/components/feedback-dialog"

import {
  Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"

const OPTIONS = ["Asignada","En curso","Pausada","Finalizada"]

type Props = {
  id: string
  currentStatus: string
  onStatusChange:(s:string)=>Promise<any>
  loading?: boolean
  readonly?: boolean
}

export function OrderStatusUpdate({
  currentStatus, onStatusChange, loading, readonly,
}: Props) {
  const [status, setStatus]  = useState(currentStatus)
  const [dialog,setDialog]   = useState<{m:string; ok:boolean}|null>(null)
  const { toast }            = useToast()

  async function submit(e:React.FormEvent){
    e.preventDefault()
    try{
      await onStatusChange(status)
      toast({ title:"Estado actualizado", description:status })
      setDialog({ m:`Nuevo estado: ${status}`, ok:true })
    }catch(e:any){
      toast({ title:"Error", description:e.message, variant:"destructive"})
      setDialog({ m:e.message, ok:false })
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="bg-telco-500 text-white rounded-t-lg">
          <CardTitle>Actualizar estado</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <form onSubmit={submit} className="flex items-end gap-3">
            <Select
              disabled={readonly}
              value={status}
              onValueChange={setStatus}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {OPTIONS.map(op=>
                  <SelectItem key={op} value={op}>{op}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button
              type="submit"
              disabled={readonly||loading||status===currentStatus}>
              {loading
                ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Guardando…</>
                : "Actualizar"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {dialog && (
        <FeedbackDialog
          open={!!dialog}
          onOpenChange={()=>setDialog(null)}
          title={dialog.ok ? "Éxito" : "Error"}
          description={dialog.m}
          variant={dialog.ok ? "success":"error"}
        />
      )}
    </>
  )
}
