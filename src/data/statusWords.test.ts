/** Run with `node --experimental-strip-types src/data/statusWords.test.ts`.
 *  PLU-438: lists gain "Report rejected"; every earlier word stays as it was. */
import assert from 'node:assert/strict';
import { statusWords, statusWordMap } from './statusWords.ts';

const before: Array<[string, string, string, string, boolean]> = [
  ['invited', 'Invited', 'neutral', 'dot', false],
  ['in-progress', 'In progress', 'info', 'dot', false],
  ['scoring', 'Scoring', 'info', 'dot', false],
  ['awaiting-verification', 'Awaiting verification', 'neutral', 'dot', false],
  ['verified', 'Verified', 'neutral', 'check', false],
  ['cancelled', 'Cancelled', 'neutral', 'dot', false],
  ['expired', 'Expired', 'neutral', 'dot', false],
  ['scored', 'Scored', 'neutral', 'dot', true],
  ['scoring-failed', 'Scoring failed', 'danger', 'dot', true],
  ['incomplete-attempt', 'Incomplete attempt', 'neutral', 'dot', false],
  ['not-verified', 'Not verified', 'neutral', 'dot', false]
];

for (const [id, label, tone, glyph, adminOnly] of before) {
  const w = statusWordMap[id as keyof typeof statusWordMap];
  assert.ok(w, `${id} is still present`);
  assert.deepEqual([w.label, w.tone, w.glyph, w.adminOnly], [label, tone, glyph, adminOnly], id);
}

const rejected = statusWordMap['report-rejected'];
assert.equal(rejected.label, 'Report rejected');
assert.equal(rejected.tone, statusWordMap['not-verified'].tone);
assert.equal(rejected.glyph, statusWordMap['not-verified'].glyph);
assert.equal(rejected.adminOnly, false);

assert.equal(statusWords.length, before.length + 1);
assert.equal(new Set(statusWords.map((s) => s.id)).size, statusWords.length, 'ids are unique');

console.log('statusWords: all checks passed');
