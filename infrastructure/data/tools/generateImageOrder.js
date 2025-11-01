#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

async function main() {
  const repoRoot = path.resolve(__dirname, '..', '..', '..');
  const publicMenuDir = path.join(repoRoot, 'public', 'images', 'menu');
  const outPath = path.join(repoRoot, 'infrastructure', 'data', 'menu_image_order.json');

  try {
    const files = await fs.readdir(publicMenuDir);
    // filter common image extensions
    const images = files.filter(f => /\.(jpe?g|png|webp|svg)$/i.test(f));

    // Sort by numeric prefix if exists, otherwise alphabetically
    images.sort((a, b) => {
      const an = a.match(/^([0-9]+)[-_]/);
      const bn = b.match(/^([0-9]+)[-_]/);
      if (an && bn) return Number(an[1]) - Number(bn[1]);
      if (an && !bn) return -1;
      if (!an && bn) return 1;
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });

    await fs.writeFile(outPath, JSON.stringify(images, null, 2) + '\n', 'utf8');
    console.log('Wrote', outPath, 'with', images.length, 'images');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(2);
  }
}

main();
