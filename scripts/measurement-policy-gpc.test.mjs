import test from 'node:test';
import assert from 'node:assert/strict';
import policyHandler from '../netlify/edge-functions/measurement-policy.ts';
test('HTTP Global Privacy Control overrides a US default even without a navigator signal', async () => {
 const request=new Request('https://loushvac303.com/api/measurement-policy',{headers:{'Sec-GPC':'1'}});
 const response=await policyHandler(request,{geo:{country:{code:'US'}}});
 assert.deepEqual(await response.json(),{defaultOn:false,gpc:true});
});
