"use client"

import type React from "react"

import { ApolloProvider as BaseApolloProvider } from "@apollo/client"
import { apolloClient } from "@/lib/apollo-client"

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <BaseApolloProvider client={apolloClient}>{children}</BaseApolloProvider>
}
