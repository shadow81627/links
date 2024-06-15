import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { ulid } from "ulidx";

export const links = sqliteTable("links", {
  id: text("id")
    .primaryKey()
    .$default(() => ulid()),
  hash: text("hash"),
  hostname: text("hostname"),
  pathname: text("pathname"),
  protocol: text("protocol"),
  search: text("search"),
  attributes: text("attributes", { mode: "json" }),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at"),
  deletedAt: text("deleted_at"),
});
