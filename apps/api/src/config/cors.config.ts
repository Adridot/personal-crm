import { registerAs } from "@nestjs/config";

import { resolveAllowedOrigins } from "./origins";

export const corsConfig = registerAs("cors", () => {
  const allowedOrigins = resolveAllowedOrigins(
    process.env.CORS_ALLOWED_ORIGINS,
    process.env.NODE_ENV
  );

  return {
    allowedOrigins,
    credentials: true,
  };
});
