import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';

let fixtureRoot;
let compiledStylesheet;
const utilitySelectors = new Set();

before(async () => {
  const temporaryRoot = join(tmpdir(), 'opencode');
  await mkdir(temporaryRoot, { recursive: true });
  fixtureRoot = await mkdtemp(join(temporaryRoot, 'codice-tailwind-'));
  await mkdir(join(fixtureRoot, 'src', 'app'), { recursive: true });
  await mkdir(join(fixtureRoot, 'public', 'estudo'), { recursive: true });
  await mkdir(join(fixtureRoot, 'scripts'), { recursive: true });
  await Promise.all([
    writeFile(join(fixtureRoot, 'src', 'component.tsx'), '<span className="sr-only w-7 md:flex" />'),
    writeFile(join(fixtureRoot, 'DESIGN.md'), 'Historical spacing: gap-64'),
    writeFile(join(fixtureRoot, 'public', 'estudo', 'index.html'), '<div class="p-52"></div>'),
    writeFile(join(fixtureRoot, 'scripts', 'check.js'), 'const historicalWidth = "w-80";'),
  ]);

  const stylesheet = await readFile(new URL('../src/app/globals.css', import.meta.url), 'utf8');
  const tailwindPath = fileURLToPath(import.meta.resolve('tailwindcss/index.css')).replaceAll('\\', '/');
  // Keep the real import's source() configuration; only package resolution changes in the fixture.
  const input = stylesheet.replace(/(['"])tailwindcss\1/, JSON.stringify(tailwindPath));
  const result = await postcss([tailwind({ base: fixtureRoot, optimize: true })]).process(input, {
    from: join(fixtureRoot, 'src', 'app', 'globals.css'),
  });
  compiledStylesheet = result.root;
  compiledStylesheet.walkAtRules('layer', layer => {
    if (layer.params === 'utilities') layer.walkRules(rule => utilitySelectors.add(rule.selector));
  });
});

after(async () => {
  if (fixtureRoot) await rm(fixtureRoot, { recursive: true, force: true });
});

test('Tailwind compiles utilities and variants declared inside src', () => {
  for (const selector of ['.sr-only', '.w-7', '.md\\:flex']) {
    assert.ok(utilitySelectors.has(selector), `missing application utility: ${selector}`);
  }
});

test('documentation, verification scripts and preserved studies do not generate utilities', () => {
  for (const selector of ['.gap-64', '.p-52', '.w-80']) {
    assert.ok(!utilitySelectors.has(selector), `non-application content generated ${selector}`);
  }
});

test('Tailwind preflight remains available alongside authored styles', () => {
  const baseDeclarations = [];
  compiledStylesheet.walkAtRules('layer', layer => {
    if (layer.params === 'base') layer.walkDecls(declaration => baseDeclarations.push(declaration));
  });
  assert.ok(baseDeclarations.some(({ prop, value }) => prop === 'box-sizing' && value === 'border-box'));
  assert.ok(baseDeclarations.some(({ prop, value }) => prop === 'margin' && value === '0'));
  assert.ok(compiledStylesheet.nodes.some(node => node.type === 'rule' && node.selector === ':root'));
});
