import axios from "axios"

export const apiAdvance = axios.create({
  baseURL: 'https://tracking-service-sb8b.onrender.com', 
  headers: {"accept": "*/*", "Content-Type": "application/json" },
})

// Añadir el token automáticamente a cada petición
apiAdvance.interceptors.request.use(config => {
  const token = typeof window !== "undefined" 
    ? localStorage.getItem("telconova-token") 
    : null
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
