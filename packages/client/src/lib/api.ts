import type { ApiRoutes } from "@server/app"
import { hc } from "hono/client"

const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8787'

const client = hc<ApiRoutes>(baseUrl);
export const api = client.api;