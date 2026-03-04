import { defaultLocale, getPrefix } from "intlayer";

import { type AuthSession, authClient } from "@/lib/auth-client";

export const getSessionOrNull = async (): Promise<AuthSession | null> => {
  try {
    const response = await authClient.getSession();

    if (response.error) {
      return null;
    }

    const session = response.data;

    if (
      !session ||
      typeof session !== "object" ||
      !("session" in session) ||
      !("user" in session)
    ) {
      return null;
    }

    return session as AuthSession;
  } catch {
    return null;
  }
};

export const isAuthedSession = (
  session: AuthSession | null | undefined
): session is AuthSession => session !== null && session !== undefined;

export const getSafeRedirectPath = (
  redirectTarget: string | undefined
): string | null => {
  if (!redirectTarget) {
    return null;
  }

  if (!redirectTarget.startsWith("/") || redirectTarget.startsWith("//")) {
    return null;
  }

  if (redirectTarget.includes("://")) {
    return null;
  }

  return redirectTarget;
};

export const getLocalizedAppPath = (
  path: `/${string}`,
  locale: string | undefined
): string => {
  const { localePrefix } = getPrefix(locale ?? defaultLocale);

  return localePrefix ? `/${localePrefix}${path}` : path;
};

export const validateAuthRedirectSearch = (
  search: Record<string, unknown>
): { redirect?: string } => ({
  redirect: typeof search.redirect === "string" ? search.redirect : undefined,
});
