#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Reads all JSON files under infrastructure/data/menu and writes inserts.sql
const menuDir = path.resolve(__dirname, '../infrastructure/data/menu');
const outFile = path.resolve(__dirname, 'menu_inserts.sql');

function escapeSingleQuotes(s) {
  return s.replace(/'/g, "''");
}

function jsonToSqlValue(obj) {
  const json = JSON.stringify(obj);
  // Use dollar-quoting to be safe
  return `$$${json}$$`;
}

function main() {
  if (!fs.existsSync(menuDir)) {
    console.error('menu directory not found:', menuDir);
    process.exit(1);
  }

  const files = fs.readdirSync(menuDir).filter(f => f.endsWith('.json'));
  const rows = [];

  files.forEach((file) => {
    const full = path.join(menuDir, file);
    const content = fs.readFileSync(full, 'utf8');
    let arr;
    try {
      arr = JSON.parse(content);
    } catch (err) {
      console.error('Failed to parse', full, err);
      process.exit(1);
    }

    if (!Array.isArray(arr)) return;

    arr.forEach((item) => {
      // Ensure id field exists
      const id = (item.id && item.id.toString()) || (item.name || '').toString().replace(/\s+/g, '-').toLowerCase();
      const payload = jsonToSqlValue(item);
      rows.push({ id, payload });
    });
  });

  const lines = [];
  lines.push('-- Generated SQL to create table and insert menu payloads');
  lines.push('BEGIN;');
  lines.push('CREATE TABLE IF NOT EXISTS menu (');
  lines.push('  id text PRIMARY KEY,');
  lines.push('  payload jsonb NOT NULL');
  lines.push(');');
  lines.push('');

  rows.forEach(({ id, payload }) => {
    // Use parameter-like literal insert; id must be single-quoted and escaped
    const safeId = id.replace(/'/g, "''");
    lines.push(`INSERT INTO menu (id, payload) VALUES ('${safeId}', ${payload}) ON CONFLICT (id) DO UPDATE SET payload = EXCLUDED.payload;`);
  });

  lines.push('COMMIT;');

  fs.writeFileSync(outFile, lines.join('\n') + '\n', 'utf8');
  console.log('Wrote', outFile, 'with', rows.length, 'rows');
}

main();
