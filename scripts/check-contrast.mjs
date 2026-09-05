#!/usr/bin/env node
/**
 * WCAG AA gate, command-line edition.
 *
 * Resolves every theme's color tokens straight from the CSS sources and runs
 * them through the same pairing list and math the workshop's Token panel uses
 * (workshop/src/contrast.ts — Node strips the types on import), so the two
 * cannot disagree. Prints a table per theme and exits 1 if any row fails.
 */
import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { PAIRINGS, evaluatePairings } from '../workshop/src/contrast.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const semanticPath = path.join(root, 'src/tokens/semantic.css');
const themesDir = path.join(root, 'src/themes');

/** Custom-property declarations inside the first rule whose selector matches. */
async function readTokens(file, matchesSelector) {
  const css = (await readFile(file, 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '');
  const blocks = css.matchAll(/([^{}]+)\{([^{}]*)\}/g);
  const tokens = {};
  for (const [, selector, body] of blocks) {
    const parts = selector.split(',').map((part) => part.trim()).filter(Boolean);
    if (!parts.some(matchesSelector)) continue;
    for (const [, name, value] of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      tokens[name] = value.trim();
    }
  }
  return tokens;
}

/** Resolves a token, following a single level of var() indirection. */
function makeResolver(tokens) {
  return (token) => {
    const value = tokens[token];
    if (!value) return '';
    const indirect = value.match(/^var\(\s*(--[\w-]+)/);
    return indirect ? (tokens[indirect[1]] ?? '').trim() : value;
  };
}

function formatRow({ pairing, ratio, pass }) {
  const label = pairing.label.padEnd(30);
  const measured = (ratio === null ? 'n/a' : `${ratio.toFixed(2)}:1`).padStart(8);
  const needs = `needs ${pairing.threshold.toFixed(1)}:1`.padEnd(13);
  return `  ${pass ? 'PASS' : 'FAIL'}  ${label} ${measured}  ${needs} ${pairing.fg} on ${pairing.bg.join(' on ')}`;
}

const baseline = await readTokens(semanticPath, (selector) => selector === ':root');
const themeFiles = (await readdir(themesDir)).filter((f) => f.endsWith('.css')).sort();

let totalFailures = 0;
const summary = [];

for (const file of themeFiles) {
  const theme = path.basename(file, '.css');
  const overrides = await readTokens(path.join(themesDir, file), (selector) => selector.includes('[data-theme='));
  const resolve = makeResolver({ ...baseline, ...overrides });
  const results = evaluatePairings(resolve);
  const failures = results.filter((result) => !result.pass);

  console.log(`\n${theme} — ${failures.length} of ${results.length} pairings fail`);
  for (const result of results) console.log(formatRow(result));

  totalFailures += failures.length;
  summary.push(`${theme}: ${failures.length}/${results.length} fail`);
}

console.log(`\n${PAIRINGS.length} pairings x ${themeFiles.length} themes`);
for (const line of summary) console.log(`  ${line}`);

process.exit(totalFailures > 0 ? 1 : 0);
