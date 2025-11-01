#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const neonPkg = require('@neondatabase/serverless');

// Load .env.development.local manually if present
const envPath = path.resolve(process.cwd(), '.env.development.local');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split(/\r?\n/).forEach((line) => {
    const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) {
      let val = m[2];
      // remove surrounding quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[m[1]] = val;
    }
  });
}

async function main() {
  const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL || process.env.NEON_URL;
  if (!connectionString) {
    console.error('No connection string found in .env.development.local (NEON_DATABASE_URL / DATABASE_URL / NEON_URL)');
    process.exit(2);
  }

  // Try to use Client constructor if available
  const Client = neonPkg.Client || neonPkg.default?.Client;
  if (typeof Client === 'function') {
    const client = new Client({ connectionString });
    try {
      console.log('Using Client constructor from @neondatabase/serverless');
      console.log('Client prototype methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(client)).slice(0,50));
      if (typeof client.connect === 'function') {
        console.log('Calling client.connect()');
        await client.connect();
      }

      const res = await client.query('SELECT count(*) AS cnt FROM menu');
      console.log('Result:', res.rows[0]);
      const sample = await client.query('SELECT payload FROM menu LIMIT 3');
      console.log('Samples:', sample.rows.map(r => r.payload));

      if (typeof client.end === 'function') {
        await client.end();
      }
      return;
    } catch (e) {
      console.error('Client query failed:', e.message || e);
      if (typeof client.end === 'function') {
        try { await client.end(); } catch(e2) {}
      }
      process.exit(5);
    }
  }

  // Fallback: if Pool exists, try using Pool
  const Pool = neonPkg.Pool || neonPkg.default?.Pool;
  if (typeof Pool === 'function') {
    const pool = new Pool({ connectionString });
    try {
      const res = await pool.query('SELECT count(*) AS cnt FROM menu');
      console.log('Result:', res.rows[0]);
      const sample = await pool.query('SELECT payload FROM menu LIMIT 3');
      console.log('Samples:', sample.rows.map(r => r.payload));
      return;
    } catch (e) {
      console.error('Pool query failed:', e.message || e);
      process.exit(6);
    }
  }

  console.error('No usable Client or Pool export found in @neondatabase/serverless');
  process.exit(4);

  try {
    console.log('Connected. Running test query: SELECT count(*) FROM menu');
    const res = await client.query('SELECT count(*) AS cnt FROM menu');
    console.log('Result:', res.rows[0]);

    console.log('Fetching up to 3 payload samples...');
    const sample = await client.query('SELECT payload FROM menu LIMIT 3');
    console.log('Samples:', sample.rows.map(r => r.payload));
  } catch (err) {
    console.error('Query failed:', err.message || err);
    process.exit(3);
  }
}

main();
