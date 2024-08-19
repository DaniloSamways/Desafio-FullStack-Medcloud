import dotenv from "dotenv";

dotenv.config();

export const env = {
  postgres: {
    host: process.env.POSTGRES_URL,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DB,
    port: Number(process.env.POSTGRES_PORT ?? "5432"),
  }
}