// services/avances-service.ts
import { apiAdvance } from "@/lib/api-advances"

/* ---------- tipos ---------- */
export interface CreateAvanceInput {
  ordenId: number
  tecnicoId: number
  comentario: string
  tiempoInvertido: number
}

export interface Avance {
  id: string
  ordenId: number
  tecnicoId: number
  comentario: string
  tiempoInvertido: number
  creadoEn: string
}

export interface Evidencia {
  id: string
  avanceId: string
  url: string
  /* si la API devuelve más campos, añádelos aquí */
}

/* ---------- llamadas ---------- */
export async function createAvance(body: CreateAvanceInput): Promise<Avance> {
  const { data } = await apiAdvance.post<Avance>("/api/v1/avances", body)
  return data
}

export async function getAvancesByOrden(
  orderId: number
): Promise<(Avance & { imagenes?: Evidencia[] })[]> {
  const { data } = await apiAdvance.get(
    `/api/v1/avances/orden/${orderId}`
  )
  return data
}

/** Sube 1-3 imágenes a un avance */
export async function uploadImages(
  avanceId: string,
  files: File[]
): Promise<Evidencia[]> {
  const form = new FormData()
  files.forEach(f => form.append("files", f))
  const { data } = await apiAdvance.post<Evidencia[]>(
    `/api/v1/avances/${avanceId}/evidencias/multiple`,
    form,
    { headers: { "Content-Type": "multipart/form-data" } }
  )
  return data
}

/* ---------- obtener evidencias de un avance ---------- */
export async function getEvidenciasByAvance(
  avanceId: string
): Promise<Evidencia[]> {
  const { data } = await apiAdvance.get<Evidencia[]>(
    `/api/v1/avances/${avanceId}/evidencias`
  )
  return data
}


/* PUT comentario */
export async function updateComentario(avanceId: string, comentario: string) {
  await apiAdvance.put(
    `/api/v1/avances/${avanceId}/comentario`,
    null,
    { params: { comentario } }
  )
}

/* PUT tiempo + justificación */
export async function updateTiempo(
  avanceId: string,
  tiempoNuevo: number,
  justificacion: string
) {
  await apiAdvance.put(
    `/api/v1/avances/${avanceId}/editar-tiempo`,
    { tiempoNuevo, justificacion }
  )
}
