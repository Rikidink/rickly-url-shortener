import { Hono } from 'hono'
import type { Db } from './db'
import { dbMiddleware } from './db'
import { cors } from 'hono/cors';

// attach bindings and db 
const app = new Hono<{ Bindings: Env; Variables: { db: Db } }>();

app.use('*', dbMiddleware);

app.use('/api/*', cors({
  origin: 'http://localhost:5173',
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
}));

const testRoute = app.get('/', (c) => c.text('Hello Cloudflare Workers!'));

const apiRoutes = app.basePath("/api")
  .route('/test', testRoute)

export default app;
export type ApiRoutes = typeof apiRoutes;