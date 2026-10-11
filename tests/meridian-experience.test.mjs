import { readFileSync, existsSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';
const dir = new URL('../public/recruiting-demo/', import.meta.url);
const html = readFileSync(new URL('index.html', dir), 'utf8');
const stylesheet = readFileSync(new URL('assets/meridian-liquid-glass.css', dir), 'utf8');
const js = readFileSync(new URL('assets/meridian-experience.js', dir), 'utf8');

test('Meridian keeps the existing compiled app and adds source-controlled enhancement files', () => {
  assert.match(html, /assets\/index-DV0VSLRm\.js/);
  assert.match(html, /assets\/meridian-liquid-glass\.css/);
  assert.match(html, /assets\/meridian-experience\.js/);
  for (const file of ['index.html', 'assets/meridian-liquid-glass.css', 'assets/meridian-experience.js']) {
    assert.equal(existsSync(new URL(file, dir)), true, file);
  }
});
test('The visual layer has liquid material, both themes, and accessibility fallbacks', () => {
  assert.match(stylesheet, /backdrop-filter: blur\(20px\)/);
  assert.match(stylesheet, /data-theme="dark"/);
  assert.match(stylesheet, /prefers-reduced-motion/);
  assert.match(stylesheet, /forced-colors: active/);
  assert.match(stylesheet, /focus-visible/);
  assert.match(stylesheet, /max-width: 639px/);
});
test('Every one-click dashboard hiring action requires explicit recruiter confirmation', () => {
  assert.match(js, /Confirm your decision/);
  assert.match(js, /View evidence/);
  assert.match(js, /Confirm advance/);
  assert.match(js, /Confirm not progressing/);
  assert.match(js, /approvedClicks/);
  assert.match(js, /stopImmediatePropagation/);
  assert.match(js, /aria-modal/);
  assert.match(js, /Escape/);
});
test('A screen score alone cannot launch the suggested auto-approval workflow', () => {
  assert.match(js, /score above 80, approve for interview/);
  assert.match(js, /button\.disabled = true/);
  assert.match(js, /Automatic advancement based on a screening score is unavailable/);
});
test('Experience script performs no external request or credential reads', () => {
  assert.doesNotMatch(js, /fetch\s*\(/);
  assert.doesNotMatch(js, /XMLHttpRequest/);
  assert.doesNotMatch(js, /\.cookie/);
  assert.doesNotMatch(js, /localStorage|sessionStorage/);
});
