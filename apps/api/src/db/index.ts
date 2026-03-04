import { drizzle } from "drizzle-orm/node-postgres";

import { pool as dbPool } from "./client";
import {
  account,
  accountRelations,
  session,
  sessionRelations,
  user,
  userRelations,
  verification,
} from "./schema/auth.generated";

export const pool = dbPool;

export const schema = {
  account,
  accountRelations,
  session,
  sessionRelations,
  user,
  userRelations,
  verification,
} as const;

export const db = drizzle(dbPool, { schema });
