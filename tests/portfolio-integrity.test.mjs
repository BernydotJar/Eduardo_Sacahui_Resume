import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('homepage presents product evidence before skills and migrations', async () => {
  const page = await read('src/app/page.tsx');
  assert.ok(page.indexOf('<CaseStudies') < page.indexOf('<Skills'));
  assert.ok(page.indexOf('<CaseStudies') < page.indexOf('<Migrations'));
  assert.ok(page.indexOf('<OperatingModel') < page.indexOf('<Experience'));
});

test('positioning and product navigation exist in all three locales', async () => {
  const i18n = await read('src/lib/i18n.ts');
  assert.equal((i18n.match(/AI Product & Platform Engineering Leader/g) ?? []).length, 1);
  assert.match(i18n, /Líder de Ingeniería de Productos y Plataformas AI/);
  assert.match(i18n, /Líder de Engenharia de Produtos e Plataformas de IA/);
  assert.equal((i18n.match(/products:/g) ?? []).length >= 4, true);
});

test('build configuration cannot silently ignore TypeScript or ESLint errors', async () => {
  const config = await read('next.config.ts');
  assert.doesNotMatch(config, /ignoreBuildErrors/);
  assert.doesNotMatch(config, /ignoreDuringBuilds/);
});

test('production metadata uses the actual GitHub Pages owner', async () => {
  const site = await read('src/lib/site.ts');
  const layout = await read('src/app/layout.tsx');
  assert.match(site, /bernydotjar\.github\.io/);
  assert.doesNotMatch(layout, /eduardosacahui\.github\.io/);
});

test('conflicting public project maturity claims are qualified', async () => {
  const constructHub = await read('src/data/constructHubProject.ts');
  const harness = await read('src/data/harnessProject.ts');
  assert.match(constructHub, /Production readiness remains NO-GO/);
  assert.match(constructHub, /Product UX rebuild required/);
  assert.match(harness, /First workflow spec_ready/);
  assert.match(harness, /implementation has not started/);
});

test('shareable project routes are statically generated', async () => {
  const projectPage = await read('src/app/projects/[slug]/page.tsx');
  assert.match(projectPage, /generateStaticParams/);
  assert.match(projectPage, /dynamicParams = false/);
  assert.match(projectPage, /generateMetadata/);
});
