"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { ApolloProvider } from "@apollo/client"
import { apollo } from "@/lib/apollo-client"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <AuthProvider>
        <ApolloProvider client={apollo}>{children}</ApolloProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
