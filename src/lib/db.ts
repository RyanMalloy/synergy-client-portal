// src/lib/db.ts
// PostgreSQL connection pool and query helpers

import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';
import { logger } from './logger';

// Create a singleton pool instance
let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    pool.on('error', (err) => {
      logger.error('Unexpected error on idle client', err);
    });
  }
  return pool;
}

/**
 * Execute a query and return results
 */
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  values?: any[]
): Promise<QueryResult<T>> {
  const pool = getPool();
  try {
    return await pool.query<T>(text, values);
  } catch (error) {
    logger.error('Database query error', { query: text, error });
    throw error;
  }
}

/**
 * Execute a query and return first row
 */
export async function queryOne<T extends QueryResultRow = QueryResultRow>(
  text: string,
  values?: any[]
): Promise<T | null> {
  const result = await query<T>(text, values);
  return result.rows[0] || null;
}

/**
 * Execute multiple queries in a transaction
 */
export async function transaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Transaction error', error);
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Health check
 */
export async function healthCheck(): Promise<boolean> {
  try {
    await query('SELECT 1');
    return true;
  } catch {
    return false;
  }
}

/**
 * Close pool connection (call on app shutdown)
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
