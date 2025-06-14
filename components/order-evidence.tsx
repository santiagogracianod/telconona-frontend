"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import {
  createAvance,
  getAvancesByOrden,
  uploadImages,
  getEvidenciasByAvance,
  updateComentario,            // 🔸 nuevos PUT
  updateTiempo,
  CreateAvanceInput,
  Evidencia,
} from "@/lib/services/advances-service"

import {
  Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card"
import {
  Tabs, TabsList, TabsTrigger, TabsContent,
} from "@/components/ui/tabs"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

import { Pencil, Loader2, FileText, Upload, Camera } from "lucide-react"

/* ---------- tipos UI ---------- */
type EvidenceUI = {
  id: string
  date: string
  comentario: string
  tiempoInvertido: number
  imageUrls: string[]
}
type OrderEvidenceProps = { id: string }

/* ========== componente ========== */
export function OrderEvidence({ id }: OrderEvidenceProps) {
  /* -------------------------------- estado formulario -------------------------------- */
  const [comment, setComment] = useState("")
  const [timeSpent, setTimeSpent] = useState(0)

  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const MAX_FILES = 3

  const [isSubmitting, setIsSubmitting] = useState(false)

  /* -------------------------------- historial -------------------------------- */
  const [history, setHistory] = useState<EvidenceUI[]>([])
  const [loadingHist, setLoadingHist] = useState(false)

  /* -------------------------------- UI feedback -------------------------------- */
  const [msg, setMsg] = useState<string | null>(null)
  const [msgType, setMsgType] = useState<"success" | "error">("success")
  const [tab, setTab] = useState<"upload" | "history">("upload")

  /* -------------------------------- modal edición -------------------------------- */
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<null | {
    id: string
    type: "comentario" | "tiempo"
    value: string | number
  }>(null)
  const [justify, setJustify] = useState("")     // solo para tiempo
  const [savingEdit, setSavingEdit] = useState(false)

  /* -------- carga historial al abrir tab -------- */
  useEffect(() => {
    if (tab !== "history") return
    setLoadingHist(true)

    getAvancesByOrden(Number(id))
      .then(async lista => {
        const conImgs = await Promise.all(
          lista.map(async a => {
            const evids = await getEvidenciasByAvance(a.id)
            return {
              id: a.id,
              date: (a as any).creadoEn ?? new Date().toISOString(),
              comentario: a.comentario,
              tiempoInvertido: a.tiempoInvertido,
              imageUrls: evids.map((ev: Evidencia) => ev.url),
            }
          })
        )
        setHistory(conImgs)
      })
      .catch(err => {
        setMsgType("error")
        setMsg(
          axios.isAxiosError(err)
            ? err.response?.data?.message || "No fue posible cargar avances."
            : (err as Error).message
        )
      })
      .finally(() => setLoadingHist(false))
  }, [tab, id])

  /* -------- selector imágenes -------- */
  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const selected = Array.from(e.target.files)
    setFiles(prev => [...prev, ...selected].slice(0, MAX_FILES))
    setPreviews(prev => [
      ...prev,
      ...selected.slice(0, MAX_FILES - prev.length).map(f => URL.createObjectURL(f)),
    ])
  }
  const removeImg = (i: number) => {
    URL.revokeObjectURL(previews[i])
    setFiles(files.filter((_, idx) => idx !== i))
    setPreviews(previews.filter((_, idx) => idx !== i))
  }

  /* -------- submit nuevo avance -------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg(null)

    if (files.length > MAX_FILES) {
      setMsgType("error")
      return setMsg("Solo puedes subir hasta 3 imágenes por avance.")
    }
    if (timeSpent <= 0 && !comment.trim() && files.length === 0) {
      setMsgType("error")
      return setMsg("Añade tiempo, comentario o al menos una imagen.")
    }

    setIsSubmitting(true)
    try {
      const body: CreateAvanceInput = {
        ordenId: Number(id),
        tecnicoId: Number(localStorage.getItem("telconova-user")),
        comentario: comment.trim(),
        tiempoInvertido: timeSpent,
      }
      const nuevo = await createAvance(body)

      let urls: string[] = []
      if (files.length) {
        const evid = await uploadImages(nuevo.id, files)
        urls = evid.map(ev => ev.url)
      }

      setHistory(prev => [
        {
          id: nuevo.id,
          date: nuevo.creadoEn,
          comentario: nuevo.comentario,
          tiempoInvertido: nuevo.tiempoInvertido,
          imageUrls: urls.length ? urls : previews,
        },
        ...prev,
      ])

      setMsgType("success")
      setMsg("Avance guardado correctamente.")
      setComment("")
      setTimeSpent(0)
      previews.forEach(URL.revokeObjectURL)
      setFiles([])
      setPreviews([])
    } catch (err: any) {
      setMsgType("error")
      setMsg(
        axios.isAxiosError(err)
          ? err.response?.data?.message || "Error al guardar avance."
          : err.message
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  /* -------------------------------- guardar edición -------------------------------- */
  const saveEdit = async () => {
    if (!editing) return
    setSavingEdit(true)
    try {
      if (editing.type === "comentario") {
        await updateComentario(editing.id, editing.value as string)
        setHistory(h =>
          h.map(a =>
            a.id === editing.id ? { ...a, comentario: editing.value as string } : a
          )
        )
      } else {
        await updateTiempo(editing.id, editing.value as number, justify)
        setHistory(h =>
          h.map(a =>
            a.id === editing.id
              ? { ...a, tiempoInvertido: editing.value as number }
              : a
          )
        )
      }
      setOpen(false)
    } catch {
      alert("Error al actualizar")
    } finally {
      setSavingEdit(false)
    }
  }

  /* ------------------------------- render ------------------------------- */
  return (
    <Card>
      <CardHeader><CardTitle>Evidencias y Avances</CardTitle></CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={v => setTab(v as any)}>
          {/* ---------------- pestañas ---------------- */}
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="upload"><Upload className="h-4 w-4 mr-1"/>Nuevo avance</TabsTrigger>
            <TabsTrigger value="history"><FileText className="h-4 w-4 mr-1"/>Historial</TabsTrigger>
          </TabsList>

          {/* ============== FORMULARIO ============== */}
          <TabsContent value="upload" className="pt-4 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* tiempo */}
              <div className="space-y-2">
                <Label>Tiempo invertido (min)</Label>
                <Input type="number" min={0} value={timeSpent}
                       onChange={e => setTimeSpent(Number(e.target.value))}/>
              </div>

              {/* comentario */}
              <div className="space-y-2">
                <Label>Comentario</Label>
                <textarea rows={4} className="w-full p-2 border rounded"
                          value={comment}
                          onChange={e => setComment(e.target.value)}/>
              </div>

              {/* imágenes */}
              <div className="space-y-2">
                <Label>Imágenes (máx 3)</Label>
                <label
                  htmlFor="file"
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); onFiles({ target: { files: e.dataTransfer.files } } as any) }}
                  className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted/60"
                >
                  <Camera className="h-6 w-6 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Haz clic o arrastra archivos</p>
                </label>
                <Input id="file" type="file" accept="image/*" multiple className="hidden" onChange={onFiles} />

                {previews.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {previews.map((url, i) => (
                      <div key={i} className="relative group">
                        <img src={url} className="h-20 w-full object-cover rounded-md"/>
                        <button type="button" onClick={() => removeImg(i)}
                          className="absolute top-1 right-1 bg-black/70 text-white rounded-full px-[6px] text-xs opacity-0 group-hover:opacity-100">×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* alert */}
              {msg && (
                <Alert variant={msgType === "error" ? "destructive" : "default"}>
                  <AlertTitle>{msgType === "error" ? "Error" : "Éxito"}</AlertTitle>
                  <AlertDescription>{msg}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="animate-spin h-4 w-4 mr-2"/>Guardando…</> : "Guardar avance"}
              </Button>
            </form>
          </TabsContent>

          {/* ============== HISTORIAL ============== */}
          <TabsContent value="history" className="pt-4 space-y-4">
            {loadingHist ? (
              <div className="flex justify-center py-6"><Loader2 className="animate-spin h-6 w-6"/></div>
            ) : history.length ? (
              history.map(ev => (
                <div key={ev.id} className="border-b pb-4 space-y-2">
                  {/* fecha + tiempo + lápiz */}
                  <div className="flex justify-between text-sm">
                    <span>{new Date(ev.date).toLocaleString()}</span>
                    <span className="text-muted-foreground">
                      {ev.tiempoInvertido} min
                      <Pencil className="inline ml-1 cursor-pointer" size={14}
                        onClick={()=>{
                          setEditing({ id: ev.id, type: "tiempo", value: ev.tiempoInvertido })
                          setJustify("")
                          setOpen(true)
                        }}
                      />
                    </span>
                  </div>

                  {/* comentario + lápiz */}
                  <p className="group flex items-start">
                    {ev.comentario}
                    <Pencil size={14} className="ml-1 invisible group-hover:visible cursor-pointer"
                      onClick={()=>{
                        setEditing({ id: ev.id, type: "comentario", value: ev.comentario })
                        setOpen(true)
                      }}
                    />
                  </p>

                  {/* imágenes */}
                  {ev.imageUrls.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {ev.imageUrls.map((u, idx) => (
                        <img key={idx} src={u} className="h-20 w-full object-cover rounded-md"/>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-muted-foreground">No hay avances registrados</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* =================== MODAL EDICIÓN =================== */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing?.type === "comentario" ? "Editar comentario" : "Editar tiempo"}
            </DialogTitle>
          </DialogHeader>

          {editing?.type === "comentario" && (
            <Input
              value={editing.value as string}
              onChange={e =>
                setEditing(prev => prev ? { ...prev, value: e.target.value } : prev)
              }
            />
          )}

          {editing?.type === "tiempo" && (
            <>
              <Label className="mt-2">Nuevo tiempo (min)</Label>
              <Input
                type="number"
                min={0}
                value={editing.value as number}
                onChange={e =>
                  setEditing(prev => prev ? { ...prev, value: Number(e.target.value) } : prev)
                }
              />
              <Label className="mt-2">Justificación</Label>
              <Textarea rows={3} value={justify} onChange={e => setJustify(e.target.value)}/>
            </>
          )}

          <DialogFooter>
            <Button disabled={savingEdit} onClick={saveEdit}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
