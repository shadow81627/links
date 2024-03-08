import { users } from "~/server/database/schema/users";
import { eq, sql } from "drizzle-orm";
import { first } from "lodash-es";

export default defineEventHandler(async (event) => {
  const session = event.context.session;
  if (!session) {
    throw createError({
      message: "Unauthorized",
      statusCode: 401,
    });
  }
  const userId = getRouterParam(event, "user") ?? "";
  const values = await db.query.users.findFirst({
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
    where: eq(users.id, userId),
    with: {
      sessions: {
        extras: {
          createdAt:
            sql`(strftime('%Y-%m-%dT%H:%M:%fZ', ${users.createdAt}))`.as(
              "created_at",
            ),
        },
        columns: {
          createdAt: true,
          // expiresAt: true,
        },
        limit: 1,
        orderBy: (sessions, { desc }) => [desc(sessions.createdAt)],
      },
    },
  });
  if (!values) {
    throw createError({
      message: "User Not Found",
      statusCode: 404,
    });
  }
  const { id, sessions, ...attributes } = values;
  const lastLoginAt = first(sessions)?.createdAt;
  const data = {
    id,
    type: "users",
    attributes: {
      ...attributes,
      lastLoginAt,
    },
  };
  return { data };
});
