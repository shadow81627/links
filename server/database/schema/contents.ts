import { sql, relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { files } from "./files";
import { links } from "./links";
import { ulid } from "ulidx";

export const contents = sqliteTable("contents", {
  id: text("id")
    .primaryKey()
    .$default(() => ulid()),
  slug: text("slug"),
  name: text("name"),
  description: text("description"),
  attributes: text("attributes", { mode: "json" }),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at"),
  deletedAt: text("deleted_at"),
});

export const contentsRelations = relations(contents, ({ many }) => ({
  files: many(files),
  links: many(links),
}));
