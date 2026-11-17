import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
const base='https://loushvac303.com';
const local=process.env.TEST_SERVER||'http://127.0.0.1:4330';
const out='/tmp/lous-real-google-sdk';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:390,height:844}});
const beacons=[];
const scripts=[];
await context.route('**/*',async route=>{
 const request=route.request(),url=new URL(request.url());
 if(url.origin===base){
  if(url.pathname==='/api/measurement-policy')return route.fulfill({contentType:'application/json',body:'{"defaultOn":true}'});
  if(url.pathname==='/api/contact')return route.fulfill({contentType:'application/json',body:'{"ok":true,"message":"LOCAL SDK FIXTURE"}'});
  const response=await route.fetch({url:local+url.pathname+url.search});return route.fulfill({response});
 }
 if(url.hostname==='www.googletagmanager.com'&&['/gtm.js','/gtag/js'].includes(url.pathname)){
  scripts.push(url.origin+url.pathname);
  const response=await route.fetch();return route.fulfill({response});
 }
 if(url.hostname==='www.gstatic.com'&&url.pathname.endsWith('.js')){
  scripts.push(url.origin+url.pathname);
  const response=await route.fetch();return route.fulfill({response});
 }
 // Actual Google code executes, but every measurement transport is intercepted here.
 beacons.push({url:request.url(),method:request.method(),body:request.postData()||''});
 return route.fulfill({status:204,headers:{'Access-Control-Allow-Origin':'*'}});
});
const page=await context.newPage();
await page.goto(base+'/contact/?utm_source=local_sdk_qa',{waitUntil:'networkidle'});
await page.waitForFunction(()=>Boolean(window.google_tag_manager?.['GTM-W7R427MZ']),{timeout:20000});
await page.locator('#name').fill('LOCAL SDK SENTINEL');
await page.locator('#email').fill('qa.sentinel@example.invalid');
await page.locator('#phone').fill('3035550147');
await page.locator('#service').selectOption('furnace-repair');
await page.locator('.form-submit').click();
await page.locator('.form-status--success').waitFor();
await page.waitForLoadState('networkidle');
const state=await page.evaluate(()=>{
 const entries=window.google_tag_data?.ics?.entries||{};
 return{containerIds:Object.keys(window.google_tag_manager||{}),consent:Object.fromEntries(['ad_storage','analytics_storage','ad_user_data','ad_personalization'].map(key=>[key,{default:entries[key]?.default,update:entries[key]?.update}])),leadEvents:(window.dataLayer||[]).filter(item=>item?.event==='generate_lead'),cookieNames:document.cookie.split(';').map(value=>value.split('=')[0].trim()).filter(Boolean)};
});
assert.equal(state.consent.ad_user_data.update??state.consent.ad_user_data.default,false,'Google runtime ad_user_data must remain denied');
assert.equal(state.consent.ad_personalization.update??state.consent.ad_personalization.default,false,'Google runtime ad_personalization must remain denied');
assert.equal(state.consent.ad_storage.update??state.consent.ad_storage.default,true,'Google runtime must reflect eligible-US measurement default');
assert.equal(state.leadEvents.length,1);
assert.deepEqual(Object.fromEntries(Object.entries(state.leadEvents[0]).filter(([key])=>key!=='gtm.uniqueEventId')),{event:'generate_lead',form_type:'contact',service:'furnace-repair'});
assert.ok(typeof state.leadEvents[0]['gtm.uniqueEventId']==='number','Only the expected Google-generated event identifier is added');
const conversionCalls = await page.evaluate(() => (window.dataLayer || []).filter(item => item?.[0] === 'event' && item?.[1] === 'conversion').map(item => item[2]));
assert.equal(conversionCalls.length, 1, 'One logical form conversion dispatch');
assert.equal(conversionCalls[0].send_to, 'AW-16533482745/TanbCMOlpbodEPnZ48s9');
assert.equal(beacons.filter(item => item.url.includes('TanbCMOlpbodEPnZ48s9') || item.body.includes('TanbCMOlpbodEPnZ48s9')).length, 1, 'Exactly one supplied-action transport from the current Google SDK/container');
const raw=JSON.stringify(beacons).toLowerCase();
for(const value of ['qa.sentinel@example.invalid','3035550147','+13035550147','LOCAL SDK SENTINEL']){
 assert.ok(!raw.includes(value.toLowerCase()),'No fixture contact values in captured transport');
 assert.ok(!raw.includes(createHash('sha256').update(value.trim().toLowerCase()).digest('hex')),'No fixture contact hashes in captured transport');
}
await page.locator('.measurement-settings summary').click();
await page.locator('[data-measurement-choice="off"]').click();
await page.waitForFunction(()=>window.google_tag_data?.ics?.entries?.ad_storage?.update===false);
const withdrawalConsent=await page.evaluate(()=>({ad_storage:window.google_tag_data.ics.entries.ad_storage.update,ad_user_data:window.google_tag_data.ics.entries.ad_user_data.update??window.google_tag_data.ics.entries.ad_user_data.default}));
const scriptsBeforeReload=scripts.length;
await page.reload({waitUntil:'networkidle'});
await page.waitForFunction(()=>window.__lousMeasurementState?.ready);
assert.equal(scripts.length,scriptsBeforeReload,'No new Google loader after saved opt-out');
assert.equal(await page.evaluate(()=>Boolean(window.google_tag_manager)),false);
const report={status:'PASS',method:'Real public Google SDK; all measurement requests intercepted, NOT provider ingestion',scripts,googleRuntime:state,withdrawalConsent,savedOptOutPreventedReload:true,interceptedExternalRequests:beacons.length,formConversionLabelRequests:beacons.filter(item=>item.url.includes('TanbCMOlpbodEPnZ48s9')||item.body.includes('TanbCMOlpbodEPnZ48s9')).length,networkSummary:beacons.map(item=>{const u=new URL(item.url);return{origin:u.origin,path:u.pathname,method:item.method,queryKeys:[...u.searchParams.keys()]}})};
await writeFile(out+'/results.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
await context.unrouteAll({behavior:'ignoreErrors'});
await browser.close();
