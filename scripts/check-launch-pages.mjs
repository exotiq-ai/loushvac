import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist');
async function walk(dir) {
  const result=[];
  for (const entry of await readdir(dir, { withFileTypes:true })) {
    const file=path.join(dir,entry.name);
    if (entry.isDirectory()) result.push(...await walk(file)); else result.push(file);
  }
  return result;
}
const files=(await walk(root)).filter(file=>/\.(html|txt|json|xml)$/.test(file));
const forbidden=[/most trusted/i,/Top 3 HVAC Contractors/i,/5-year workmanship/i,/guaranteed for 5 years/i,/Lou is personally on every job/i,/Lou is on every job/i,/Lou will be in touch within 2 hours/i,/within 2 hours during business hours/i,/\$3,000(?:-| to )\$7,000/,/\$4,000(?:-| to )\$9,000/];
for(const file of files){
 const text=await readFile(file,'utf8');
 for(const pattern of forbidden) assert.ok(!pattern.test(text), `${path.relative(root,file)} still contains ${pattern}`);
}
const home=await readFile(path.join(root,'index.html'),'utf8');
assert.ok(home.includes('American Standard'));
assert.ok(home.includes('15%')&&home.includes('10%'));
assert.ok(home.includes('/services/commercial-hvac/'));
const commercial=await readFile(path.join(root,'services/commercial-hvac/index.html'),'utf8');
assert.ok(commercial.includes('Commercial'));
const repair=await readFile(path.join(root,'services/furnace-repair/index.html'),'utf8');
assert.ok(repair.includes('$129'));
assert.ok(repair.includes('Request Service'));
const replacement=await readFile(path.join(root,'services/furnace-replacement/index.html'),'utf8');
assert.ok(replacement.includes('2-year labor')&&replacement.includes('10-year parts'));
for (const slug of ['furnace-replacement', 'ac-replacement']) {
 const page=await readFile(path.join(root,`services/${slug}/index.html`),'utf8');
 assert.ok(!/\$\s*\d/.test(page.replaceAll('$129','')), `${slug}: use a job-specific estimate, not advertised replacement prices`);
}
const privacy=await readFile(path.join(root,'privacy/index.html'),'utf8');
assert.ok(!/placeholder|no advertising cookies/i.test(privacy));
assert.ok(privacy.includes('Measurement settings')&&privacy.includes('Google Tag Manager'));
const facts=JSON.parse(await readFile(path.join(root,'facts.json'),'utf8'));
assert.ok(JSON.stringify(facts.services).includes('commercial-hvac'));
assert.ok(JSON.stringify(facts).includes('American Standard'));
console.log(`PASS launch content: ${files.length} built text assets; claims, offers, brands, commercial, privacy and fee/warranty distinctions.`);
