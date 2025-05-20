"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"

export function OrderMaterials({ id }: { id: string }) {
  const [materials, setMaterials] = useState<any[]>([])
  const [requiresMaterial, setRequiresMaterial] = useState(false)
  const [usedMaterials, setUsedMaterials] = useState<{ id: string; quantity: number }[]>([])
  const [customMaterial, setCustomMaterial] = useState("")
  const [customMaterialComment, setCustomMaterialComment] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrderMaterials = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await axios.get(
          `https://didactic-space-journey-q7vp4wrrqrwjh9w6v-8080.app.github.dev/ordenes/${id}`
        )
        const order = response.data
        setRequiresMaterial(order.tipo.requiereMaterial)
        setMaterials(order.tipo.materiales || []) // Suponiendo que `materiales` es una lista de materiales disponibles
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.statusText || err.message)
        } else {
          setError("Error inesperado al obtener los materiales de la orden")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchOrderMaterials()
  }, [id])

  const handleMaterialChange = (materialId: string, quantity: number) => {
    setUsedMaterials((prev) => {
      const existing = prev.find((m) => m.id === materialId)
      if (existing) {
        return prev.map((m) => (m.id === materialId ? { ...m, quantity } : m))
      }
      return [...prev, { id: materialId, quantity }]
    })
  }

  const handleSubmit = async () => {
    try {
      const payload = {
        usedMaterials,
        customMaterial: customMaterial ? { name: customMaterial, comment: customMaterialComment } : null,
      }
      console.log("Enviando materiales utilizados:", payload)
      // Aquí puedes enviar los datos al backend
    } catch (error) {
      console.error("Error al enviar los materiales utilizados:", error)
    }
  }

  if (loading) {
    return <p>Cargando materiales...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  if (!requiresMaterial) {
    return null
  }

  return (
    <Card>
      <CardHeader className="bg-telco-500 text-white rounded-t-lg">
        <CardTitle>Materiales utilizados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Selecciona los materiales utilizados</h3>
          {materials.map((material) => (
            <div key={material.id} className="flex items-center gap-4">
              <span className="flex-1">{material.nombre}</span>
              <Input
                type="number"
                min="0"
                placeholder="Cantidad"
                onChange={(e) => handleMaterialChange(material.id, parseInt(e.target.value, 10))}
              />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">¿Material no listado?</h3>
          <Input
            placeholder="Nombre del material"
            value={customMaterial}
            onChange={(e) => setCustomMaterial(e.target.value)}
          />
          <Textarea
            placeholder="Comentario sobre el material utilizado"
            value={customMaterialComment}
            onChange={(e) => setCustomMaterialComment(e.target.value)}
            rows={4}
          />
        </div>

        <Button onClick={handleSubmit} variant="telco">
          Guardar materiales
        </Button>
      </CardContent>
    </Card>
  )
}