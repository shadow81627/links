import { links } from "~/server/database/schema/links";
import { sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  if (!user) {
    throw createError({
      message: "Unauthorized",
      statusCode: 401,
    });
  }
  const values = await db.query.links.findMany({
    extras: {
      createdAt: sql`(strftime('%Y-%m-%dT%H:%M:%fZ', ${links.createdAt}))`.as(
        "created_at",
      ),
    },
  });
  const data = values.map(({ id, ...attributes }) => ({
    id,
    type: "links",
    attributes,
  }));
  return { data };
});
