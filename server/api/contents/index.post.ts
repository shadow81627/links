// import { sql } from "drizzle-orm";
import { Link } from "~/server/database/models/link";
import { contentsLinks } from "~/server/database/schema/contents_links";
import { Content } from "~/server/database/models/content";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  if (!user) {
    throw createError({
      message: "Unauthorized",
      statusCode: 401,
    });
  }

  const formData = await readFormData(event);

  const url = new URL(formData.get("url") ?? "");
  const link = Link.firstOrCreate(url);

  const content = await Content.firstOrCreate({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  // const existingContentLink = await db.query.findFirst({
  //   where: (contents, { eq }) => and(eq(contents.hostname, url.hostname), eq()),
  // });

  // const values = await db.query.links.findMany({
  //   extras: {
  //     createdAt: sql`(strftime('%Y-%m-%dT%H:%M:%fZ', ${links.createdAt}))`.as(
  //       "created_at",
  //     ),
  //   },
  // });
  const data = {
    id: content.id,
    type: "contents",
    attributes: { ...link },
  };
  return { data };
});
