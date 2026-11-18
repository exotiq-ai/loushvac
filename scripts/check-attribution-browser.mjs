import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium, firefox } from 'playwright';
const local=process.env.TEST_SERVER||'http://127.0.0.1:4330';
const output=process.env.QA_DIR||'/tmp/lous-attribution-qa';
const key='lous.attribution.v1', base='https://loushvac303.com';
const reference='80ae1f31-1a0d-47df-a61f-57603bdace09';
await mkdir(output,{recursive:true});
const results=[];
for(const engine of (process.env.BROWSERS||'chromium,firefox').split(',')){
 const browser=await ({chromium,firefox}[engine]).launch();
 async function setup({off=false,gpc=false,defaultOn=true,stored=null,blocked=false,delay=0}={}){
  const context=await browser.newContext();const posts=[],errors=[];let releases=[];
  await context.addInitScript(({off,gpc,stored,key,blocked})=>{
   if(gpc)Object.defineProperty(navigator,'globalPrivacyControl',{get:()=>true});
   if(!sessionStorage.getItem('fixture_initialized')){
    if(off)localStorage.setItem('lous.measurement.v1',JSON.stringify({v:1,allowed:false}));
    if(stored)localStorage.setItem(key,JSON.stringify(stored));
    sessionStorage.setItem('fixture_initialized','true');
   }
   if(blocked)Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Blocked','SecurityError')}});
  },{off,gpc,stored,key,blocked});
  await context.route('**/*',async route=>{
   const url=new URL(route.request().url());
   if(url.hostname==='www.googletagmanager.com')return route.fulfill({contentType:'application/javascript',body:'window.__fixtureTag=true;'});
   if(url.hostname!=='loushvac303.com'&&!url.hostname.endsWith('.netlify.app'))return route.abort();
   if(url.pathname==='/api/measurement-policy'){
    if(delay)await new Promise(resolve=>{releases.push(resolve)});
    return route.fulfill({contentType:'application/json',body:JSON.stringify({defaultOn})});
   }
   if(url.pathname==='/api/contact'){
    posts.push(route.request().postDataJSON());
    return route.fulfill({contentType:'application/json',body:JSON.stringify({ok:true,enquiryReference:reference})});
   }
   const path=url.pathname.startsWith('/admin/')?'/contact/':url.pathname;
   const response=await route.fetch({url:local+path+url.search});assert.equal(response.status(),200,'fixture document must exist');
   return route.fulfill({response});
  });
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  async function go(path='/contact/',ready=true){await page.goto(base+path,{waitUntil:'domcontentloaded'});if(ready)await page.waitForFunction(()=>window.__lousMeasurementState?.ready);}
  async function submit(){await page.locator('#name').fill('LOCAL ATTRIBUTION ONLY');await page.locator('#email').fill('fixture@example.invalid');await page.locator('#phone').fill('3035550147');await page.locator('.form-submit').click();await page.locator('.form-status--success').waitFor();}
  async function done(){assert.deepEqual(errors,[],engine+' errors');await context.unrouteAll({behavior:'ignoreErrors'});await context.close();}
  return{page,context,posts,go,submit,done,releases};
 }
 const a=await setup();
 await a.go('/?gclid=first_test&utm_source=google&utm_medium=cpc&utm_campaign=heating');
 assert.equal(await a.page.evaluate(key=>JSON.parse(localStorage.getItem(key))?.gclid,key),'first_test');
 const first=await a.page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
 await a.go('/services/furnace-repair/?gclid=second_test&utm_campaign=overwrite');
 await a.go('/contact/');await a.submit();
 assert.deepEqual(a.posts[0].attribution,first);assert.equal(a.posts[0].measurement_allowed,true);
 const events=await a.page.evaluate(()=>window.dataLayer.filter(x=>x?.event==='generate_lead'));
 assert.equal(events.length,1);assert.equal(JSON.stringify(events).includes('first_test'),false);
 const conversion=await a.page.evaluate(()=>window.dataLayer.find(x=>x?.[0]==='event'&&x?.[1]==='conversion')[2]);
 assert.equal(conversion.transaction_id,reference);
 await a.page.screenshot({path:output+'/'+engine+'-attribution-form.png'});
 await a.page.locator('.measurement-settings summary').click();await a.page.locator('[data-measurement-choice="off"]').click();
 assert.equal(await a.page.evaluate(key=>localStorage.getItem(key),key),null);
 await a.submit();assert.equal(a.posts[1].attribution,undefined);await a.done();
 for(const settings of [{off:true},{gpc:true},{defaultOn:false},{blocked:true}]){
  const b=await setup({...settings,stored:{gclid:'stored',captured_at:new Date().toISOString()}});
  await b.go('/contact/?gclid=new_test&utm_source=google');await b.submit();assert.equal(b.posts[0].attribution,undefined);
  if(!settings.blocked)assert.equal(await b.page.evaluate(key=>localStorage.getItem(key),key),null);
  await b.done();
 }
 const race=await setup();await race.go('/contact/?gclid=race');
 await race.page.evaluate(()=>localStorage.setItem('lous.measurement.v1',JSON.stringify({v:1,allowed:false})));
 await race.submit();assert.equal(race.posts[0].attribution,undefined,'read current saved Off before a delayed storage event');
 assert.equal(await race.page.evaluate(()=>(window.dataLayer||[]).filter(x=>x?.event==='generate_lead').length),0);await race.done();
 const deletion=await setup({stored:{gclid:'deleted',captured_at:new Date().toISOString()}});await deletion.go('/contact/');
 await deletion.page.evaluate(key=>localStorage.removeItem(key),key);await deletion.submit();assert.equal(deletion.posts[0].attribution,undefined,'do not resurrect a removed stored record from in-memory cache');await deletion.done();
 const expired=await setup({stored:{gclid:'old',captured_at:'2020-01-01T00:00:00Z'}});
 await expired.go('/contact/');await expired.submit();assert.equal(expired.posts[0].attribution,undefined);await expired.done();
 const privatePage=await setup();await privatePage.go('/admin/leads/?p=secret');await privatePage.submit();assert.equal(privatePage.posts[0].attribution,undefined);await privatePage.done();
 const preview=await setup();await preview.page.goto('https://preview--loushvac303.netlify.app/contact/?gclid=preview',{waitUntil:'networkidle'});await preview.submit();assert.equal(preview.posts[0].attribution,undefined);await preview.done();
 const late=await setup({delay:1});await late.go('/contact/?gclid=not_replayed',false);await late.submit();assert.equal(late.posts[0].attribution,undefined);
 for(const release of late.releases)release();await late.page.waitForFunction(()=>window.__lousMeasurementState.ready);assert.equal(late.posts.length,1);await late.done();
 results.push({browser:engine,status:'PASS',scope:'Local application with mocked API/Google transports; no real leads',cases:['cross-page first-touch','90-day expiry','reference conversion id','no attribution in dataLayer','withdrawal','saved off','GPC','unknown region','blocked storage','private page','preview','pending permission']});
 await browser.close();
}
await writeFile(output+'/results.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
