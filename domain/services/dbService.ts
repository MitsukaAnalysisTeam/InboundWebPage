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
 * Results are ordered by sort_order ASC.
 * Throws if there's no connection string or the query fails.
 */
export async function getMenuItemsFromDb(): Promise<MenuItem[]> {
  if (!connectionString) {
    throw new Error('Database connection string not provided in environment');
  }

  const client = await createClientInstance();

  try {
    if (typeof client.connect === 'function') {
      await client.connect();
    }

    const res = await client.query('SELECT id, payload, sort_order FROM menu ORDER BY sort_order ASC, id ASC');
    // Ensure the ID in the object matches the DB primary key to prevent duplication issues
    const items = res.rows.map((r: any) => ({
      ...r.payload,
      id: r.id,
      sortOrder: r.sort_order ?? 0,
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

  const client = await createClientInstance();

  try {
    if (typeof client.connect === 'function') {
      await client.connect();
    }

    // If item has sortOrder, include it; otherwise get max sort_order + 1
    const sortOrder = (item as any).sortOrder;
    
    if (sortOrder !== undefined && sortOrder !== null) {
      const query = `
        INSERT INTO menu (id, payload, sort_order)
        VALUES ($1, $2, $3)
        ON CONFLICT (id)
        DO UPDATE SET payload = $2, sort_order = $3
      `;
      await client.query(query, [item.id, JSON.stringify(item), sortOrder]);
    } else {
      // For new items without a sort_order, put them at the end
      const query = `
        INSERT INTO menu (id, payload, sort_order)
        VALUES ($1, $2, COALESCE((SELECT MAX(sort_order) FROM menu), 0) + 1)
        ON CONFLICT (id)
        DO UPDATE SET payload = $2
      `;
      await client.query(query, [item.id, JSON.stringify(item)]);
    }

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

/**
 * Update sort_order for multiple menu items at once.
 * Accepts an array of { id, sortOrder } pairs.
 */
export async function updateMenuSortOrder(items: { id: string; sortOrder: number }[]): Promise<void> {
  if (!connectionString) {
    throw new Error('Database connection string not provided in environment');
  }

  const client = await createClientInstance();

  try {
    if (typeof client.connect === 'function') {
      await client.connect();
    }

    // Use a transaction to update all sort orders atomically
    await client.query('BEGIN');
    
    for (const { id, sortOrder } of items) {
      await client.query(
        'UPDATE menu SET sort_order = $1 WHERE id = $2',
        [sortOrder, id]
      );
    }
    
    await client.query('COMMIT');

    if (typeof client.end === 'function') {
      await client.end();
    }
  } catch (err) {
    // Try to rollback
    try {
      await client.query('ROLLBACK');
    } catch (_) {}
    if (typeof client.end === 'function') {
      try {
        await client.end();
      } catch (_) {}
    }
    throw err;
  }
}
