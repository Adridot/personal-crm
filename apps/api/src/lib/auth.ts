import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { dbClient } from "../db/client";

export const auth = betterAuth({
  baseURL:
    process.env.BETTER_AUTH_URL ??
    `http://localhost:${process.env.API_PORT ?? "3000"}`,
  database: drizzleAdapter(dbClient, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
});
