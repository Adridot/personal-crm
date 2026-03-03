import { registerAs } from "@nestjs/config";

const DEFAULT_DEVELOPMENT_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
] as const;
const TRAILING_SLASH_REGEX = /\/$/;

const normalizeOrigin = (origin: string): string =>
  origin.trim().replace(TRAILING_SLASH_REGEX, "");

const parseAllowedOrigins = (value: string | undefined): string[] => {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((origin) => normalizeOrigin(origin))
    .filter((origin) => origin.length > 0);
};

export const corsConfig = registerAs("cors", () => {
  const nodeEnv = process.env.NODE_ENV ?? "development";
  const explicitAllowedOrigins = parseAllowedOrigins(
    process.env.CORS_ALLOWED_ORIGINS
  );

  let allowedOrigins = explicitAllowedOrigins;

  if (
    allowedOrigins.length === 0 &&
    (nodeEnv === "development" || nodeEnv === "test")
  ) {
    allowedOrigins = [...DEFAULT_DEVELOPMENT_ALLOWED_ORIGINS];
  }

  return {
    allowedOrigins,
    credentials: true,
  };
});
