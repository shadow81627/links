import { InferSelectModel } from "drizzle-orm";
import { links } from "~/server/database/schema/links";
import { first } from "lodash-es";
export class Link {
  static async firstOrCreate(data: InferSelectModel<typeof links> | URL) {
    if (!(data.hostname || data.pathname)) return;
    const existingLink = await db.query.links.findFirst({
      where: (links, { eq, and }) => {
        if (data.hostname && data.pathname) {
          return and(
            eq(links.hostname, data.hostname),
            eq(links.pathname, data.pathname),
          );
        }
        if (data.hostname) {
          return eq(links.hostname, data.hostname);
        }
        if (data.pathname) {
          return eq(links.pathname, data.pathname);
        }
      },
    });
    if (existingLink) return existingLink;
    const results = await db
      .insert(links)
      .values({
        protocol: data.protocol,
        hostname: data.hostname,
        pathname: data.pathname,
        hash: data.hash !== "" ? data.hash : undefined,
        search: data.search !== "" ? data.search : undefined,
      })
      .returning();
    return first(results);
  }
}
