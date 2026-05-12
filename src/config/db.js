const { Pool } = require('pg');
const logger = require('../utils/logger');

const user = process.env.DB_USER || process.env.POSTGRES_USER || 'visa_user';
const password = process.env.DB_PASSWORD || process.env.POSTGRES_PASSWORD || 'visa_pass123';
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : (process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : 5433);
const database = process.env.DB_NAME || process.env.POSTGRES_DB || 'visa_database';

const pool = new Pool({
  user,
  host,
  database,
  password,
  port,
});

// Check connection once at startup and log result
(async () => {
  try {
    const client = await pool.connect();
    client.release();
    logger.info(`Postgres pool connected to ${host}:${port}/${database}`);
  } catch (err) {
    logger.error(`Postgres connection error: ${err.message}`);
  }
})();

module.exports = pool;