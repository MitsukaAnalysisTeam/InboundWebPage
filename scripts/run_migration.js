// Run: node scripts/run_migration.js [path/to/migration.sql]
const fs = require('fs');
const path = require('path');
const { Client } = require('@neondatabase/serverless');

// Simple .env.development.local parser (no dotenv dependency)
function loadEnv(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      // Strip surrounding quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  } catch (_) {
    // file not found – skip
  }
}

loadEnv(path.resolve(__dirname, '..', '.env.development.local'));
loadEnv(path.resolve(__dirname, '..', '.env.local'));
loadEnv(path.resolve(__dirname, '..', '.env'));

async function run() {
  const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL || process.env.NEON_URL;
  if (!connectionString) {
    console.error('No database connection string found');
    process.exit(1);
  }
  
  const client = new Client({ connectionString });
  await client.connect();
  
  const sqlFile = process.argv[2] || 'migrations/001_add_sort_order.sql';
  const sql = fs.readFileSync(path.resolve(sqlFile), 'utf-8');
  
  console.log(`Running migration: ${sqlFile}`);
  await client.query(sql);
  console.log('Migration complete!');
  
  await client.end();
}

run().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
