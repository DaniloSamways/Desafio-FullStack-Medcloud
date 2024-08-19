import { Pool } from "pg";
import { env } from "../config";

export const pg = new Pool({
  host: env.postgres.host,
  user: env.postgres.user,
  password: env.postgres.password,
  database: env.postgres.database,
  port: Number(env.postgres.port ?? "5432"),
});
