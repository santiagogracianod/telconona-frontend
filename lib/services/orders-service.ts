import axios from "axios"

export const fetchOrdersByUser = async (userId: string) => {
  const response = await axios.get(
    `https://didactic-space-journey-q7vp4wrrqrwjh9w6v-8080.app.github.dev/ordenes/usuario/${userId}`,
    {
      headers: {
        accept: "*/*",
      },
    }
  )
  return response.data
}