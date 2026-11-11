import assert from 'node:assert/strict';
import test from 'node:test';
import { summarize } from '../src/summarize.js';

test('counts levels and skips blank lines', async () => {
  const result = await summarize(['{"level":"info"}', '', '{"level":"error"}', '{"level":"error"}']);
  assert.deepEqual(result, { info: 1, warn: 0, error: 2 });
});

test('reports the physical line number for malformed JSON', async () => {
  await assert.rejects(summarize(['', 'invalid']), /Line 2: invalid JSON/);
});

test('rejects unsupported levels', async () => {
  await assert.rejects(summarize(['{"level":"debug"}']), /Line 1: expected/);
});
