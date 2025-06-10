// lib/api-client.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://musical-fishstick-v6pqrx4466xx2rw6-8080.app.github.dev';

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  // Obtener el token de autenticación
  const token = typeof window !== 'undefined' ? localStorage.getItem('telconova-token') : null;

  // Configurar headers con autenticación
  const headers = {
    'accept': '*/*',
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.statusText}`);
  }

  return response.json();
}

// Métodos para diferentes tipos de peticiones
export const api = {
  get: (endpoint: string) => fetchWithAuth(endpoint),
  
  post: (endpoint: string, data: any) => fetchWithAuth(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  put: (endpoint: string, data: any) => fetchWithAuth(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (endpoint: string) => fetchWithAuth(endpoint, {
    method: 'DELETE',
  }),
};