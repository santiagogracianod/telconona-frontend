"use client"

import type React from "react"

import { useState } from "react"
// import { useMutation, useQuery } from "@apollo/client"
// import { ADD_ORDER_EVIDENCE } from "@/lib/graphql/mutations"
// import { GET_ORDER_BY_ID } from "@/lib/graphql/queries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Upload, Loader2, ImageIcon, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Datos de ejemplo para evidencias
const mockEvidence = [
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
  {
    id: "ev-2",
    date: "2023-05-10T11:30:00Z",
    comment: "Instalación en progreso",
    imageUrl: "/placeholder.svg?height=300&width=300",
    user: {
      id: "1",
      name: "Técnico Demo",
    },
  },
]

type OrderEvidenceProps = Readonly<{
  id: string;
}>;

export function OrderEvidence( { id }: OrderEvidenceProps) {
  const [comment, setComment] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderEvidence, setOrderEvidence] = useState(mockEvidence)
  const { toast } = useToast()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setImages([...images, ...newFiles])

      // Create preview URLs
      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file))
      setPreviewUrls([...previewUrls, ...newPreviewUrls])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!comment.trim() && images.length === 0) {
      toast({
        title: "Error",
        description: "Debes añadir un comentario o al menos una imagen.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulamos una operación asíncrona
    setTimeout(() => {
      // Crear nueva evidencia
      const newEvidence = {
        id: `ev-${Date.now()}`,
        date: new Date().toISOString(),
        comment: comment.trim(),
        imageUrl: images.length > 0 ? "/placeholder.svg?height=300&width=300" : null,
        user: {
          id: "1",
          name: "Técnico Demo",
        },
      }

      // Actualizar el estado local
      setOrderEvidence([newEvidence, ...orderEvidence])

      toast({
        title: "Evidencia cargada",
        description: `Se han cargado ${images.length} imágenes y comentarios para la orden ${id}.`,
      })

      // Limpiar el formulario
      setComment("")
      setImages([])
      setPreviewUrls([])
      setIsSubmitting(false)
    }, 1500)
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    const newPreviewUrls = [...previewUrls]

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviewUrls[index])

    newImages.splice(index, 1)
    newPreviewUrls.splice(index, 1)

    setImages(newImages)
    setPreviewUrls(newPreviewUrls)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evidencias y comentarios</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upload">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span>Cargar evidencia</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Historial</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4 pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="images">Imágenes</Label>
                <div className="grid gap-4">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted/60"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Camera className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="mb-1 text-sm text-muted-foreground">
                          <span className="font-medium">Haz clic para cargar</span> o arrastra y suelta
                        </p>
                        <p className="text-xs text-muted-foreground">PNG, JPG o JPEG (máx. 10MB)</p>
                      </div>
                      <Input
                        id="dropzone-file"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>

                  {previewUrls.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url ?? "/placeholder.svg"}
                            alt={`Evidencia ${index + 1}`}
                            className="h-24 w-full object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <span className="sr-only">Eliminar</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 6 6 18" />
                              <path d="m6 6 12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Comentario</Label>
                <Textarea
                  id="comment"
                  placeholder="Describe el trabajo realizado o los problemas encontrados..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                />
              </div>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cargando evidencia...
                  </>
                ) : (
                  "Cargar evidencia"
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 pt-4">
            <div className="space-y-4">
              {orderEvidence.length > 0 ? (
                orderEvidence.map((evidence: any) => (
                  <div key={evidence.id} className="space-y-2 border-b pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Evidencia cargada</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{new Date(evidence.date).toLocaleString()}</span>
                    </div>
                    <p className="text-sm">{evidence.comment}</p>
                    {evidence.imageUrl && (
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <img
                          src={evidence.imageUrl ?? "/placeholder.svg"}
                          alt={`Evidencia ${evidence.id}`}
                          className="h-20 w-full object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center text-sm text-muted-foreground py-4">No hay evidencias para mostrar</div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
