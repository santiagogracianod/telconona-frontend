import { ApolloClient, InMemoryCache, createHttpLink, from } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"

// Constante para habilitar el modo de desarrollo
const DEV_MODE = process.env.NODE_ENV === "development"

// Crear el enlace HTTP
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "https://api.telconova.com/graphql",
})

// Configurar el enlace de autenticación
const authLink = setContext((_, { headers }) => {
  // Obtener el token del localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("telconova-token") : null

  // Devolver los headers con el token de autorización
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

// Configurar el enlace de manejo de errores
const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    })
  }
})

// Crear el cliente Apollo
export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
  connectToDevTools: DEV_MODE,
})
