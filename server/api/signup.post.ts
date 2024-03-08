import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import { users } from "~/server/database/schema/users";
import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  const loggedIn = event.context.session;
  if (!loggedIn) {
    throw createError({
      message: "Unauthorized",
      statusCode: 401,
    });
  }
  const formData = await readFormData(event);
  const email = formData.get("email");
  if (typeof email !== "string" || email.length < 3) {
    throw createError({
      message: "Invalid email",
      statusCode: 400,
    });
  }
  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    throw createError({
      message: "Invalid password",
      statusCode: 400,
    });
  }

  const existing = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existing) {
    throw createError({
      message: "Invalid email",
      statusCode: 400,
    });
  }

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  await db.insert(users).values({
    id: userId,
    email: email,
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    hashed_password: hashedPassword,
  });

  const session = await lucia.createSession(userId, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize(),
  );
});
