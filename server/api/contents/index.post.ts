import { contents } from "~/server/database/schema/contents";
// import { sql } from "drizzle-orm";

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
  const body = new FormData();
  body.append("url", url);
  await $fetch("/api/links", {
    method: "POST",
    body,
    headers: {
      Origin: getHeader(event, "Host"),
      Host: getHeader(event, "Host"),
      Cookie: `${lucia.sessionCookieName}=${getCookie(event, lucia.sessionCookieName)}`,
    },
  });

  const existingContent = await db.query.contents.findFirst({
    where: (contents, { eq }) => and(eq(contents.hostname, url.hostname)),
  });
  let link;
  if (!existingContent) {
    link = await db
      .insert(contents)
      .values({
        name: formData.get("name"),
        description: formData.get("description"),
      })
      .returning();
  } else {
    link = existingContent;
  }

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
    id: link.id,
    type: "contents",
    attributes: { ...link },
  };
  return { data };
});
