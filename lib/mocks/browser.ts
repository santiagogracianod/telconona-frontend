import { setupWorker } from "msw/browser"
import { handlers } from "./handlers"

// Este archivo configura el worker para el navegador
export const worker = setupWorker(...handlers)
