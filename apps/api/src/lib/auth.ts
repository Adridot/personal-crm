import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { getRequiredEnv } from "../config/get-required-env";
import { loadApiEnvironment } from "../config/load-env";
import { normalizeOrigin, resolveAllowedOrigins } from "../config/origins";
import { dbClient } from "../db/client";
import { account, session, user, verification } from "../db/schema/index";

loadApiEnvironment();

const defaultBaseUrl = `http://localhost:${process.env.API_PORT ?? "3000"}`;
const baseURL = normalizeOrigin(process.env.BETTER_AUTH_URL ?? defaultBaseUrl);
const trustedOrigins = Array.from(
  new Set([
    baseURL,
    ...resolveAllowedOrigins(
      process.env.BETTER_AUTH_TRUSTED_ORIGINS ??
        process.env.CORS_ALLOWED_ORIGINS,
      process.env.NODE_ENV
    ),
  ])
);
const authSchema = { account, session, user, verification };

export const auth = betterAuth({
  baseURL,
  database: drizzleAdapter(dbClient, {
    provider: "pg",
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  secret: getRequiredEnv("BETTER_AUTH_SECRET"),
  trustedOrigins,
});
