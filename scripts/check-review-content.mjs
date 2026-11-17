import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import ts from 'typescript';
import { reviews } from '../src/content/reviews.ts';
import { googleReviews, googleReviewSummary } from '../src/content/googleReviewSummary.ts';
const source = execFileSync('git', ['show','4a708a348255e92c7d185f4cf75e31315828a744:src/content/reviews.ts'], { encoding: 'utf8' });
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const original = (await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'))).reviews;
for (const before of original) assert.deepEqual(reviews.find(review => review.id === before.id), before, `Original review ${before.id} changed`);
assert.equal(original.length, 22);
assert.equal(reviews.length, 26);
assert.equal(new Set(reviews.map(review => review.id)).size, 26);
for (const review of googleReviews) {
  assert.deepEqual(reviews.find(item => item.id === review.id), review);
  assert.equal(review.platform, 'Google');
  assert.equal(review.stars, 5);
  assert.ok(/^2026-\d\d-\d\d$/.test(review.date));
  assert.ok(review.sourceUrl.startsWith('https://www.google.com/maps/reviews/'));
}
assert.equal(googleReviewSummary.reviewCount, 402);
assert.notEqual(googleReviewSummary.reviewCount, reviews.length);
console.log('PASS: all 22 original reviews unchanged; four attributed dated Google reviews; aggregate separated from curated count.');
