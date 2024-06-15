import { links } from "~/server/database/schema/links";
// import { sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  if (!user) {
    throw createError({
      message: "Unauthorized",
      statusCode: 401,
    });
  }
  // https://www.nexusmods.com/stardewvalley/mods/3040

  let link;
  const url = new URL(Object.fromEntries(event.node.req.body)?.url ?? "");
  const existingLink = await db.query.links.findFirst({
    where: (links, { eq, and }) =>
      and(eq(links.hostname, url.hostname), eq(links.pathname, url.pathname)),
  });
  if (!existingLink) {
    link = await db
      .insert(links)
      .values({
        protocol: url.protocol,
        hostname: url.hostname,
        pathname: url.pathname,
        hash: url.hash !== "" ? url.hash : undefined,
        search: url.search !== "" ? url.search : undefined,
      })
      .returning();
  } else {
    link = existingLink;
  }

  // const values = await db.query.links.findMany({
  //   extras: {
  //     createdAt: sql`(strftime('%Y-%m-%dT%H:%M:%fZ', ${links.createdAt}))`.as(
  //       "created_at",
  //     ),
  //   },
  // });
  const data = {
    id: link.id,
    type: "links",
    attributes: { ...link },
  };
  return { data };
});
