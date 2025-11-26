import { MenuItem } from '../types';

const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL || process.env.NEON_URL || '';

async function createClientInstance() {
  // dynamic import to avoid bundler issues when package exports differ between environments
  const mod = await import('@neondatabase/serverless');
  // try several possible shapes
  const ClientCtor = (mod as any).Client ?? (mod as any).default?.Client ?? (mod as any).default ?? (mod as any);
  return new ClientCtor({ connectionString });
}

/**
 * Try to fetch menu items from Neon (Postgres). Expects a table named `menu` with a `payload` jsonb column.
 * Throws if there's no connection string or the query fails.
 */
export async function getMenuItemsFromDb(): Promise<MenuItem[]> {
  if (!connectionString) {
    throw new Error('Database connection string not provided in environment');
  }

  if (!connectionString) {
    throw new Error('Database connection string not provided in environment');
  }

  // Instantiate client using dynamic import
  const client = await createClientInstance();

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

  if (!connectionString) {
    throw new Error('Database connection string not provided in environment');
  }

  const client = await createClientInstance();

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

  if (!connectionString) {
    throw new Error('Database connection string not provided in environment');
  }

  const client = await createClientInstance();

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
