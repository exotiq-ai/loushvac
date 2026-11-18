// Generate the owner-selected hero without cropping, enlarging or retaining EXIF/GPS.
// Usage: node scripts/optimize-hero.mjs /path/to/lou-supplied-original.jpg
// Original source and checksum are recorded in docs/hero-photo.md.
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const input = process.argv[2];
if (!input) throw new Error('Provide the original downloaded photograph path.');
const bytes = await readFile(input);
const expected = '3d30eda6b7bb3f9fa844e6af858f12b5c133637a092535736e82dcf42864bc2d';
if (createHash('sha256').update(bytes).digest('hex') !== expected) throw new Error('Source differs from the owner-selected original. Review it before changing the checksum.');
for (const width of [640, 1024, 1600, 2400]) {
  for (const format of ['avif', 'webp', 'jpg']) {
    const image = sharp(bytes).rotate().resize({ width, withoutEnlargement: true });
    const path = fileURLToPath(new URL(`../public/images/lou-team-nov2026-${width}.${format}`, import.meta.url));
    const info = await (format === 'avif' ? image.avif({ quality: 48, effort: 6 }) : format === 'webp' ? image.webp({ quality: 78, effort: 6 }) : image.jpeg({ quality: 82, mozjpeg: true, progressive: true })).toFile(path);
    console.log(JSON.stringify({ file: path, ...info }));
  }
}
