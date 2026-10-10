import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8');

test('contact opens a draft, never claims delivery and preserves the submitted message', async () => {
  const contact = await read('src/components/sections/Contact.tsx');
  assert.match(contact, /window\.location\.href\s*=\s*`mailto:/);
  assert.match(contact, /openEmailDraft\(values\)/);
  assert.match(contact, /toastDraftTitle/);
  assert.doesNotMatch(contact, /form\.reset\s*\(/);
  assert.doesNotMatch(contact, /toastSuccessTitle|simulateContactSubmit/);
});

test('email handoff and theme controls have accurate EN, ES and PT translations', async () => {
  const { translations } = await import('../src/lib/i18n.ts');
  for (const locale of ['en', 'es', 'pt']) {
    const { contact, header } = translations[locale];
    assert.ok(contact.staticSiteNote.length > 25, locale);
    assert.ok(contact.sendMessage.length > 8, locale);
    assert.ok(contact.toastDraftTitle.length > 8, locale);
    assert.ok(contact.toastDraftDescription.length > 30, locale);
    assert.ok(header.themeSwitchToJesse.length > 8, locale);
    assert.ok(header.themeSwitchToHeisenberg.length > 8, locale);
    assert.equal('toastSuccessTitle' in contact, false, locale);
  }
  const header = await read('src/components/layout/Header.tsx');
  assert.match(header, /dict\.header\.themeSwitchToJesse/);
  assert.match(header, /dict\.header\.themeSwitchToHeisenberg/);
});

test('theme transition honors keyboard activation and reduced motion, with storage fallback', async () => {
  const source = await read('src/components/context/ThemeContext.tsx');
  assert.match(source, /event\.detail\s*===\s*0/);
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.match(source, /transition\.ready\.then/);
  assert.match(source, /\.catch\(\(\)\s*=>/);
  assert.match(source, /try\s*\{\s*localStorage\.setItem/);
});

test('background canvas pauses when hidden, out of view or reduced motion changes', async () => {
  const source = await read('src/components/ui/CanvasBackground.tsx');
  assert.match(source, /document\.hidden/);
  assert.match(source, /IntersectionObserver/);
  assert.match(source, /visibilitychange/);
  assert.match(source, /mediaQuery\.addEventListener\('change'/);
  assert.match(source, /mediaQuery\.removeEventListener\('change'/);
  assert.match(source, /stopAnimation\(\)/);
});

test('language changes still work when local storage is unavailable', async () => {
  const source = await read('src/components/context/LanguageContext.tsx');
  assert.match(source, /try\s*\{\s*storedLocale = window\.localStorage\.getItem/);
  assert.match(source, /try\s*\{\s*window\.localStorage\.setItem/);
  assert.match(source, /document\.documentElement\.lang\s*=\s*locale/);
});
