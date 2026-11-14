import fs from 'node:fs/promises';
import path from 'node:path';
import pg from 'pg';

const connectionString = process.env.MIGRATION_DATABASE_URL;
if (!connectionString) throw new Error('MIGRATION_DATABASE_URL is required');
const pool = new pg.Pool({ connectionString, max: 2 });
await pool.query(`CREATE TABLE IF NOT EXISTS schema_migrations(version text primary key, applied_at timestamptz not null default now())`);
for (const f of (await fs.readdir('database/migrations')).filter(x=>x.endsWith('.sql')).sort()) {
  if ((await pool.query('select 1 from schema_migrations where version=$1',[f])).rowCount) continue;
  const sql=await fs.readFile(path.join('database/migrations',f),'utf8'); const c=await pool.connect();
  try { await c.query('BEGIN'); await c.query(sql); await c.query('insert into schema_migrations(version) values($1)',[f]); await c.query('COMMIT'); console.log('Migration completed:',f); }
  catch(e){await c.query('ROLLBACK'); throw e} finally{c.release()}
}
console.log('Migration completed successfully.'); await pool.end();
