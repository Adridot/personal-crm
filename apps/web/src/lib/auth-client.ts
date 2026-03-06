import { createAuthClient } from "better-auth/react";

import { getApiBaseUrl } from "./api-base-url";

export const authClient = createAuthClient({
  basePath: "/api/auth",
  baseURL: getApiBaseUrl(),
});
