import { contents } from "~/server/database/schema/contents";
import { sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  if (!user) {
    throw createError({
      message: "Unauthorized",
      statusCode: 401,
    });
  }
  const values = await db.query.contents.findMany({
    extras: {
      createdAt:
        sql`(strftime('%Y-%m-%dT%H:%M:%fZ', ${contents.createdAt}))`.as(
          "created_at",
        ),
    },
  });
  const data = values.map(({ id, ...attributes }) => ({
    id,
    type: "contents",
    attributes,
  }));
  return { data };
});
