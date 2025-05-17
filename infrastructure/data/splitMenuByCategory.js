const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, 'menu.json');
const outDir = path.join(__dirname, 'menu');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const data = JSON.parse(fs.readFileSync(menuPath, 'utf-8'));

const categories = {};
data.forEach(item => {
  if (!categories[item.category]) categories[item.category] = [];
  categories[item.category].push(item);
});

Object.entries(categories).forEach(([cat, items]) => {
  // ファイル名をキャメル→ケバブケースに変換
  const fileName = cat.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '') + '.json';
  fs.writeFileSync(
    path.join(outDir, fileName),
    JSON.stringify(items, null, 2)
  );
});

console.log('カテゴリごとに分割完了'); 