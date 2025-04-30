import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : false
});

export const db = {
  query: (text: string, params?: any[]) => pool.query(text, params),
  pool,
};
