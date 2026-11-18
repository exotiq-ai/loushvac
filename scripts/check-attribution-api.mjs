import assert from 'node:assert/strict';
import { build } from 'esbuild';
globalThis.__qa={sends:[],rows:[],failEmail:false,failDB:true,throwDB:false};
const result=await build({entryPoints:['src/pages/api/contact.ts'],bundle:true,platform:'node',format:'esm',write:false,define:{'import.meta.env':JSON.stringify({RESEND_API_KEY:'LOCAL_ONLY',SUPABASE_URL:'https://local.invalid',SUPABASE_SERVICE_ROLE_KEY:'LOCAL_ONLY'})},plugins:[{name:'provider-fixtures',setup(b){
 b.onResolve({filter:/^(resend|@supabase\/supabase-js)$/},args=>({path:args.path,namespace:'fixture'}));
 b.onLoad({filter:/.*/,namespace:'fixture'},args=>({contents:args.path==='resend'?`export class Resend { emails={send:async(data)=>{globalThis.__qa.sends.push(data);return globalThis.__qa.failEmail&&data.subject.startsWith('New Lead:')?{error:{message:'fixture failure'}}:{data:{id:'fixture-email'}}}} }`:`export function createClient(){ return { from(){ return { insert(row){ globalThis.__qa.rows.push(row); if(globalThis.__qa.throwDB)throw new Error('fixture database failure'); return { select(){ return { async single(){ return globalThis.__qa.failDB ? {error:{message:'fixture database unavailable'}} : {data:{id:'fixture-db'}}; } }; } }; } }; } }; }`,loader:'js'}));
}}]});
const handler=await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
globalThis.fetch=()=>{throw new Error('TEST DENIES ALL REAL PROVIDER NETWORK')};
let sequence=0;
const base={name:'LOCAL <TEST>',phone:'3035550147',email:'fixture@example.invalid',service:'furnace-repair',message:'Fixture only',source_page:'/contact/'};
const attr={gclid:'local_id',utm_source:'google',utm_medium:'cpc',captured_at:new Date().toISOString()};
async function post(data,headers={},form=false){globalThis.__qa.sends=[];globalThis.__qa.rows=[];return handler.POST({request:new Request('https://local.invalid/api/contact',{method:'POST',headers:{'content-type':form?'application/x-www-form-urlencoded':'application/json','x-nf-client-connection-ip':'local-fixture-'+sequence++,...headers},body:form?new URLSearchParams(data):JSON.stringify(data)})});}
let response=await post({...base,attribution:attr,measurement_allowed:true,enquiry_reference:'forged'});let json=await response.json();
assert.equal(response.status,200);assert.equal(json.ok,true);assert.match(json.enquiryReference,/^[a-f\d-]{36}$/i);assert.notEqual(json.enquiryReference,'forged');
assert.deepEqual(__qa.rows[0].attribution,attr);assert.equal(__qa.rows[0].enquiry_reference,json.enquiryReference);assert.equal(__qa.sends.length,2);
assert.ok(__qa.sends[0].text.includes(json.enquiryReference));assert.ok(__qa.sends[0].text.includes('local_id'));assert.ok(__qa.sends[0].html.includes('&lt;TEST&gt;'));assert.equal(__qa.sends[0].html.includes('<TEST>'),false);assert.equal(__qa.sends[1].text.includes('local_id'),false);
for(const [extra,headers] of [[{attribution:attr},{}],[{attribution:attr,measurement_allowed:false},{}],[{attribution:attr,measurement_allowed:true},{'Sec-GPC':'1'}],[{attribution:{utm_source:'<script>',captured_at:attr.captured_at},measurement_allowed:true},{}],[{attribution:['bad'],measurement_allowed:'bad'},{}]]){
 response=await post({...base,...extra},headers);assert.equal(response.status,200);assert.equal(__qa.rows[0].attribution,undefined);
}
for(const invalid of [{email:''},{_gotcha:'bot'},{name:''}]){response=await post({...base,...invalid});assert.equal(response.status,400);assert.equal(__qa.sends.length,0);assert.equal(__qa.rows.length,0);}
__qa.failEmail=true;response=await post(base);assert.equal(response.status,500);assert.equal(__qa.sends.length,1,'no confirmation when both capture paths fail');
__qa.failDB=false;response=await post(base);assert.equal(response.status,200);assert.equal(__qa.sends.length,2,'database fallback capture');
__qa.failEmail=false;__qa.throwDB=true;response=await post(base);assert.equal(response.status,200,'database exception does not lose email success');__qa.throwDB=false;
response=await post(base,{},true);assert.equal(response.status,303);assert.equal(response.headers.get('location'),'/contact/thank-you/');
__qa.failEmail=true;__qa.failDB=true;response=await post(base,{},true);assert.equal(response.status,303);assert.equal(response.headers.get('location'),'/contact/?form=error');assert.equal(__qa.sends.length,1);
console.log('PASS API: actual bundled handler and email rendering, mocked providers only; attribution/reference, consent/GPC, malformed metadata, required email/honeypot, DB errors, failed delivery, confirmation gate, HTML fallback');
