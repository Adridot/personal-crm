import { defineConfig } from "drizzle-kit";

import { getRequiredEnv } from "./src/config/get-required-env";
import { loadApiEnvironment } from "./src/config/load-env";

loadApiEnvironment();

export default defineConfig({
  dbCredentials: {
    url: getRequiredEnv("DATABASE_URL"),
  },
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/db/schema/index.ts",
});
