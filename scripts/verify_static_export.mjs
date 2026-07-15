import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'out');
const basePath = '/Eduardo_Sacahui_Resume';

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  }));
  return nested.flat();
};

const targetForUrl = (url) => {
  const clean = url.split('#')[0].split('?')[0];
  if (!clean || clean === basePath || clean === `${basePath}/`) return path.join(outDir, 'index.html');
  if (!clean.startsWith(`${basePath}/`)) return null;

  const relative = decodeURIComponent(clean.slice(basePath.length + 1));
  if (!relative) return path.join(outDir, 'index.html');
  if (relative.endsWith('/')) return path.join(outDir, relative, 'index.html');
  return path.join(outDir, relative);
};

const htmlFiles = (await walk(outDir)).filter((file) => file.endsWith('.html'));
const missing = [];
const unsafeRootRelative = [];

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const references = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const reference of references) {
    if (reference.startsWith('mailto:') || reference.startsWith('tel:') || reference.startsWith('#') || reference.startsWith('data:') || /^https?:\/\//.test(reference)) continue;
    if (reference.startsWith('/') && !reference.startsWith(`${basePath}/`) && reference !== basePath) {
      unsafeRootRelative.push({ file: path.relative(root, file), reference });
      continue;
    }
    const target = targetForUrl(reference);
    if (!target) continue;
    try {
      await access(target);
    } catch {
      missing.push({ file: path.relative(root, file), reference, target: path.relative(root, target) });
    }
  }
}

if (unsafeRootRelative.length || missing.length) {
  if (unsafeRootRelative.length) console.error('Root-relative URLs that bypass the GitHub Pages basePath:', unsafeRootRelative);
  if (missing.length) console.error('Missing static export targets:', missing);
  process.exit(1);
}

console.log(`Verified ${htmlFiles.length} HTML files: all local links and assets resolve under ${basePath}.`);
