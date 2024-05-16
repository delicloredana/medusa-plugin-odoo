
import Medusa from "@medusajs/medusa-js"
import { QueryClient } from "@tanstack/react-query"

// Defaults to standard port for Medusa server
export let MEDUSA_BACKEND_URL = "http://localhost:9000"

export const queryClient = new QueryClient()
export const medusaClient = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  maxRetries: 3,
})
