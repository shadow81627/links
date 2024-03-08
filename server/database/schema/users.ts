import { sql, relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sessions } from "./sessions";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  hashed_password: text("hashed_password"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at"),
});

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
}));
