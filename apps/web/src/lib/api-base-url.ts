const DEFAULT_DEV_API_BASE_URL = "http://localhost:3000";
const TRAILING_SLASH_REGEX = /\/$/;

const readEnvApiBaseUrl = (): string | undefined => {
  const value = import.meta.env.VITE_API_BASE_URL;

  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim();

  return normalized.length > 0 ? normalized : undefined;
};

export const getApiBaseUrl = (): string => {
  const envApiBaseUrl = readEnvApiBaseUrl();

  if (envApiBaseUrl) {
    return envApiBaseUrl.replace(TRAILING_SLASH_REGEX, "");
  }

  if (import.meta.env.DEV) {
    return DEFAULT_DEV_API_BASE_URL;
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return DEFAULT_DEV_API_BASE_URL;
};

export const buildApiUrl = (path: string): string =>
  new URL(path, getApiBaseUrl()).toString();
