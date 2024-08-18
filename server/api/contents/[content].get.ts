import { contents } from "~/server/database/schema/contents";
import { eq, sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  if (!user) {
    throw createError({
      message: "Unauthorized",
      statusCode: 401,
    });
  }
  const slug = getRouterParam(event, "content") ?? "";
  const values = await db.query.contents.findFirst({
    where: eq(contents.slug, slug),
    extras: {
      createdAt:
        sql`(strftime('%Y-%m-%dT%H:%M:%fZ', ${contents.createdAt}))`.as(
          "created_at",
        ),
    },
  });

  if (!values) {
    throw createError({
      message: "Not Found",
      statusCode: 404,
    });
  }

  const { id, ...attributes } = values;
  const data = {
    id,
    type: "contents",
    attributes,
  };
  return { data };
});
