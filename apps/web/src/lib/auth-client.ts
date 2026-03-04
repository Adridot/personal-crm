import { createAuthClient } from "better-auth/react";

const getSameOriginBaseUrl = (): string | undefined => {
  if (typeof window === "undefined") {
    return undefined;
  }

  return window.location.origin;
};

export const authClient = createAuthClient({
  baseURL: getSameOriginBaseUrl(),
});

export type AuthSession = typeof authClient.$Infer.Session;
