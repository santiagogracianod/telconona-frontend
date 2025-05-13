// Este archivo inicializa MSW en el cliente
export async function initMocks() {
  if (typeof window === "undefined") {
    return
  }

  // Solo inicializar MSW en desarrollo
  if (process.env.NODE_ENV === "development") {
    const { worker } = await import("@/lib/mocks/browser")
    return worker.start({
      onUnhandledRequest: "bypass", // No mostrar advertencias para solicitudes no manejadas
    })
  }
}
