#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const menuDir = path.resolve(__dirname, '..', 'infrastructure', 'data', 'menu');
const imagesDir = path.resolve(__dirname, '..', 'public', 'images', 'menu');
const reportPath = path.resolve(__dirname, '..', 'scripts', 'image_normalization_report.json');

const args = process.argv.slice(2);
const apply = args.includes('--apply');

function safeReadJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    return null;
  }
}

function writeJson(file, obj) {
  fs.writeFileSync(file, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

function normalizeName(s) {
  return (s || '')
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const menuFiles = fs.readdirSync(menuDir).filter(f => f.endsWith('.json'));
const imageFiles = fs.readdirSync(imagesDir).filter(Boolean);

const actions = [];

for (const mf of menuFiles) {
  const filePath = path.join(menuDir, mf);
  const data = safeReadJson(filePath);
  if (!Array.isArray(data)) continue;

  let changed = false;

  for (const item of data) {
    if (!item || !item.id || !item.imageUrl) continue;

    const curBasename = path.basename(item.imageUrl);
    const curExt = path.extname(curBasename) || '.jpg';
    const expected = `${item.id}${curExt}`;
    const expectedPath = path.join(imagesDir, expected);
    const curPath = path.join(imagesDir, curBasename);

    if (fs.existsSync(expectedPath)) {
      // destination already exists
      if (item.imageUrl !== `/images/menu/${expected}`) {
        actions.push({type: 'update-json', file: mf, id: item.id, from: item.imageUrl, to: `/images/menu/${expected}`, reason: 'expected exists'});
        item.imageUrl = `/images/menu/${expected}`;
        changed = true;
      }
      continue;
    }

    // if current referenced file exists, copy it to expected
    if (fs.existsSync(curPath)) {
      actions.push({type: 'copy-file', file: mf, id: item.id, src: curBasename, dest: expected, willApply: apply});
      if (apply) {
        fs.copyFileSync(curPath, expectedPath);
        actions.push({type: 'copied', src: curBasename, dest: expected});
      }
      if (item.imageUrl !== `/images/menu/${expected}`) {
        actions.push({type: 'update-json', file: mf, id: item.id, from: item.imageUrl, to: `/images/menu/${expected}`, reason: 'copied from current'});
        item.imageUrl = `/images/menu/${expected}`;
        changed = true;
      }
      continue;
    }

    // try fuzzy match: find image file that contains normalized id or name
    const candidates = imageFiles.filter(fn => {
      const n = normalizeName(fn);
      return n.includes(normalizeName(item.id)) || (item.name && normalizeName(item.name) && n.includes(normalizeName(item.name)));
    });

    if (candidates.length > 0) {
      const candidate = candidates[0];
      actions.push({type: 'fuzzy-copy', file: mf, id: item.id, candidate, dest: expected, willApply: apply});
      if (apply) {
        fs.copyFileSync(path.join(imagesDir, candidate), expectedPath);
        actions.push({type: 'copied', src: candidate, dest: expected});
      }
      if (item.imageUrl !== `/images/menu/${expected}`) {
        actions.push({type: 'update-json', file: mf, id: item.id, from: item.imageUrl, to: `/images/menu/${expected}`, reason: 'fuzzy matched'});
        item.imageUrl = `/images/menu/${expected}`;
        changed = true;
      }
      continue;
    }

    // not found -> mark missing
    actions.push({type: 'missing', file: mf, id: item.id, expected, note: 'no candidate found'});
  }

  if (apply && changed) {
    writeJson(filePath, data);
    actions.push({type: 'wrote-json', file: mf});
  }
}

writeJson(reportPath, {timestamp: new Date().toISOString(), apply, actions});

console.log('Normalization complete. Report written to:', reportPath);
console.log('Summary:');
const summary = actions.reduce((acc, a) => { acc[a.type] = (acc[a.type]||0)+1; return acc; }, {});
console.log(summary);
console.log('To actually apply file copies and JSON writes, re-run with --apply');

process.exit(0);
