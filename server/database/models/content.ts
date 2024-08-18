import { InferSelectModel } from "drizzle-orm";
import slugify from "slugify";
import { contents } from "~/server/database/schema/contents";
import { first } from "lodash-es";

export class Content {
  /**
   * Generate slug of title
   * @param data
   * @returns
   */
  static generateSlug(data: InferSelectModel<typeof contents>) {
    if (data.name) return slugify(data.name);
  }

  /**
   * Find existing content by slug or create new
   * @param data
   * @returns
   */
  static async firstOrCreate(data: InferSelectModel<typeof contents>) {
    const slug = data.slug ?? this.generateSlug(data);
    if (!slug) return;
    const existing = await db.query.contents.findFirst({
      where: (contents, { eq }) => eq(contents.slug, slug),
    });
    if (existing) return existing;
    const results = await db
      .insert(contents)
      .values({ ...data, slug })
      .returning();
    return first(results);
  }
}
