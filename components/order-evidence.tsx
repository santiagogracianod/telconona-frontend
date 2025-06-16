"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import {
  createAvance, getAvancesByOrden, uploadImages,
  getEvidenciasByAvance, updateComentario, updateTiempo,
  CreateAvanceInput, Evidencia,
} from "@/lib/services/advances-service"

import {
  Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card"
import {
  Tabs, TabsList, TabsTrigger, TabsContent,
} from "@/components/ui/tabs"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input }  from "@/components/ui/input"
import { Label }  from "@/components/ui/label"
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { FeedbackDialog } from "@/components/feedback-dialog"
import { useToast } from "@/hooks/use-toast"

import {
  Pencil, Loader2, FileText, Upload, Camera,
} from "lucide-react"

/* -------- tipos -------- */
type EvidenceUI = {
  id: string
  date: string
  comentario: string
  tiempoInvertido: number
  imageUrls: string[]
}
type Props = { id: string; readonly?: boolean }

/* =================================================================== */
export function OrderEvidence({ id, readonly = false }: Props) {
  const { toast } = useToast()

  /* ---------- feedback dialog ---------- */
  const [fb, setFb] = useState<{ ok: boolean; msg: string } | null>(null)

  /* ---------- formulario nuevo avance ---------- */
  const [comment,   setComment]   = useState("")
  const [timeSpent, setTimeSpent] = useState(0)
  const [files,     setFiles]     = useState<File[]>([])
  const [previews,  setPreviews]  = useState<string[]>([])
  const MAX_FILES = 3
  const [saving,    setSaving]    = useState(false)

  /* ---------- historial ---------- */
  const [history, setHistory]   = useState<EvidenceUI[]>([])
  const [loadingHist, setLoadingHist] = useState(false)
  const [tab, setTab]           = useState<"upload"|"history">("history")

  /* ---------- alert inline para formulario ---------- */
  const [msg, setMsg]           = useState<string|null>(null)
  const [msgType,setMsgType]    = useState<"success"|"error">("success")

  /* ---------- modal edición ---------- */
  const [openEdit, setOpenEdit] = useState(false)
  const [editing, setEditing]   = useState<null|{
    id:string; type:"comentario"|"tiempo"; value:string|number
  }>(null)
  const [justify, setJustify]   = useState("")
  const [savingEdit,setSavingEdit]=useState(false)

  /* ================================================================ */
  /*                      CARGA HISTORIAL                             */
  /* ================================================================ */
  useEffect(()=>{
    if(tab!=="history") return
    setLoadingHist(true)
    getAvancesByOrden(Number(id))
      .then(async lista=>{
        const full = await Promise.all(
          lista.map(async a=>{
            const imgs = await getEvidenciasByAvance(a.id)
            return {
              id:a.id,
              date:a.creadoEn ?? new Date().toISOString(),
              comentario:a.comentario,
              tiempoInvertido:a.tiempoInvertido,
              imageUrls:imgs.map((e:Evidencia)=>e.url),
            }
          })
        )
        setHistory(full)
      })
      .catch(err=>{
        const m = axios.isAxiosError(err)
          ? err.response?.data?.message ?? "No fue posible cargar avances."
          : (err as Error).message
        setFb({ ok:false, msg:m })
        toast({ title:"Error", description:m, variant:"destructive"})
      })
      .finally(()=>setLoadingHist(false))
  },[tab,id,toast])

  /* ================================================================ */
  /*                         NUEVO AVANCE                             */
  /* ================================================================ */
  const onFiles=(e:React.ChangeEvent<HTMLInputElement>)=>{
    if(!e.target.files) return
    const sel=Array.from(e.target.files)
    setFiles(p=>[...p,...sel].slice(0,MAX_FILES))
    setPreviews(p=>[
      ...p,
      ...sel.slice(0,MAX_FILES-p.length).map(f=>URL.createObjectURL(f)),
    ])
  }
  const removeImg=(i:number)=>{
    URL.revokeObjectURL(previews[i])
    setFiles(files.filter((_,idx)=>idx!==i))
    setPreviews(previews.filter((_,idx)=>idx!==i))
  }

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault()
    if(readonly) return
    setMsg(null)

    if(files.length>MAX_FILES){
      setMsgType("error"); setMsg("Máx. 3 imágenes"); return
    }
    if(timeSpent<=0 && !comment.trim() && files.length===0){
      setMsgType("error"); setMsg("Añade tiempo, comentario o imagen"); return
    }

    setSaving(true)
    try{
      const body:CreateAvanceInput={
        ordenId:Number(id),
        tecnicoId:Number(localStorage.getItem("telconova-user")),
        comentario:comment.trim(),
        tiempoInvertido:timeSpent,
      }
      const nuevo = await createAvance(body)
      let urls:string[]=[]
      if(files.length){
        const evs = await uploadImages(nuevo.id, files)
        urls=evs.map(e=>e.url)
      }
      setHistory(p=>[{
        id:nuevo.id,date:nuevo.creadoEn,comentario:nuevo.comentario,
        tiempoInvertido:nuevo.tiempoInvertido,imageUrls:urls.length?urls:previews,
      },...p])
      toast({ title:"Avance guardado", description:`Id ${nuevo.id}` })
      setFb({ ok:true, msg:"Avance guardado correctamente." })
      setComment(""); setTimeSpent(0); setFiles([]); setPreviews([])
      setTab("history")
    }catch(e:any){
      setFb({ ok:false, msg:e.message })
      toast({ title:"Error", description:e.message, variant:"destructive"})
    }finally{ setSaving(false) }
  }

  /* ================================================================ */
  /*                     GUARDAR EDICIÓN                              */
  /* ================================================================ */
  const saveEdit=async()=>{
    if(!editing) return
    setSavingEdit(true)
    try{
      if(editing.type==="comentario"){
        await updateComentario(editing.id, editing.value as string)
        setHistory(h=>h.map(a=>a.id===editing.id?{...a,comentario:editing.value as string}:a))
        setFb({ ok:true, msg:"Comentario actualizado" })
      }else{
        await updateTiempo(editing.id, editing.value as number, justify)
        setHistory(h=>h.map(a=>a.id===editing.id?{...a,tiempoInvertido:editing.value as number}:a))
        setFb({ ok:true, msg:"Tiempo actualizado" })
      }
      setOpenEdit(false)
    }catch(e:any){
      setFb({ ok:false, msg:e.message })
    }finally{ setSavingEdit(false) }
  }

  /* ================================================================ */
  /*                          RENDER                                  */
  /* ================================================================ */
  const renderHist = ()=>(
    loadingHist ? (
      <div className="flex justify-center py-6">
        <Loader2 className="animate-spin h-6 w-6"/>
      </div>
    ) : history.length ? (
      history.map(ev=>(
        <div key={ev.id} className="border-b pb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>{new Date(ev.date).toLocaleString()}</span>
            <span className="text-muted-foreground flex items-center gap-1">
              {ev.tiempoInvertido} min
              {!readonly && (
                <Pencil size={14} className="cursor-pointer"
                  onClick={()=>{
                    setEditing({ id:ev.id,type:"tiempo",value:ev.tiempoInvertido})
                    setJustify(""); setOpenEdit(true)
                  }}/>
              )}
            </span>
          </div>
          <p className="flex items-start gap-1">
            {ev.comentario}
            {!readonly && (
              <Pencil size={14} className="cursor-pointer"
                onClick={()=>{
                  setEditing({id:ev.id,type:"comentario",value:ev.comentario})
                  setOpenEdit(true)
                }}/>
            )}
          </p>
          {ev.imageUrls.length>0 && (
            <div className="grid grid-cols-3 gap-2">
              {ev.imageUrls.map((u,idx)=>
                <img key={idx} src={u}
                     className="h-20 w-full object-cover rounded-md"/>)}
            </div>
          )}
        </div>
      ))
    ) : (
      <p className="text-center text-sm text-muted-foreground">No hay avances registrados</p>
    )
  )

  return (
    <>
      <Card>
        <CardHeader><CardTitle>Evidencias y Avances</CardTitle></CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={v=>setTab(v as any)}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="upload" disabled={readonly}>
                <Upload className="h-4 w-4 mr-1"/>Nuevo avance
              </TabsTrigger>
              <TabsTrigger value="history"><FileText className="h-4 w-4 mr-1"/>Historial</TabsTrigger>
            </TabsList>

            {/* -------- FORMULARIO -------- */}
            <TabsContent value="upload" className="pt-4 space-y-4">
              {readonly
                ? <p className="text-sm text-muted-foreground">
                    Esta orden está finalizada. No puedes añadir avances.
                  </p>
                : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tiempo invertido (min)</Label>
                    <Input type="number" min={0} value={timeSpent}
                           onChange={e=>setTimeSpent(Number(e.target.value))}/>
                  </div>

                  <div className="space-y-2">
                    <Label>Comentario</Label>
                    <textarea rows={4} className="w-full p-2 border rounded"
                              value={comment}
                              onChange={e=>setComment(e.target.value)}/>
                  </div>

                  {/* Imágenes */}
                  <div className="space-y-2">
                    <Label>Imágenes (máx 3)</Label>
                    <label htmlFor="file"
                           onDragOver={e=>e.preventDefault()}
                           onDrop={e=>{
                             e.preventDefault()
                             onFiles({ target:{ files:e.dataTransfer.files }} as any)}}
                           className="flex flex-col items-center justify-center w-full h-28
                                      border-2 border-dashed rounded-lg cursor-pointer
                                      bg-muted/40 hover:bg-muted/60">
                      <Camera className="h-6 w-6 text-muted-foreground"/>
                      <p className="text-xs text-muted-foreground">
                        Haz clic o arrastra archivos
                      </p>
                    </label>
                    <Input id="file" type="file" accept="image/*" multiple
                           className="hidden" onChange={onFiles}/>

                    {previews.length>0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {previews.map((url,i)=>(
                          <div key={i} className="relative">
                            <img src={url} className="h-20 w-full object-cover rounded-md"/>
                            <button type="button" onClick={()=>removeImg(i)}
                                    className="absolute top-1 right-1 bg-black/70 text-white
                                               rounded-full px-[6px] text-xs">×</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg && (
                    <Alert variant={msgType==="error"?"destructive":"default"}>
                      <AlertTitle>{msgType==="error"?"Error":"Éxito"}</AlertTitle>
                      <AlertDescription>{msg}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" disabled={saving}>
                    {saving
                      ? <><Loader2 className="animate-spin h-4 w-4 mr-2"/>Guardando…</>
                      : "Guardar avance"}
                  </Button>
                </form>
              )}
            </TabsContent>

            {/* -------- HISTORIAL -------- */}
            <TabsContent value="history" className="pt-4 space-y-4">
              {renderHist()}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* -------- MODAL EDITAR -------- */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="space-y-4">
          <DialogHeader>
            <DialogTitle>
              {editing?.type==="comentario" ? "Editar comentario" : "Editar tiempo"}
            </DialogTitle>
          </DialogHeader>

          {editing?.type==="comentario" && (
            <Input value={editing.value as string}
                   onChange={e=>setEditing(p=>p?{...p,value:e.target.value}:p)}/>
          )}

          {editing?.type==="tiempo" && (
            <>
              <Label>Nuevo tiempo (min)</Label>
              <Input type="number" min={0} value={editing.value as number}
                     onChange={e=>setEditing(p=>p?{...p,value:Number(e.target.value)}:p)}/>
              <Label className="mt-2">Justificación</Label>
              <Textarea rows={3} value={justify}
                        onChange={e=>setJustify(e.target.value)}/>
            </>
          )}

          <DialogFooter>
            <Button onClick={saveEdit}
                    disabled={savingEdit || (editing?.type==="tiempo" && !justify.trim())}>
              {savingEdit
                ? <Loader2 className="h-4 w-4 mr-2 animate-spin"/>
                : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* -------- FEEDBACK DIALOG -------- */}
      {fb && (
        <FeedbackDialog
          open={!!fb}
          onOpenChange={()=>setFb(null)}
          title={fb.ok ? "Éxito" : "Error"}
          description={fb.msg}
          variant={fb.ok ? "success" : "error"}
        />
      )}
    </>
  )
}
