import { Argon2id } from "oslo/password";
import { users } from "~/server/database/schema/users";
import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
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

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email.toLowerCase()))
    .get();
  if (!existingUser?.hashed_password) {
    // NOTE:
    // Returning immediately allows malicious actors to figure out valid emails from response times,
    // allowing them to only focus on guessing passwords in brute-force attacks.
    // As a preventive measure, you may want to hash passwords even for invalid emails.
    // However, valid emails can be already be revealed with the signup page among other methods.
    // It will also be much more resource intensive.
    // Since protecting against this is none-trivial,
    // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
    // If emails are public, you may outright tell the user that the email is invalid.
    throw createError({
      message: "Incorrect email",
      statusCode: 400,
    });
  }

  const validPassword = await new Argon2id().verify(
    existingUser.hashed_password,
    password,
  );
  if (!validPassword) {
    throw createError({
      message: "Incorrect email or password",
      statusCode: 400,
    });
  }

  const session = await lucia.createSession(existingUser.id, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize(),
  );
});
