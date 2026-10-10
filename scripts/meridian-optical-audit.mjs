/**
 * Browser acceptance gate for Meridian's static React demo and optical system.
 * Run after installing Playwright: npm install --no-save playwright@1.63.0
 * Optional env: MERIDIAN_PLAYWRIGHT_PACKAGE (package path),
 * MERIDIAN_CHROMIUM_EXECUTABLE (browser path), MERIDIAN_TEST_WEBKIT=1.
 * Uses only a local HTTP server and synthetic demo data.
 */
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname, dirname, sep } from 'node:path';

const require = createRequire(import.meta.url);
const playwright = require(process.env.MERIDIAN_PLAYWRIGHT_PACKAGE || 'playwright');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../public/recruiting-demo');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.svg': 'image/svg+xml' };
const server = createServer(async (request, response) => {
  const pathname = new URL(request.url || '/', 'http://127.0.0.1').pathname;
  const file = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(root + sep)) { response.writeHead(403).end(); return; }
  try {
    const buffer = await readFile(file);
    response.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
    response.end(buffer);
  } catch { response.writeHead(404).end(); }
});
const browserOptions = { headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] };
if (process.env.MERIDIAN_CHROMIUM_EXECUTABLE) browserOptions.executablePath = process.env.MERIDIAN_CHROMIUM_EXECUTABLE;
const routes = [
  ['dashboard', '#/'], ['candidates', '#/candidates'], ['jobs', '#/jobs'],
  ['automations', '#/automations'], ['reports', '#/reports']
];
const themes = ['light', 'dark'];
const screens = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 }
];
const checks = [];
const problems = [];
const add = (name, data, error = '') => {
  checks.push({ name, ...data, ...(error ? { error } : {}) });
  if (error) problems.push({ name, ...data, error });
  console.log(`${error ? 'FAIL' : 'PASS'} ${name} ${JSON.stringify(data)}${error ? ' ' + error : ''}`);
};
const analyzeRoute = async page => page.evaluate(() => {
  const panels = [...document.querySelectorAll('#main .glass-panel')].filter(el => {
    const b = el.getBoundingClientRect();
    return b.width > 1 && b.height > 1;
  });
  const blurredPanels = panels.filter(el => {
    const s = getComputedStyle(el);
    return (s.backdropFilter || s.webkitBackdropFilter) !== 'none';
  }).length;
  const layered = [...document.querySelectorAll('.glass-panel .glass-chrome, .glass-chrome .glass-chrome')].length;
  const sidebar = document.querySelector('aside.glass-chrome');
  const material = sidebar ? getComputedStyle(sidebar).backdropFilter : null;
  return {
    title: document.title,
    route: document.documentElement.dataset.meridianRoute,
    chars: document.querySelector('#main')?.innerText.length ?? 0,
    preview: document.querySelector('#main')?.innerText.trim().slice(0, 160) ?? '',
    panels: panels.length,
    blurredPanels, nestedGlass: layered, sidebarFilter: material,
    overflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
  };
});

async function runChromium(base) {
  const browser = await playwright.chromium.launch(browserOptions);
  try {
    for (const theme of themes) {
      for (const screen of screens) {
        const context = await browser.newContext({ viewport: { width: screen.width, height: screen.height }, reducedMotion: 'reduce' });
        await context.addInitScript(selected => localStorage.setItem('meridian.theme', selected), theme);
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        const scope = `${theme}/${screen.name}`;
        try {
          await page.goto(base + '/index.html', { waitUntil: 'domcontentloaded' });
          await page.getByRole('button', { name: 'Sign in', exact: true }).evaluate(el => el.click());
          await page.locator('#main h1').waitFor({ timeout: 12000 });
          const detailHashes = {};
          for (const [name, hash] of routes) {
            await page.evaluate(next => { location.hash = next; }, hash);
            await page.waitForFunction(route => document.documentElement.dataset.meridianRoute === route, name, { timeout: 10000 });
            await page.waitForFunction(label => document.querySelector('#main h1')?.textContent?.trim() === label,
              name[0].toUpperCase() + name.slice(1), { timeout: 10000 });
            await page.waitForTimeout(140);
            const actual = await analyzeRoute(page);
            const failure = actual.chars < 80 || actual.blurredPanels > 0 || actual.nestedGlass > 0 || actual.overflow > 1
              || actual.sidebarFilter !== 'none' ? 'content/optical regression' : '';
            add(`route:${scope}/${name}`, actual, failure);
            if (name === 'dashboard') detailHashes['candidate-detail'] = await page.locator('a[href*="#/candidates/"]').first().getAttribute('href').catch(() => null);
            if (name === 'jobs') detailHashes['job-detail'] = await page.locator('a[href*="#/jobs/"]').first().getAttribute('href').catch(() => null);
          }
          for (const detailName of ['candidate-detail', 'job-detail']) {
            const link = detailHashes[detailName];
            if (!link) { add(`route:${scope}/${detailName}`, {}, 'detail link not present'); continue; }
            await page.evaluate(target => { location.hash = target.slice(target.indexOf('#')); }, link);
            await page.waitForFunction(route => document.documentElement.dataset.meridianRoute === route, detailName, { timeout: 18000 });
            await page.waitForFunction(() => {
              const text = document.querySelector('#main')?.innerText?.trim() || '';
              return text.length > 80 && !/^Loading/.test(text);
            }, null, { timeout: 18000 });
            const actual = await analyzeRoute(page);
            add(`route:${scope}/${detailName}`, actual,
              actual.chars < 80 || actual.blurredPanels || actual.nestedGlass || actual.overflow > 1 ? 'detail surface regression' : '');
          }
          await page.evaluate(() => { location.hash = '#/'; });
          await page.waitForFunction(() => document.documentElement.dataset.meridianRoute === 'dashboard');
          const approve = page.getByRole('button', { name: 'Approve', exact: true }).first();
          await approve.evaluate(el => el.click());
          await page.getByRole('dialog', { name: 'Confirm your decision' }).waitFor({ timeout: 6000 });
          const modal = await page.getByRole('dialog', { name: 'Confirm your decision' }).getAttribute('aria-modal');
          await page.keyboard.press('Escape');
          const closed = await page.getByRole('dialog', { name: 'Confirm your decision' }).count() === 0;
          add(`decision:${scope}`, { modal, closed }, modal !== 'true' || !closed ? 'recruiter confirmation broken' : '');
        } catch (error) { add(`application:${scope}`, {}, error.message); }
        await page.close();
        const labPage = await context.newPage();
        labPage.on('pageerror', error => errors.push(error.message));
        try {
          await labPage.goto(base + '/optical-lab.html', { waitUntil: 'domcontentloaded', timeout: 20000 });
          await labPage.waitForFunction(() => document.querySelector('[data-optical-lens]')?.dataset.refractionReady === 'true', null, { timeout: 16000 });
          await labPage.getByRole('button', { name: 'Content', exact: true }).evaluate(el => el.click());
          await labPage.waitForFunction(() => getComputedStyle(document.querySelector('.meridian-lab-sample')).backdropFilter === 'none', null, { timeout: 4000 });
          const lab = await labPage.evaluate(() => {
            const sample = document.querySelector('.meridian-lab-sample');
            const style = getComputedStyle(sample);
            return {
              theme: document.documentElement.dataset.theme,
              ready: document.querySelector('[data-optical-lens]').dataset.refractionReady,
              material: sample.dataset.material,
              filter: style.backdropFilter || style.webkitBackdropFilter,
              widthOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
            };
          });
          add(`optical-lab:${scope}`, lab, lab.ready !== 'true' || lab.material !== 'content' || lab.filter !== 'none' || lab.widthOverflow > 1 ? 'optical lab contract failure' : '');
          const cdp = await context.newCDPSession(labPage);
          await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-transparency', value: 'reduce' }] });
          await labPage.waitForFunction(() => document.querySelector('[data-optical-lens]')?.dataset.refractionReady === 'false', null, { timeout: 7000 });
          await labPage.waitForFunction(() => getComputedStyle(document.querySelector('.meridian-lab-sample')).backdropFilter === 'none', null, { timeout: 4000 });
          const reducedFilter = await labPage.locator('.meridian-lab-sample').evaluate(el => getComputedStyle(el).backdropFilter);
          add(`reduced-transparency:${scope}`, { lensReady: 'false', filter: reducedFilter }, reducedFilter !== 'none' ? 'reduced transparency regression' : '');
          await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-contrast', value: 'more' }] });
          await labPage.getByRole('button', { name: 'Regular', exact: true }).evaluate(el => el.click());
          await labPage.waitForFunction(() => getComputedStyle(document.querySelector('.meridian-lab-sample')).backdropFilter === 'none', null, { timeout: 5000 });
          await labPage.waitForFunction(() => getComputedStyle(document.querySelector('.meridian-lab-tabs')).backdropFilter === 'none', null, { timeout: 5000 });
          const tabsFilter = await labPage.locator('.meridian-lab-tabs').evaluate(el => getComputedStyle(el).backdropFilter);
          add(`high-contrast:${scope}`, { tabsFilter }, tabsFilter !== 'none' ? 'high contrast blur regression' : '');
          await cdp.detach();
        } catch (error) { add(`optical-lab:${scope}`, {}, error.message); }
        add(`page-errors:${scope}`, { count: errors.length }, errors.length ? errors.join('; ').slice(0, 600) : '');
        await labPage.close();
        await context.close();
      }
    }
  } finally { await browser.close(); }
}

async function runOptionalWebkit(base) {
  if (process.env.MERIDIAN_TEST_WEBKIT !== '1') return;
  const browser = await playwright.webkit.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(base + '/optical-lab.html', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(700);
    const ready = await page.locator('[data-optical-lens]').getAttribute('data-refraction-ready');
    const overflow = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth));
    add('webkit:optical-lab', { ready, overflow }, ready !== 'true' || overflow > 1 ? 'WebKit material regression' : '');
  } finally { await browser.close(); }
}

try {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  await runChromium(base);
  await runOptionalWebkit(base);
} catch (error) { add('runner', {}, error.stack || error.message); }
finally {
  server.close();
  const dir = resolve(root, '../../evidence/meridian');
  await mkdir(dir, { recursive: true });
  await writeFile(resolve(dir, 'optical-v4-browser.json'), JSON.stringify({
    createdAt: new Date().toISOString(),
    revision: 'meridian-optical-v4',
    scenarios: checks.length,
    failed: problems.length,
    checks,
  }, null, 2) + '\n');
  console.log(`Meridian optical gate: ${checks.length - problems.length}/${checks.length} PASS`);
  if (problems.length) process.exitCode = 1;
}
