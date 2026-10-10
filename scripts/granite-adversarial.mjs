import fs from 'node:fs';
import path from 'node:path';

const phase = process.argv[2] === 'post' ? 'post' : 'baseline';
const evidenceDir = path.join('docs', 'adversarial-review', '2026-10-09');
fs.mkdirSync(evidenceDir, { recursive: true });
const sources = [
  ['src/components/sections/Contact.tsx', 9000],
  ['src/components/context/ThemeContext.tsx', 6300],
  ['src/components/ui/CanvasBackground.tsx', 7200],
  ['src/components/layout/Header.tsx', 4800],
  ['src/components/context/LanguageContext.tsx', 3200],
];
const excerpts = sources.map(([file, max]) => `FILE ${file}\n${fs.readFileSync(file, 'utf8').slice(0, max)}`).join('\n\n');

async function generate(model, prompt, tokenLimit) {
  const response = await fetch('http://127.0.0.1:11434/api/generate', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    signal: AbortSignal.timeout(180000),
    body: JSON.stringify({ model, prompt, stream: false, format: 'json', think: false, options: { temperature: 0, num_ctx: 8192, num_predict: tokenLimit } }),
  });
  if (!response.ok) throw new Error(`${model}: ${response.status} ${await response.text()}`);
  const data = await response.json();
  try { return { model, output: JSON.parse(data.response), response: data.response, duration_ns: data.total_duration }; }
  catch { return { model, parse_error: true, response: data.response, duration_ns: data.total_duration }; }
}

const criticPrompt = [
  'You are IBM Granite, an adversarial product QA and accessibility reviewer for a multilingual, static-export Next.js portfolio used by recruiters and clients.',
  'Identify real defects only, citing exact code behavior and precise source path. DO NOT infer that unshown files have a bug.',
  'Test these attack paths: recruiter fills contact form but mail app does not send; keyboard/screen-reader users change theme in Spanish/Portuguese; user changes reduced-motion preference while animation is running; background animation is offscreen or tab is hidden; browser blocks local storage.',
  'Prioritize customer trust and accessibility. Distinguish proven issues from plausible risks; never claim that mailto delivers email.',
  'Return JSON with schema {"verdict":"CHANGES_REQUIRED|PASS_WITH_RISKS|PASS","findings":[{"severity":"HIGH|MEDIUM|LOW","file":"...","finding":"...","evidence":"...","reproduction":"...","minimal_fix":"..."}],"unknowns":["..."]}. Maximum 6 findings.',
  `SOURCE (phase=${phase}):`, excerpts,
].join('\n');

const critic = await generate('ibm/granite3.3:2b', criticPrompt, 1050);
fs.writeFileSync(path.join(evidenceDir, `granite-${phase}-critic.json`), JSON.stringify(critic, null, 2));
console.log('CRITIC:', JSON.stringify(critic.output || critic.response));
const verifierPrompt = [
  'You are a separate, skeptical auditor. Verify Granite review accuracy against the provided actual source excerpts.',
  'Classify each critic finding as SUPPORTED, PARTIAL, or UNSUPPORTED. Do not treat the review as proof of successful runtime execution.',
  'Return JSON only {"assessments":[{"file":"...","judgment":"SUPPORTED|PARTIAL|UNSUPPORTED","reason":"..."}],"verdict":"CHANGES_REQUIRED|PASS_WITH_RISKS|PASS","missing_critical_risks":["..."]}.',
  'REVIEW:', JSON.stringify(critic.output || critic.response),
  'SOURCE:', excerpts.slice(0, 16500),
].join('\n');
try {
  const verifier = await generate('ibm/granite4:1b', verifierPrompt, 720);
  fs.writeFileSync(path.join(evidenceDir, `granite-${phase}-verifier.json`), JSON.stringify(verifier, null, 2));
  console.log('VERIFIER:', JSON.stringify(verifier.output || verifier.response));
} catch (error) {
  fs.writeFileSync(path.join(evidenceDir, `granite-${phase}-verifier-error.txt`), String(error));
  console.error('VERIFIER_UNAVAILABLE:', String(error));
}
