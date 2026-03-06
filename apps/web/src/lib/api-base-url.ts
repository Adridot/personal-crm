const TRAILING_SLASH_REGEX = /\/+$/;

export const resolveApiBaseUrl = (value: unknown): string | undefined => {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim();

  return normalized.length > 0
    ? normalized.replace(TRAILING_SLASH_REGEX, "")
    : undefined;
};

export const getApiBaseUrl = (): string | undefined =>
  resolveApiBaseUrl(import.meta.env.VITE_API_BASE_URL);
