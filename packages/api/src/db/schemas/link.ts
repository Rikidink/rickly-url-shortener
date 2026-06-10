import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid"

export const linksTable = sqliteTable("links", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  shortCode: text("short_code").notNull().unique().$defaultFn(() => nanoid(7)),
  originalUrl: text("original_url").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date())
});