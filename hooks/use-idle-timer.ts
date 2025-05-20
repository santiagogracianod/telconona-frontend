import { useEffect, useRef } from "react"

export function useIdleTimer(timeout: number, onTimeout: () => void) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      onTimeout()
    }, timeout)
  }

  useEffect(() => {
    const handleActivity = () => resetTimer()

    // Escuchar eventos de actividad del usuario
    window.addEventListener("mousemove", handleActivity)
    window.addEventListener("keydown", handleActivity)
    window.addEventListener("click", handleActivity)
    window.addEventListener("scroll", handleActivity)

    // Configurar el temporizador inicial
    resetTimer()

    return () => {
      // Limpiar eventos y temporizador al desmontar
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      window.removeEventListener("mousemove", handleActivity)
      window.removeEventListener("keydown", handleActivity)
      window.removeEventListener("click", handleActivity)
      window.removeEventListener("scroll", handleActivity)
    }
  }, [timeout, onTimeout])
}