// Reproducible synthetic page-only mobile lab. Not Lighthouse or field Core Web Vitals.
// Third-party analytics are blocked; no form submission or conversion is sent.
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
const base = process.env.PERF_BASE || 'http://127.0.0.1:4330';
const output = process.env.PERF_DIR || '/tmp/lous-mobile-performance';
await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[];
try {
 for(let run=1;run<=3;run++){
  const context=await browser.newContext({viewport:{width:390,height:720},deviceScaleFactor:2,isMobile:true,hasTouch:true});
  const page=await context.newPage();
  await page.route('**/*',route=>new URL(route.request().url()).origin===new URL(base).origin&&route.request().method()==='GET'?route.continue():route.abort());
  await page.addInitScript(()=>{
   window.__perf={lcp:0,cls:0,lcpElement:''};
   new PerformanceObserver(list=>{for(const e of list.getEntries()){window.__perf.lcp=e.startTime;window.__perf.lcpElement=e.element?.tagName+':'+(e.element?.className||'');}}).observe({type:'largest-contentful-paint',buffered:true});
   new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__perf.cls+=e.value;}).observe({type:'layout-shift',buffered:true});
  });
  const cdp=await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
  await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:200000,uploadThroughput:75000,connectionType:'cellular4g'});
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
  await page.goto(base,{waitUntil:'networkidle'});
  await page.locator('.hero-media img').evaluate(img=>img.decode());
  await page.waitForTimeout(500); // Let final paint/performance-observer callbacks settle.
  results.push({run,...await page.evaluate(()=>({...window.__perf,hero:document.querySelector('.hero-media img').currentSrc,resources:performance.getEntriesByType('resource').map(e=>({path:new URL(e.name).pathname,encodedBytes:e.encodedBodySize,durationMs:e.duration}))}))});
  await context.close();
 }
} finally {await browser.close();}
const median=results.map(x=>x.lcp).sort((a,b)=>a-b)[1];
const report={scope:'Synthetic page-only Chromium lab; third parties blocked; not Lighthouse or field data',settings:{viewport:'390x720',dpr:2,cpuSlowdown:4,latencyMs:150,downloadBytesPerSecond:200000,coldCache:true},medianLcpMs:median,maxCls:Math.max(...results.map(x=>x.cls)),results};
await writeFile(`${output}/results.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify({scope:report.scope,settings:report.settings,medianLcpMs:median,maxCls:report.maxCls,runs:results.map(({run,lcp,cls,hero})=>({run,lcp,cls,hero}))},null,2));
