import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { icons } from '../src/icons/icon-data.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const svgDir = path.join(rootDir, 'src/icons/svg');
const spritePath = path.join(rootDir, 'src/icons/sprite.svg');

fs.mkdirSync(svgDir, { recursive: true });

let spriteSymbols = [];

for (const [name, content] of Object.entries(icons)) {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ui-icon ui-icon-${name}">\n  ${content}\n</svg>\n`;
  fs.writeFileSync(path.join(svgDir, `${name}.svg`), svgContent, 'utf8');

  spriteSymbols.push(`  <symbol id="${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n    ${content}\n  </symbol>`);
}

const spriteSvg = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">\n${spriteSymbols.join('\n')}\n</svg>\n`;
fs.writeFileSync(spritePath, spriteSvg, 'utf8');

console.log(`✓ Successfully generated ${Object.keys(icons).length} standalone SVGs and compiled sprite.svg.`);
