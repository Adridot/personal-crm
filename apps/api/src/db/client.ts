import { Logger } from "@nestjs/common";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { getRequiredEnv } from "../config/get-required-env";
import { loadApiEnvironment } from "../config/load-env";

loadApiEnvironment();

const connectionString = getRequiredEnv("DATABASE_URL");
const logger = new Logger("DatabasePool");

export const pool = new Pool({
  connectionString,
});

pool.on("error", (error: Error) => {
  logger.error("Unexpected PostgreSQL pool error", error.stack);
});

export const dbClient = drizzle(pool);
