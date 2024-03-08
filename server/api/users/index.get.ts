import { users } from "~/server/database/schema/users";
import { sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  if (!user) {
    throw createError({
      message: "Unauthorized",
      statusCode: 401,
    });
  }
  const values = await db.query.users.findMany({
    extras: {
      createdAt: sql`(strftime('%Y-%m-%dT%H:%M:%fZ', ${users.createdAt}))`.as(
        "created_at",
      ),
    },
    columns: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      createdAt: true,
    },
  });
  const data = values.map(({ id, ...attributes }) => ({
    id,
    type: "users",
    attributes,
  }));
  return { data };
});
