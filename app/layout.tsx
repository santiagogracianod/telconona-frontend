import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"     // ⬅︎ nuevo

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TelcoNova - Seguimiento de Órdenes",
  description: "Sistema de seguimiento de órdenes en proceso para técnicos de TelcoNova",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* Todos los providers viven ahora en el componente client */}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
