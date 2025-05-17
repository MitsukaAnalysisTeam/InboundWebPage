// 全メニューJSONファイルからpriceYenオブジェクト内のundefined値を持つプロパティを削除するスクリプト
// infrastructure/data/cleanMenuJson.js

const fs = require('fs');
const path = require('path');

const menuDir = path.join(__dirname, 'menu');
const files = fs.readdirSync(menuDir).filter(f => f.endsWith('.json'));

files.forEach(file => {
  const filePath = path.join(menuDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  let changed = false;

  data.forEach(item => {
    if (item.priceYen && typeof item.priceYen === 'object' && !Array.isArray(item.priceYen)) {
      Object.keys(item.priceYen).forEach(key => {
        if (item.priceYen[key] === undefined) {
          delete item.priceYen[key];
          changed = true;
        }
      });
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Cleaned: ${file}`);
  }
});

console.log('全メニューJSONファイルのundefinedプロパティ削除が完了しました。'); 