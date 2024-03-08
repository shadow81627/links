// import { users } from "~/server/database/schema/users";
// import { eq } from "drizzle-orm";
import { createAvatar } from "@dicebear/core";
import { shapes } from "@dicebear/collection";

export default defineEventHandler(async (event) => {
  // const session = event.context.session;
  // if (!session) {
  //   throw createError({
  //     message: "Unauthorized",
  //     statusCode: 401,
  //   });
  // }
  const userId = getRouterParam(event, "user") ?? "";
  // const user = await db.query.users.findFirst({
  //   columns: {
  //     id: true,
  //   },
  //   where: eq(users.id, userId),
  // });
  // if (!user) {
  //   throw createError({
  //     message: "User Not Found",
  //     statusCode: 404,
  //   });
  // }

  const avatar = createAvatar(shapes, {
    seed: userId,
  });
  const image = avatar.toString();
  appendResponseHeader(event, "content-type", "image/svg+xml");
  return image;
});
