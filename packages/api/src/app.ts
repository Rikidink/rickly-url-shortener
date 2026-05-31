import { Hono } from 'hono'
import type { Db } from './db'
import { dbMiddleware } from './db'

// attach bindings and db 
const app = new Hono<{ Bindings: Env; Variables: { db: Db } }>();
app.use('*', dbMiddleware);

const testRoute = app.get('/', (c) => c.text('Hello Cloudflare Workers!'));

const apiRoutes = app.basePath("/api")
  .route('/test', testRoute)

export default app;
export type ApiRoutes= typeof apiRoutes;