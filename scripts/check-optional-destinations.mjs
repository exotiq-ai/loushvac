import assert from 'node:assert/strict';
import { chromium, firefox } from 'playwright';
const local=process.env.TEST_SERVER||'http://127.0.0.1:4330';
for(const engine of (process.env.BROWSERS||'chromium,firefox').split(',')){
 const browser=await ({chromium,firefox}[engine]).launch();
 for(const off of [false,true]){
 const context=await browser.newContext();
 if(off)await context.addInitScript(()=>localStorage.setItem('lous.measurement.v1',JSON.stringify({v:1,allowed:false})));
 await context.route('**/*',async route=>{
  const url=new URL(route.request().url());
  if(url.hostname==='www.googletagmanager.com')return route.fulfill({contentType:'application/javascript',body:'window.__fixtureGoogle=true'});
  if(url.hostname==='www.gstatic.com'&&url.pathname==='/wcm/loader.js')return route.fulfill({contentType:'application/javascript',body:'window.__wcmCalls=[];window._googWcmImpl=(...args)=>window.__wcmCalls.push(args)'});
  if(url.hostname!=='loushvac303.com')return route.abort();
  if(url.pathname==='/api/measurement-policy')return route.fulfill({contentType:'application/json',body:'{"defaultOn":true}'});
  if(url.pathname==='/api/contact')return route.fulfill({contentType:'application/json',body:'{"ok":true}'});
  const response=await route.fetch({url:local+url.pathname+url.search});
  let body=await response.body();
  if(response.headers()['content-type']?.includes('text/html'))body=Buffer.from(body.toString().replace(/<meta name="lous-(ga4-id|website-call-action)"[^>]*>/g,'').replace('</head>','<meta name="lous-ga4-id" content="G-LOCALTEST"><meta name="lous-website-call-action" content="AW-16533482745/LOCAL_CALL_TEST"></head>'));
  return route.fulfill({response,body});
 });
 const page=await context.newPage();await page.goto('https://loushvac303.com/contact/',{waitUntil:'networkidle'});
 const configs=await page.evaluate(()=>(window.dataLayer||[]).filter(x=>x?.[0]==='config').map(x=>({id:x[1],params:x[2]})));
 if(off){assert.deepEqual(configs,[]);await context.close();continue;}
 assert.equal(configs.filter(x=>x.id.startsWith('G-')).length,0,'Combined Google tag owns GA4 config/pageviews; website must not configure it again');
 await page.waitForFunction(()=>window.__wcmCalls?.length===1);
 assert.equal(configs.filter(x=>x.id==='AW-16533482745/LOCAL_CALL_TEST').length,0);
 await page.locator('#name').fill('LOCAL ONLY');await page.locator('#phone').fill('3035550147');await page.locator('#email').fill('fixture@example.invalid');await page.locator('.form-submit').click();await page.locator('.form-status--success').waitFor();
 const ga4Events=await page.evaluate(()=>window.dataLayer.filter(x=>x?.[0]==='event'&&x?.[2]?.send_to==='G-LOCALTEST').map(x=>({event:x[1],params:x[2]})));
 assert.deepEqual(ga4Events,[{event:'generate_lead',params:{form_type:'contact',service:'',send_to:'G-LOCALTEST'}}]);
 await page.evaluate(()=>document.querySelector('a[href^="tel:"]').addEventListener('click',e=>e.preventDefault()));await page.locator('a[href^="tel:"]').first().dispatchEvent('click');
 assert.equal(await page.evaluate(()=>window.dataLayer.filter(x=>x?.[0]==='event'&&x?.[1]==='phone_tap'&&x?.[2]?.send_to==='G-LOCALTEST').length),1);
 await page.evaluate(()=>window.__wcmCalls[0][1]('(720) 555-0100','7205550100'));
 assert.equal(await page.locator('a[href^="tel:"]').first().getAttribute('href'),'tel:+17205550100');
 await page.locator('.measurement-settings summary').click();await page.locator('[data-measurement-choice="off"]').click();
 assert.ok((await page.locator('a[href^="tel:"]').first().getAttribute('href')).includes('3039498584'));
 assert.equal(await page.evaluate(()=>window.dataLayer.filter(x=>x?.[0]==='event'&&x?.[2]?.send_to==='G-LOCALTEST').length),0,'queued GA4 events discarded on withdrawal');
 await context.close();
 }
 console.log(`PASS ${engine}: dormant GA4/call integration activated ONLY via local metadata fixture; no real forwarding allocation or GA4 ingestion`);
 await browser.close();
}
