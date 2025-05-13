# TelcoNova – Frontend de Seguimiento de Órdenes  
> **🚧 Proyecto en construcción (MVP 0.1)**  
> Las secciones y funcionalidades listadas aquí están en desarrollo activo; el contenido puede cambiar sin previo aviso.  

![CI Status](https://img.shields.io/badge/build-pending-lightgrey) <!-- Sustituye por tu badge real de GitHub Actions/Vercel cuando lo tengas -->

---

## ✨ Visión

Aplicación web para que los técnicos de **TelcoNova** gestionen sus órdenes en proceso:  
- Ver órdenes asignadas y su progreso  
- Actualizar estado (p. ej. “En curso” → “Finalizado”)  
- Cargar evidencias (fotos, notas)  
- Recibir notificaciones en tiempo real *(próximamente)*  

---

## 🗺️ Roadmap breve

| Fase | Funcionalidad | Estado |
|------|---------------|--------|
| **MVP 0.1** | Login con JWT, listados de órdenes, cambio de estado con evidencia | 🚧 en progreso |
| **MVP 0.2** | Filtro avanzado por fecha/estado, carga múltiple de fotos | 🚧 en progreso |
| **MVP 0.3** | Notificaciones en vivo (WebSockets), PWA offline | ⏳ pendiente |
| **1.0** | Internacionalización (ES/EN), tests end-to-end completos | ⏳ pendiente |

---

## 🔧 Tecnologías

- **Next.js 14** (App Router)  
- **TypeScript** – tipado estricto  
- **Tailwind CSS** – utilidades de estilo  
- **Shadcn/UI** – sistema de componentes accesibles  
- **Apollo Client** – consumo de API GraphQL  
- **JWT** – autenticación basada en tokens  
- **MSW** – mocks de red para desarrollo y testing  
- **Vitest + React Testing Library** – pruebas unitarias/integ. *(planificado)*  

---

## ⚡ Arranque rápido

### Requisitos previos
- Node 18 LTS o superior
- npm 9 / pnpm 8
- Editor de código (recomendado VS Code)

### Instalación

```bash
git clone https://github.com/santiagogracianod/telconova-frontend.git
cd telconova-frontend
cp .env.example .env.local   # configura tus variables
npm install                  # o pnpm install
npm run dev                  # http://localhost:3000

```




