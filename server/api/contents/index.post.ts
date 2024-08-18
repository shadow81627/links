// import { sql } from "drizzle-orm";
import { Link } from "~/server/database/models/link";
import { contentsLinks } from "~/server/database/schema/contents_links";
import { Content } from "~/server/database/models/content";
import { createInsertSchema } from "drizzle-valibot";
import { safeParse, string, url, pipe, undefined_ } from "valibot";
import { contents } from "~/server/database/schema/contents";
import { InferSelectModel, and, eq } from "drizzle-orm";
import { links } from "~/server/database/schema/links";

async function createContentsLink(
  content: InferSelectModel<typeof contents>,
  link: InferSelectModel<typeof links>,
) {
  const existing = await db
    .select()
    .from(contentsLinks)
    .where(
      and(
        eq(contentsLinks.contentId, content.id),
        eq(contentsLinks.linkId, link.id),
      ),
    );
  if (existing) return existing;
  return await db
    .insert(contentsLinks)
    .values({ contentId: content.id, linkId: link.id })
    .returning();
}

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  if (!user) {
    throw createError({
      message: "Unauthorized",
      statusCode: 401,
    });
  }

  const contentSchema = createInsertSchema(contents, {
    id: () => undefined_(),
  });
  const formData = await readFormData(event);
  const validation = safeParse(contentSchema, Object.fromEntries(formData));

  if (!validation.success) {
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
  const linkValidation = safeParse(
    UrlSchema,
    Object.fromEntries(formData)?.url,
  );
  const link = linkValidation.success
    ? await Link.firstOrCreate(new URL(linkValidation.output ?? ""))
    : undefined;

  const content = await Content.firstOrCreate(validation.output);

  if (link && content?.id) {
    await createContentsLink(content, link);
  }

  const data = {
    id: content?.id,
    type: "contents",
    attributes: { ...content },
  };
  return { data };
});
