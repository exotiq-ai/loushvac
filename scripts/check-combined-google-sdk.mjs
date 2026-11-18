import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import {mkdir,writeFile} from 'node:fs/promises';
import {chromium} from 'playwright';
const local=process.env.TEST_SERVER||'http://127.0.0.1:4330', base='https://loushvac303.com', out=process.env.QA_DIR||'/tmp/lous-combined-sdk';
await mkdir(out,{recursive:true});
const browser=await chromium.launch();const context=await browser.newContext();let routeName='';const beacons=[],scripts=[],errors=[];
function gaEvents(){return beacons.flatMap(item=>{const u=new URL(item.url);if(!['www.google-analytics.com','analytics.google.com','region1.google-analytics.com'].includes(u.hostname)||u.pathname!=='/g/collect')return[];return (item.body?item.body.split('\n'):['']).map(line=>{const p=new URLSearchParams(u.search);new URLSearchParams(line).forEach((v,k)=>p.set(k,v));return{page:item.page,tid:p.get('tid'),event:p.get('en'),keys:[...p.keys()]}})})}
async function waitFor(predicate){const start=Date.now();while(!predicate()){if(Date.now()-start>15000)throw new Error('Timed out waiting for Google transport');await new Promise(r=>setTimeout(r,100))}}
await context.route('**/*',async route=>{const r=route.request(),u=new URL(r.url());if(u.origin===base){if(u.pathname==='/api/measurement-policy')return route.fulfill({contentType:'application/json',body:'{"defaultOn":true}'});if(u.pathname==='/api/contact')return route.fulfill({contentType:'application/json',body:'{"ok":true,"message":"LOCAL TEST — NO ENQUIRY SENT"}'});return route.fulfill({response:await route.fetch({url:local+u.pathname+u.search,headers:{...r.headers(),host:new URL(local).host}})})}
if((u.hostname==='www.googletagmanager.com'&&['/gtm.js','/gtag/js'].includes(u.pathname))||(u.hostname==='www.gstatic.com'&&u.pathname.endsWith('.js'))){scripts.push({page:routeName,url:r.url()});return route.fulfill({response:await route.fetch()})}
beacons.push({page:routeName,url:r.url(),body:r.postData()||''});return route.fulfill({status:204,headers:{'Access-Control-Allow-Origin':'*'}})});
const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
for(const path of ['/','/services/furnace-repair/','/services/furnace-replacement/','/contact/']){
 routeName=path;await page.goto(base+path,{waitUntil:'networkidle'});await waitFor(()=>gaEvents().some(e=>e.page===path&&e.event==='page_view'));
 assert.equal(gaEvents().filter(e=>e.page===path&&e.tid==='G-SZRHKMDBTE'&&e.event==='page_view').length,1);
 assert.equal(await page.evaluate(()=>window.dataLayer.filter(e=>e?.[0]==='config'&&String(e?.[1]).startsWith('G-')).length),0,'No website-owned GA4 config');
}
await page.locator('#name').fill('COMBINED SDK SENTINEL');await page.locator('#phone').fill('3035550147');assert.equal(await page.locator('#email').getAttribute('required'),null);
await page.locator('.form-submit').click();await page.locator('.form-status--success').waitFor();await waitFor(()=>gaEvents().some(e=>e.event==='generate_lead'));
assert.equal(gaEvents().filter(e=>e.event==='generate_lead').length,1);
await page.locator('a[href^="tel:"]').first().evaluate(a=>a.addEventListener('click',e=>e.preventDefault()));await page.locator('a[href^="tel:"]').first().dispatchEvent('click');await waitFor(()=>gaEvents().some(e=>e.event==='phone_tap'));assert.equal(gaEvents().filter(e=>e.event==='phone_tap').length,1);
const consent=await page.evaluate(()=>Object.fromEntries(['ad_storage','ad_user_data','ad_personalization'].map(k=>[k,window.google_tag_data.ics.entries[k].update??window.google_tag_data.ics.entries[k].default])));assert.deepEqual(consent,{ad_storage:true,ad_user_data:true,ad_personalization:false});
const raw=JSON.stringify(beacons).toLowerCase();for(const value of ['COMBINED SDK SENTINEL','3035550147','+13035550147']){assert.equal(raw.includes(value.toLowerCase()),false);assert.equal(raw.includes(createHash('sha256').update(value.toLowerCase()).digest('hex')),false)}
await page.locator('.measurement-settings summary').click();await page.locator('[data-measurement-choice="off"]').click();assert.equal(await page.evaluate(()=>window.google_tag_data.ics.entries.ad_user_data.update),false);
assert.deepEqual(errors,[]);const report={status:'PASS',scope:'Actual combined Google SDK with all measurement transports intercepted; no live enquiry, no Ads/GA4 ingestion or DebugView access claimed',ga4Events:gaEvents(),consent,scripts,contactDataFound:false};await writeFile(out+'/results.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));await browser.close();
