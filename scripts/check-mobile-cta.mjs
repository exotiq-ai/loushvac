import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium, firefox } from 'playwright';
const base=process.env.CTA_BASE || 'http://127.0.0.1:4330';
const output=process.env.QA_DIR || '/tmp/lous-full-launch-mobile';
await mkdir(output,{recursive:true});
const rows=[];
for(const name of (process.env.BROWSERS || 'chromium,firefox').split(',')){
 const browser=await ({chromium,firefox}[name]).launch({headless:true});
 for(const [width,height] of [[320,640],[390,844],[430,932],[844,390],[1024,768],[1366,1024]]){
  const context=await browser.newContext({viewport:{width,height},hasTouch:true});
  const page=await context.newPage();
  await page.route('**/*',route=>{
   const url=new URL(route.request().url());
   return url.origin===new URL(base).origin&&route.request().method()==='GET'?route.continue():route.abort();
  });
  for(const route of ['/','/contact/','/services/furnace-repair/']){
   await page.goto(base+route,{waitUntil:'networkidle'});
   const link=page.locator('.emergency-cta-inner');
   assert.equal(await link.getAttribute('href'),'tel:+13039498584');
   for(const progress of [0,.5,1]){
    await page.evaluate(progress=>{document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,(document.documentElement.scrollHeight-innerHeight)*progress)},progress);
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    const state=await link.evaluate(element=>{
     const box=element.getBoundingClientRect(),bar=element.closest('.emergency-cta').getBoundingClientRect();
     const phone=element.querySelector('.emergency-phone').getBoundingClientRect();
     const hit=document.elementFromPoint(box.x+box.width/2,Math.min(innerHeight-2,box.y+box.height/2));
     return {box:{x:box.x,y:box.y,width:box.width,height:box.height,bottom:box.bottom},barBottom:bar.bottom,hit:element.contains(hit),phoneFits:phone.left>=box.left&&phone.right<=box.right+1,scrollWidth:document.documentElement.scrollWidth,innerWidth,innerHeight,footerBottom:document.querySelector('.site-footer').getBoundingClientRect().bottom};
    });
    assert.ok(state.box.height>=44&&state.box.y>=0,`${name} ${width} ${route}: visible tap target`);
    assert.ok(Math.abs(state.barBottom-state.innerHeight)<=2,`${name} ${width}: viewport anchored`);
    assert.ok(state.hit,`${name} ${width} ${route}: hit testing`);
    assert.ok(state.phoneFits,`${name} ${width}: telephone text fits`);
    assert.ok(state.scrollWidth<=state.innerWidth+1,`${name} ${width} ${route}: page overflow ${JSON.stringify(state)}`);
    if(progress===1)assert.ok(state.footerBottom<=state.box.y+2,`${name} ${width}: footer clears bar`);
   }
   if(width===320){
    await page.evaluate(()=>{document.documentElement.style.fontSize='32px';window.scrollTo(0,document.documentElement.scrollHeight)});
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    await page.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight));
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    const state=await link.evaluate(element=>({bar:element.getBoundingClientRect().toJSON(),footer:document.querySelector('.site-footer').getBoundingClientRect().toJSON(),overflow:element.scrollWidth>element.clientWidth+1}));
    assert.ok(!state.overflow,`${name}: enlarged CTA text must fit`);
    assert.ok(state.footer.bottom<=state.bar.y+2,`${name}: enlarged bar clearance`);
   }
  }
  if(width===390||width===844){await page.goto(base+'/',{waitUntil:'networkidle'});await page.screenshot({path:`${output}/${name}-${width}x${height}.png`});}
  rows.push({browser:name,width,height,touch:true,routes:3,scrollPositions:3,status:'PASS'});
  await context.close();
 }
 const desktop=await browser.newPage({viewport:{width:1440,height:900},hasTouch:false});
 await desktop.goto(base+'/',{waitUntil:'domcontentloaded'});
 assert.equal(await desktop.locator('.emergency-cta').isVisible(),false,'normal desktop bar stays hidden');
 await browser.close();
 console.log(`PASS ${name}: mobile CTA matrix`);
 await writeFile(`${output}/results.json`,JSON.stringify(rows,null,2));
}
console.log(JSON.stringify(rows,null,2));
