import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client"

const authLink = new ApolloLink((operation, forward) => {
  const token = typeof window !== "undefined"
    ? localStorage.getItem("telconova-token")
    : null

  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  })
  return forward(operation)
})

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ORDERS, // <— tu endpoint
})

export const apollo = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
