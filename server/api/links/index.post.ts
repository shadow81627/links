import { Link } from "~/server/database/models/link";
// import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-valibot";
import { links } from "~/server/database/schema/links";
import { parse, pipe, safeParse, string, url } from "valibot";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  if (!user) {
    throw createError({
      message: "Unauthorized",
      statusCode: 401,
    });
  }
  // https://www.nexusmods.com/stardewvalley/mods/3040

  const schema = createInsertSchema(links, {});

  const formData = await readFormData(event);
  const validation = parse(schema, Object.fromEntries(formData));
  if (!validation) {
    throw createError({
      message: "Unprocessable Content",
      statusCode: 422,
      data: validation,
    });
  }

  const UrlSchema = pipe(
    string("A URL must be string."),
    url("The URL is badly formatted."),
  );
  const urlValidation = safeParse(UrlSchema, Object.fromEntries(formData)?.url);
  if (!urlValidation.success) {
    throw createError({
      message: "Unprocessable Content",
      statusCode: 422,
      data: validation,
    });
  }
  const link = await Link.firstOrCreate(new URL(urlValidation.output ?? ""));

  // const values = await db.query.links.findMany({
  //   extras: {
  //     createdAt: sql`(strftime('%Y-%m-%dT%H:%M:%fZ', ${links.createdAt}))`.as(
  //       "created_at",
  //     ),
  //   },
  // });
  const data = {
    id: link?.id,
    type: "links",
    attributes: { ...link },
  };
  return { data };
});
