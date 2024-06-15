import { Link } from "~/server/database/models/link";
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

  const formData = await readFormData(event);
  const url = new URL(Object.fromEntries(event.node.req.body)?.url ?? "");
  const link = Link.firstOrCreate(url);

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
