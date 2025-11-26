import * as neon from '@neondatabase/serverless';
import { MenuItem } from '../types';

// Resolve Client constructor from @neondatabase/serverless (package exports vary)
const ClientCtor: any = (neon as any).Client ?? (neon as any).default?.Client ?? (neon as any).default ?? (neon as any);

const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL || process.env.NEON_URL || '';

/**
 * Try to fetch menu items from Neon (Postgres). Expects a table named `menu` with a `payload` jsonb column.
 * Throws if there's no connection string or the query fails.
 */
export async function getMenuItemsFromDb(): Promise<MenuItem[]> {
  if (!connectionString) {
    throw new Error('Database connection string not provided in environment');
  }

  // Instantiate client using resolved constructor/path
  const client = new ClientCtor({ connectionString });

  try {
    if (typeof client.connect === 'function') {
      await client.connect();
    }

    const res = await client.query('SELECT payload FROM menu');
    const items = res.rows.map((r: any) => r.payload) as MenuItem[];

    if (typeof client.end === 'function') {
      await client.end();
    }

    return items;
  } catch (err) {
    // try to close if possible
    if (typeof client.end === 'function') {
      try {
        await client.end();
      } catch (_) {}
    }
    throw err;
  }
}
