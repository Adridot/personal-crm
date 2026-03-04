const DEFAULT_DEVELOPMENT_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
] as const;

const TRAILING_SLASH_REGEX = /\/$/;

export const normalizeOrigin = (origin: string): string =>
  origin.trim().replace(TRAILING_SLASH_REGEX, "");

export const parseOriginList = (value: string | undefined): string[] => {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((origin) => normalizeOrigin(origin))
    .filter((origin) => origin.length > 0);
};

export const resolveAllowedOrigins = (
  value: string | undefined,
  nodeEnv: string | undefined
): string[] => {
  const explicitAllowedOrigins = parseOriginList(value);

  if (explicitAllowedOrigins.length > 0) {
    return explicitAllowedOrigins;
  }

  if (nodeEnv === "development" || nodeEnv === "test") {
    return [...DEFAULT_DEVELOPMENT_ALLOWED_ORIGINS];
  }

  return [];
};
