import { createAuthClient } from "better-auth/react";

import { getApiBaseUrl } from "@/features/auth/lib/api-base-url";

const apiBaseUrl = getApiBaseUrl();

export const authClient = createAuthClient({
  basePath: "/api/auth",
  ...(apiBaseUrl ? { baseURL: apiBaseUrl } : {}),
});
