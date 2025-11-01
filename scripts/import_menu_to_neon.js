#!/usr/bin/env node
/*
  Script to import JSON menu files into Neon (Postgres) using @neondatabase/serverless.
  Usage:
    NODE_ENV=production node scripts/import_menu_to_neon.js
  Requires DATABASE_URL in environment (e.g., from .env.local)
*/
const fs = require('fs');
const path = require('path');

function loadEnvIfMissing() {
  if (process.env.DATABASE_URL) return;
  const fs = require('fs');
  const path = require('path');
  const envFiles = ['.env.development.local', '.env.local'];
  for (const f of envFiles) {
    const p = path.resolve(__dirname, '..', f);
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf8');
      for (const line of content.split(/\r?\n/)) {
        const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(.*))\s*$/);
        if (m) {
          const key = m[1];
          const value = m[2] ?? m[3] ?? m[4] ?? '';
          process.env[key] = value;
        }
      }
      break;
    }
  }
}

async function main() {
  loadEnvIfMissing();
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL not set in env. Load .env.local or set env vars.');
    process.exit(1);
  }

  const { neon } = require('@neondatabase/serverless');
  const sql = neon(process.env.DATABASE_URL);

  const menuDir = path.resolve(__dirname, '..', 'infrastructure', 'data', 'menu');
  const files = fs.readdirSync(menuDir).filter(f => f.endsWith('.json'));

  for (const f of files) {
    const p = path.join(menuDir, f);
    let arr;
    try {
      arr = JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch (e) {
      console.warn('skip', f, e.message);
      continue;
    }

    for (const item of arr) {
      if (!item || !item.id) continue;

      const payload = {
        id: item.id,
        category: item.category || null,
        name: item.name || null,
        price_yen: item.priceYen ? JSON.stringify(item.priceYen) : null,
        ingredients: item.ingredients ? JSON.stringify(item.ingredients) : null,
        dietary: item.dietary ? JSON.stringify(item.dietary) : null,
        allergies: item.allergies ? JSON.stringify(item.allergies) : null,
        image_url: item.imageUrl || null,
        description: item.description || null,
        available_at: item.availableAt ? JSON.stringify(item.availableAt) : null,
        raw: JSON.stringify(item),
      };

      // Upsert
      await sql`
        INSERT INTO menu_items (id, category, name, price_yen, ingredients, dietary, allergies, image_url, description, available_at, raw)
        VALUES (${payload.id}, ${payload.category}, ${payload.name}, ${payload.price_yen}::jsonb, ${payload.ingredients}::jsonb, ${payload.dietary}::jsonb, ${payload.allergies}::jsonb, ${payload.image_url}, ${payload.description}, ${payload.available_at}::jsonb, ${payload.raw}::jsonb)
        ON CONFLICT (id) DO UPDATE SET
          category = EXCLUDED.category,
          name = EXCLUDED.name,
          price_yen = EXCLUDED.price_yen,
          ingredients = EXCLUDED.ingredients,
          dietary = EXCLUDED.dietary,
          allergies = EXCLUDED.allergies,
          image_url = EXCLUDED.image_url,
          description = EXCLUDED.description,
          available_at = EXCLUDED.available_at,
          raw = EXCLUDED.raw,
          updated_at = now();
      `;
      console.log('upserted', item.id);
    }
  }

  console.log('Import complete');
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
