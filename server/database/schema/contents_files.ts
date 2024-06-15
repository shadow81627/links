import { sql, relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { contents } from "./contents";
import { files } from "./files";

export const contentsFiles = sqliteTable("contents_files", {
  id: text("id").primaryKey(),
  contentId: text("content_id").notNull(),
  // .references(() => contents.id),
  fileId: text("file_id").notNull(),
  // .references(() => files.id),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at"),
  deletedAt: text("deleted_at"),
});

export const contentsFilesRelations = relations(contentsFiles, ({ one }) => ({
  content: one(contents, {
    fields: [contentsFiles.contentId],
    references: [contents.id],
  }),
  link: one(files, {
    fields: [contentsFiles.fileId],
    references: [files.id],
  }),
}));
