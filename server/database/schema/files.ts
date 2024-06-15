import { relations, sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { links } from "./links";

export const files = sqliteTable("files", {
  id: text("id").primaryKey(),
  linkId: text("link_id").notNull(),
  // .references(() => links.id),
  name: text("name"),
  mimeType: text("mime_type"),
  attributes: text("attributes", { mode: "json" }),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at"),
  deletedAt: text("deleted_at"),
});

export const filesRelations = relations(files, ({ one }) => ({
  link: one(links, {
    fields: [files.linkId],
    references: [links.id],
  }),
}));
