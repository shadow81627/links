import { Lucia } from "lucia";
import { users } from "~/server/database/schema/users";
import { sessions } from "~/server/database/schema/sessions";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";

const adapter = new DrizzleSQLiteAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !process.dev,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      firstName: attributes.firstName,
      lastName: attributes.lastName,
    };
  },
});

interface DatabaseUserAttributes {
  email: string;
  firstName: string;
  lastName: string;
}

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
