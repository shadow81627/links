import { sql, relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { contents } from "./contents";
import { links } from "./links";

export const contentsLinks = sqliteTable("contents_links", {
  id: text("id").primaryKey(),
  contentId: text("content_id").notNull(),
  // .references(() => contents.id),
  linkId: text("link_id").notNull(),
  // .references(() => links.id),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at"),
  deletedAt: text("deleted_at"),
});

export const contentsLinksRelations = relations(contentsLinks, ({ one }) => ({
  content: one(contents, {
    fields: [contentsLinks.contentId],
    references: [contents.id],
  }),
  link: one(links, {
    fields: [contentsLinks.linkId],
    references: [links.id],
  }),
}));
