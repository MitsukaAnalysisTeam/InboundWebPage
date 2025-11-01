import * as neon from '@neondatabase/serverless';
import { MenuItem } from '../types';

// Some TypeScript builds may not include exact typings for the package; resolve createClient dynamically.
const createClient = (neon as any).createClient ?? (neon as any).default ?? neon;

const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL || process.env.NEON_URL || '';

/**
 * Try to fetch menu items from Neon (Postgres). Expects a table named `menu` with a `payload` jsonb column.
 * Throws if there's no connection string or the query fails.
 */
export async function getMenuItemsFromDb(): Promise<MenuItem[]> {
  if (!connectionString) {
    throw new Error('Database connection string not provided in environment');
  }

  const client = createClient({ connectionString });

  try {
    const res = await client.query('SELECT payload FROM menu');
    // Each row is expected to have a `payload` json/jsonb column that matches MenuItem shape
    return res.rows.map((r: any) => r.payload) as MenuItem[];
  } finally {
    // serverless clients for Neon do not require explicit end/disconnect
  }
}
