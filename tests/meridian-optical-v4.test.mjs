import { readFileSync, existsSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const root = new URL('../public/recruiting-demo/', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const index = read('index.html');
const v4 = read('assets/meridian-optical-v4.css');
const experience = read('assets/meridian-experience.js');
const lab = read('optical-lab.html');
const labCSS = read('assets/meridian-optical-lab.css');
const labJS = read('assets/meridian-optical-lab.js');

test('Meridian v4 material layer loads after Experience 2.0, preserving the original app bundle', () => {
  for (const asset of ['index-DV0VSLRm.js', 'meridian-liquid-glass.css', 'meridian-optical-v4.css', 'meridian-experience.js']) {
    assert.ok(index.includes(asset), `missing ${asset}`);
  }
  assert.ok(index.indexOf('meridian-optical-v4.css') > index.indexOf('meridian-liquid-glass.css'));
  assert.equal(existsSync(new URL('optical-lab.html', root)), true);
});

test('v4 has explicit solid content, functional glass, and two theme contracts', () => {
  for (const token of ['--meridian-content-fill', '--meridian-regular-fill', '--meridian-clear-fill', '--meridian-optical-blur', '--meridian-focus-ring']) {
    assert.ok(v4.includes(token), `missing token ${token}`);
  }
  assert.match(v4, /:root\[data-theme="dark"\]/);
  assert.match(v4, /#main \.glass-panel/);
  assert.match(v4, /aside\.glass-chrome/);
  assert.match(v4, /backdrop-filter: none/);
  assert.match(v4, /blur\(var\(--meridian-optical-blur\)\)/);
  assert.match(experience, /panel\.dataset\.meridianMaterial = 'content'/);
  assert.match(experience, /control\.dataset\.meridianMaterial = 'regular'/);
});

test('optical filters degrade under accessibility and low-capability conditions', () => {
  for (const feature of ['prefers-reduced-transparency', 'prefers-contrast: more', 'forced-colors: active', '@supports not', 'focus-visible']) {
    assert.ok(v4.includes(feature), `missing ${feature}`);
  }
  assert.match(labCSS, /prefers-reduced-motion:reduce/);
  assert.match(labJS, /if \(reduced\.matches\)/);
  assert.match(labJS, /clearRefraction\(\)/);
  assert.match(labJS, /ResizeObserver/);
});

test('optical lab is separate, interactive, non-indexed and does not load Glass-HQ', () => {
  assert.match(lab, /name="robots" content="noindex,nofollow"/);
  for (const material of ['regular', 'clear', 'content']) {
    assert.ok(lab.includes(`data-select-material="${material}"`));
    assert.ok(labJS.includes(`${material}:`));
  }
  assert.match(lab, /aria-pressed="true"/);
  assert.match(lab, /data-optical-lens/);
  assert.match(lab, /feDisplacementMap/);
  assert.match(labJS, /requestAdapter/);
  assert.doesNotMatch(lab, /https?:\/\//);
  assert.doesNotMatch(labJS, /fetch\s*\(|XMLHttpRequest|eval\s*\(/);
});

test('recruiter decision confirmation and human review boundaries remain in place', () => {
  assert.match(experience, /openDecisionReview/);
  assert.match(experience, /Confirm not progressing/);
  assert.match(experience, /stopImmediatePropagation/);
  assert.match(experience, /Automatic advancement based on a screening score is unavailable/);
  assert.match(experience, /Open Meridian Copilot/);
  assert.match(v4, /safe-area-inset-bottom/);
});
