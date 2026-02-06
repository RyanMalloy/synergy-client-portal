// migrations/run.ts
// Migration runner for PostgreSQL schema

import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost/synergy_dev';
const pool = new Pool({ connectionString });

interface MigrationRecord {
  name: string;
  executed_at: string;
}

async function createMigrationsTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name VARCHAR(255) PRIMARY KEY,
      executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
}

async function getExecutedMigrations(): Promise<Set<string>> {
  const result = await pool.query('SELECT name FROM schema_migrations ORDER BY name');
  return new Set(result.rows.map((row: MigrationRecord) => row.name));
}

async function runMigration(name: string, content: string) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(content);
    await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [name]);
    await client.query('COMMIT');
    console.log(`✅ Executed migration: ${name}`);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`❌ Failed migration: ${name}`, error);
    throw error;
  } finally {
    client.release();
  }
}

async function runMigrations() {
  try {
    await createMigrationsTable();
    const executedMigrations = await getExecutedMigrations();

    const migrationsDir = path.join(__dirname, '.');
    const files = fs.readdirSync(migrationsDir)
      .filter(f => f.match(/^\d+_.*\.sql$/))
      .sort();

    for (const file of files) {
      if (executedMigrations.has(file)) {
        console.log(`⏭️  Skipped (already executed): ${file}`);
        continue;
      }

      const filePath = path.join(migrationsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      await runMigration(file, content);
    }

    console.log('✨ All migrations completed successfully');
    await pool.end();
  } catch (error) {
    console.error('Migration failed:', error);
    await pool.end();
    process.exit(1);
  }
}

runMigrations();
