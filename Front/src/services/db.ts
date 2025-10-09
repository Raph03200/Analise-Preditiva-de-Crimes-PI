import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'policia',
  password: 'unhadourada',
  port: 5432,
});

export default pool;
