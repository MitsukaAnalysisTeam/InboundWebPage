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

    const res = await client.query('SELECT id, payload FROM menu');
    // Ensure the ID in the object matches the DB primary key to prevent duplication issues
    const items = res.rows.map((r: any) => ({
      ...r.payload,
      id: r.id
    })) as MenuItem[];

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

/**
 * Insert or update a menu item in the database.
 */
export async function upsertMenuItem(item: MenuItem): Promise<void> {
  if (!connectionString) {
    throw new Error('Database connection string not provided in environment');
  }

  const client = new ClientCtor({ connectionString });

  try {
    if (typeof client.connect === 'function') {
      await client.connect();
    }

    // Use ON CONFLICT to handle both insert and update
    const query = `
      INSERT INTO menu (id, payload)
      VALUES ($1, $2)
      ON CONFLICT (id)
      DO UPDATE SET payload = $2
    `;
    
    await client.query(query, [item.id, JSON.stringify(item)]);

    if (typeof client.end === 'function') {
      await client.end();
    }
  } catch (err) {
    if (typeof client.end === 'function') {
      try {
        await client.end();
      } catch (_) {}
    }
    throw err;
  }
}

/**
 * Delete a menu item from the database by ID.
 */
export async function deleteMenuItem(id: string): Promise<void> {
  if (!connectionString) {
    throw new Error('Database connection string not provided in environment');
  }

  const client = new ClientCtor({ connectionString });

  try {
    if (typeof client.connect === 'function') {
      await client.connect();
    }

    await client.query('DELETE FROM menu WHERE id = $1', [id]);

    if (typeof client.end === 'function') {
      await client.end();
    }
  } catch (err) {
    if (typeof client.end === 'function') {
      try {
        await client.end();
      } catch (_) {}
    }
    throw err;
  }
}
