export const AUTH_REDIRECT_PATHS = ["/contacts", "/dashboard"] as const;

export type AuthRedirectPath = (typeof AUTH_REDIRECT_PATHS)[number];

export const DEFAULT_AUTH_REDIRECT_PATH: AuthRedirectPath = "/dashboard";

const AUTH_REDIRECT_PATH_SET = new Set<AuthRedirectPath>(AUTH_REDIRECT_PATHS);

const sanitizeRedirectPath = (value: string): string => {
  const hashIndex = value.indexOf("#");
  const withNoHash = hashIndex === -1 ? value : value.slice(0, hashIndex);
  const searchIndex = withNoHash.indexOf("?");

  return searchIndex === -1 ? withNoHash : withNoHash.slice(0, searchIndex);
};

export const parseAuthRedirectPath = (
  value: unknown
): AuthRedirectPath | undefined => {
  if (typeof value !== "string") {
    return undefined;
  }

  if (!value.startsWith("/") || value.startsWith("//")) {
    return undefined;
  }

  const sanitizedValue = sanitizeRedirectPath(value);

  return AUTH_REDIRECT_PATH_SET.has(sanitizedValue as AuthRedirectPath)
    ? (sanitizedValue as AuthRedirectPath)
    : undefined;
};

export const resolveAuthRedirectPath = (value: unknown): AuthRedirectPath =>
  parseAuthRedirectPath(value) ?? DEFAULT_AUTH_REDIRECT_PATH;
