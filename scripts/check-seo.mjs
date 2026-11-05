import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

// Run after npm run build. Check generated artifacts, not just configuration.
const root = new URL('../dist/', import.meta.url);
const origin = 'https://loushvac303.com';
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? walk(new URL(`${e.name}/`, dir)) : new URL(e.name, dir)))).flat();
}
const files = await walk(root);
let pages = 0;
for (const file of files.filter(f => /\.(html|xml|txt|json)$/.test(f.pathname))) {
  const text = await readFile(file, 'utf8');
  assert.ok(!text.includes('https://www.loushvac303.com'), `Redirecting www host in ${file.pathname}`);
  if (file.pathname.endsWith('.html')) {
    const canonical = text.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/);
    assert.ok(canonical, `Missing canonical: ${file.pathname}`);
    const relative = path.relative(root.pathname, file.pathname);
    const route = relative === 'index.html' ? '/' : relative.endsWith('/index.html') ? `/${relative.slice(0, -10)}` : `/${relative.replace(/\.html$/, '')}/`;
    assert.equal(canonical[1], origin + route, `Canonical path mismatch: ${relative}`);
    const og = text.match(/<meta\b[^>]*property="og:url"[^>]*content="([^"]+)"/);
    assert.equal(og?.[1], canonical[1], `Open Graph mismatch: ${relative}`);
    for (const script of text.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) JSON.parse(script[1]);
    pages++;
  }
}
assert.ok(pages > 0, 'No generated HTML pages checked');
const robots = await readFile(new URL('robots.txt', root), 'utf8');
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap-index.xml`));
const index = await readFile(new URL('sitemap-index.xml', root), 'utf8');
const maps = [...index.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.ok(maps.length > 0, 'Empty sitemap index');
let urls = 0;
for (const map of maps) {
  assert.equal(new URL(map).origin, origin);
  const xml = await readFile(new URL(new URL(map).pathname.slice(1), root), 'utf8');
  const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
  assert.ok(locations.length > 0, 'Empty child sitemap');
  for (const loc of locations) {
    const url = new URL(loc);
    assert.equal(url.origin, origin);
    assert.ok(!url.pathname.startsWith('/admin/'));
    const html = await readFile(new URL(`${url.pathname.slice(1)}index.html`, root), 'utf8');
    assert.ok(html.includes(`rel="canonical" href="${loc}"`), `Sitemap/canonical mismatch: ${loc}`);
    urls++;
  }
}
console.log(`PASS: ${pages} HTML pages, ${urls} sitemap URLs; canonical, Open Graph, JSON-LD, robots, and generated host consistency.`);
