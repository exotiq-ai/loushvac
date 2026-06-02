// Re-runnable image optimizer for Lou's HVAC site.
// Takes the large camera exports in photos-source/ (kept out of the deployed
// public/ folder) and produces web-sized WebP (primary) + JPG (fallback)
// renditions at several widths into public/images/.
//
// Usage: node scripts/optimize-photos.mjs
//
// Sharp ships with Astro, so no extra dependency is required.

import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
// Full-resolution camera exports live outside public/ so they are never
// deployed. Optimized renditions are written into the deployed images dir.
const SRC_DIR = path.join(ROOT, 'photos-source');
const IMG_DIR = path.join(ROOT, 'public', 'images');

// source file -> { base output name, widths }
const jobs = [
  {
    src: 'Hero.JPG',
    base: 'team-hero',
    widths: [640, 1024, 1600, 2400],
  },
  {
    src: 'Lou-about.JPG',
    base: 'lou-about',
    widths: [600, 900, 1200],
  },
  {
    src: 'nephew.JPG',
    base: 'lous-future',
    widths: [600, 900, 1200],
  },
];

for (const job of jobs) {
  const srcPath = path.join(SRC_DIR, job.src);
  const meta = await sharp(srcPath).metadata();
  console.log(`\n${job.src} (${meta.width}x${meta.height})`);

  for (const w of job.widths) {
    if (w > meta.width) continue;

    const pipeline = sharp(srcPath)
      .rotate() // respect EXIF orientation
      .resize({ width: w, withoutEnlargement: true });

    const webpOut = path.join(IMG_DIR, `${job.base}-${w}.webp`);
    const jpgOut = path.join(IMG_DIR, `${job.base}-${w}.jpg`);

    const webpInfo = await pipeline
      .clone()
      .webp({ quality: 72, effort: 6 })
      .toFile(webpOut);
    const jpgInfo = await pipeline
      .clone()
      .jpeg({ quality: 78, mozjpeg: true, progressive: true })
      .toFile(jpgOut);

    const kb = (n) => `${Math.round(n / 1024)}KB`;
    console.log(
      `  ${w}w  webp ${kb(webpInfo.size).padStart(7)}   jpg ${kb(jpgInfo.size).padStart(7)}`
    );
  }
}

console.log('\nDone.');
