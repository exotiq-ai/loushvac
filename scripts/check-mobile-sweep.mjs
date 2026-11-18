import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
const base = process.env.SWEEP_BASE || 'http://127.0.0.1:4330';
const output = process.env.SWEEP_QA_DIR || '/tmp/lous-mobile-sweep';
await mkdir(output,{recursive:true});
const xml = await (await fetch(base + '/sitemap-0.xml')).text();
const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname).filter(path => !process.env.SWEEP_PATH || path === process.env.SWEEP_PATH);
const axe = await readFile(process.env.AXE_PATH || '/tmp/lous-axe-4.10.3.js','utf8');
const browser = await chromium.launch({headless:true});
const rows = [];
try {
 for (const width of [320,390,768]) {
  const page = await browser.newPage({viewport:{width,height:844},hasTouch:true});
  await page.route('**/*',route=>new URL(route.request().url()).origin===new URL(base).origin&&route.request().method()==='GET'?route.continue():route.abort());
  for(const path of paths){
   const response = await page.goto(base+path,{waitUntil:'networkidle'});
   assert.equal(response.status(),200,path);
   const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1, overflowing:[...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&r.right>innerWidth+1;}).slice(0,6).map(el=>({tag:el.tagName,cls:el.className,right:el.getBoundingClientRect().right})), brokenImages:[...document.images].filter(img=>img.complete&&!img.naturalWidth&&img.loading!=='lazy').map(img=>img.src)}));
   let violations=[];
   if(width===390&&['/','/contact/','/services/emergency/','/services/furnace-repair/','/faq/'].includes(path)){
    await page.addScriptTag({content:axe});
    violations=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));});
   }
   rows.push({width,path,...state,violations});
  }
  await page.close();
 }
} finally { await browser.close(); }
await writeFile(`${output}/results.json`,JSON.stringify(rows,null,2));
const failures=rows.filter(r=>r.overflow||r.brokenImages.length||r.violations.length);
console.log(JSON.stringify({checks:rows.length,failures},null,2));
assert.equal(failures.length,0,'responsive/a11y sweep failures; inspect saved evidence');
