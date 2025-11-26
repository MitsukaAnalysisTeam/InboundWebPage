const fs = require('fs');
const path = require('path');
const { Client } = require('@neondatabase/serverless');

// Load environment variables from .env.development.local
const envPath = path.join(__dirname, '../.env.development.local');
let connectionString = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;

if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
      if (key === 'DATABASE_URL' || key === 'NEON_DATABASE_URL') {
        connectionString = value;
      }
    }
  });
}

if (!connectionString) {
  console.error('Error: DATABASE_URL or NEON_DATABASE_URL not found in environment or .env.development.local');
  process.exit(1);
}

const CATEGORY_FILE_MAP = {
  'Beer': 'beer.json',
  'Ramen': 'ramen.json',
  'JapaneseSake': 'japanese-sake.json',
  'Ippin': 'ippin.json',
  'LunchSpecial': 'lunch-special.json',
  'DinnerSpecial': 'dinner-special.json',
  'SunsetSpecial': 'sunset-special.json',
  'Kaedama': 'kaedama.json',
  'Event': 'event.json'
};

async function main() {
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log('Connected to database');

    const res = await client.query('SELECT payload FROM menu');
    const items = res.rows.map(row => row.payload);

    console.log(`Fetched ${items.length} items from database`);

    // Group items by category
    const itemsByCategory = {};
    
    // Initialize arrays for known categories
    Object.keys(CATEGORY_FILE_MAP).forEach(cat => {
      itemsByCategory[cat] = [];
    });

    items.forEach(item => {
      const category = item.category;
      if (!itemsByCategory[category]) {
        itemsByCategory[category] = [];
      }
      itemsByCategory[category].push(item);
    });

    // Write to files
    const baseDir = path.join(__dirname, '../infrastructure/data/menu');
    
    for (const [category, items] of Object.entries(itemsByCategory)) {
      const filename = CATEGORY_FILE_MAP[category];
      if (!filename) {
        console.warn(`Warning: No filename mapping for category "${category}". Skipping ${items.length} items.`);
        continue;
      }

      if (items.length === 0) {
        console.log(`No items for category "${category}". Skipping file creation.`);
        continue;
      }

      const filePath = path.join(baseDir, filename);
      
      // Sort items by ID or some other criteria if needed to maintain order?
      // For now, we'll just write them.
      
      fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
      console.log(`Wrote ${items.length} items to ${filename}`);
    }

    console.log('Sync complete.');

  } catch (err) {
    console.error('Error executing sync:', err);
  } finally {
    await client.end();
  }
}

main();
