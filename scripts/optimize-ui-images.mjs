import sharp from 'sharp';
import { stat, readFile } from 'node:fs/promises';
for (const [name,width] of [['lous-hvac-logo',600],['service-icon-snowflake',112],['service-icon-fire',112],['service-icon-fan',112],['service-icon-water',112]]) {
  const input = new URL(`../public/images/${name}.png`,import.meta.url);
  const output = new URL(`../public/images/${name}.webp`,import.meta.url);
  const image = sharp(await readFile(input));
  const metadata = await image.metadata();
  const result = await (name === 'lous-hvac-logo' ? image.trim() : image).resize({width,withoutEnlargement:true}).webp({quality:90,effort:6}).toFile(output.pathname);
  console.log(JSON.stringify({name,originalDimensions:[metadata.width,metadata.height],originalBytes:(await stat(input)).size,...result}));
}
