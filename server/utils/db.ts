import { createClient as createLibSQLClient } from "@libsql/client/http";
import { drizzle } from "drizzle-orm/libsql";
import * as users from "~/server/database/schema/users";
import * as sessions from "~/server/database/schema/sessions";
import * as contents from "~/server/database/schema/contents";
import * as links from "~/server/database/schema/links";

if (!(process.env.TURSO_DB_URL && process.env.TURSO_DB_TOKEN)) {
  throw new Error("No database configured for production");
}

export const libsqlClient = createLibSQLClient({
  url: process.env.TURSO_DB_URL,
  authToken: process.env.TURSO_DB_TOKEN,
});

export const db = drizzle(libsqlClient, {
  schema: { ...users, ...sessions, ...contents, ...links },
});
