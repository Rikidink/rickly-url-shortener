import { drizzle } from "drizzle-orm/d1";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { createMiddleware } from "hono/factory";

export type Db = DrizzleD1Database;

// create middleware that can attach drizzle D1 db to every context
export const dbMiddleware = createMiddleware<{
  Bindings: Env;
  Variables: { db: Db };
}>(async (c, next) => {
  c.set('db', drizzle(c.env.DB));
  await next();
});