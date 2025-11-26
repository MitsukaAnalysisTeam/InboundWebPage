#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..', '..');
const publicMenuDir = path.join(repoRoot, 'public', 'images', 'menu');
const menuDataDir = path.join(repoRoot, 'infrastructure', 'data', 'menu');
const menuJsonPath = path.join(repoRoot, 'infrastructure', 'data', 'menu.json');

async function readPublicFiles() {
  const files = await fs.readdir(publicMenuDir);
  return files;
}

function basenameNoPrefix(basename) {
  const parts = basename.split('-');
  if (parts.length <= 1) return basename;
  // drop first token
  return parts.slice(1).join('-');
}

async function fixFile(filePath) {
  const content = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(content);
  let changed = false;
  const publicFiles = await readPublicFiles();

  for (const item of data) {
    if (!item.imageUrl) continue;
    let img = item.imageUrl.replace(/^\//, ''); // images/menu/xxx
    const absolute = path.join(repoRoot, img);
    try {
      await fs.access(absolute);
      // exists
      continue;
    } catch (e) {
      // try to find alternative
      const base = path.basename(img);
      if (publicFiles.includes(base)) {
        item.imageUrl = '/images/menu/' + base;
        changed = true;
        continue;
      }
      const noPrefix = basenameNoPrefix(base);
      if (publicFiles.includes(noPrefix)) {
        item.imageUrl = '/images/menu/' + noPrefix;
        changed = true;
        continue;
      }
      // try fuzzy contains
      const candidates = publicFiles.filter(f => f.includes(base.replace(/\.[^.]+$/, '')) || base.includes(f.replace(/\.[^.]+$/, '')) || f.includes(noPrefix.replace(/\.[^.]+$/, '')));
      if (candidates.length === 1) {
        item.imageUrl = '/images/menu/' + candidates[0];
        changed = true;
        continue;
      }
      // give up
    }
  }

  if (changed) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  }

  return changed;
}

async function fixMenuJson(menuJson) {
  const content = await fs.readFile(menuJson, 'utf8');
  const data = JSON.parse(content);
  let changed = false;
  const publicFiles = await readPublicFiles();

  for (const item of data) {
    if (!item.imageUrl) continue;
    let img = item.imageUrl.replace(/^\//, '');
    const absolute = path.join(repoRoot, img);
    try {
      await fs.access(absolute);
      continue;
    } catch (e) {
      const base = path.basename(img);
      if (publicFiles.includes(base)) {
        item.imageUrl = '/images/menu/' + base;
        changed = true;
        continue;
      }
      const noPrefix = basenameNoPrefix(base);
      if (publicFiles.includes(noPrefix)) {
        item.imageUrl = '/images/menu/' + noPrefix;
        changed = true;
        continue;
      }
      const candidates = publicFiles.filter(f => f.includes(base.replace(/\.[^.]+$/, '')) || base.includes(f.replace(/\.[^.]+$/, '')) || f.includes(noPrefix.replace(/\.[^.]+$/, '')));
      if (candidates.length === 1) {
        item.imageUrl = '/images/menu/' + candidates[0];
        changed = true;
        continue;
      }
    }
  }

  if (changed) {
    await fs.writeFile(menuJson, JSON.stringify(data, null, 2) + '\n', 'utf8');
  }

  return changed;
}

(async function main(){
  try {
    const files = await fs.readdir(menuDataDir);
    const jsonFiles = files.filter(f => f.endsWith('.json'));
    const results = [];
    for (const jf of jsonFiles) {
      const full = path.join(menuDataDir, jf);
      const changed = await fixFile(full);
      results.push({file: full, changed});
    }

    const menuChanged = await fixMenuJson(menuJsonPath).catch(err => { return false; });

    console.log('fixImagePaths results:');
    for (const r of results) {
      console.log(r.file + ': ' + (r.changed ? 'updated' : 'unchanged'));
    }
    console.log(menuJsonPath + ': ' + (menuChanged ? 'updated' : 'unchanged'));
    process.exit(0);
  } catch (err) {
    console.error('error', err);
    process.exit(2);
  }
})();
