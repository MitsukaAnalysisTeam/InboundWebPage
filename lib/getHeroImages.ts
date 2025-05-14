import fs from 'fs';
import path from 'path';

export function getHeroImages(): string[] {
  const heroDir = path.join(process.cwd(), 'public/images/hero');
  return fs.readdirSync(heroDir)
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .sort()
    .map((file) => `/images/hero/${file}`);
} 