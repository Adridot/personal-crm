import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { getRequiredEnv } from "../config/get-required-env";
import { loadApiEnvironment } from "../config/load-env";

loadApiEnvironment();

const connectionString = getRequiredEnv("DATABASE_URL");

export const pool = new Pool({
  connectionString,
});

export const dbClient = drizzle(pool);
