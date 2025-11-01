const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, '..', 'infrastructure', 'data', 'menu');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') || f.endsWith('.yml'));
let out = [];
for (const f of files) {
  const p = path.join(dir, f);
  try {
    const txt = fs.readFileSync(p, 'utf8');
    if (f.endsWith('.json')) {
      const arr = JSON.parse(txt);
      arr.forEach(item => {
        if (item && item.id && item.imageUrl) {
          const img = path.basename(item.imageUrl);
          const ext = path.extname(img) || '.jpg';
          const expected = item.id + ext;
          const exists = fs.existsSync(path.join(__dirname, '..', 'public', 'images', 'menu', expected));
          out.push({ file: f, id: item.id, image: img, expected, exists });
        }
      });
    }
  } catch (e) {
    // ignore parse errors
  }
}
console.log(JSON.stringify(out, null, 2));
