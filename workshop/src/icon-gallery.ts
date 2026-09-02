import { icons } from '../../src/icons/icon-data.js';

const iconDefs: Record<string, string> = icons;
const iconNames = Object.keys(iconDefs);

export function renderIconGallery(container: HTMLElement) {
  container.innerHTML = `
    <section class="ws-section">
      <div class="ws-icon-toolbar">
        <div>
          <h2 class="ws-section-title">Curated SVG Icon Suite (${iconNames.length} Icons)</h2>
          <p class="ws-section-desc">Consistent 24x24 outline vector icons. Copy sprite <use> or inline SVG markup for any icon.</p>
        </div>
        <div class="ws-icon-search-wrap">
          <input type="text" id="ws-icon-search-input" class="ui-input" placeholder="Search icons..." />
        </div>
      </div>

      <div id="ws-icon-grid" class="ws-icon-grid">
        ${renderIconCards(iconNames)}
      </div>
    </section>
  `;

  const searchInput = document.getElementById('ws-icon-search-input') as HTMLInputElement | null;
  const grid = document.getElementById('ws-icon-grid');

  if (searchInput && grid) {
    searchInput.addEventListener('input', (e) => {
      const q = (e.target as HTMLInputElement).value.toLowerCase().trim();
      const filtered = iconNames.filter((name) => name.includes(q));
      grid.innerHTML = renderIconCards(filtered);
      attachIconClickListeners(grid);
    });
  }

  if (grid) {
    attachIconClickListeners(grid);
  }
}

function renderIconCards(list: string[]) {
  if (list.length === 0) {
    return `<div style="grid-column: 1/-1; padding: var(--space-8); text-align: center; color: var(--color-text-muted);">No icons found matching your search.</div>`;
  }

  return list.map((name) => {
    const paths = iconDefs[name] || '';
    return `
      <div class="ws-card ws-icon-card" data-icon="${name}">
        <div class="ws-icon-preview">
          <svg class="ui-icon" data-size="lg" viewBox="0 0 24 24" aria-hidden="true">
            ${paths}
          </svg>
        </div>
        <div class="ws-icon-name">${name}</div>
        <div class="ws-icon-actions">
          <button type="button" class="ui-btn" data-size="sm" data-variant="ghost" data-copy="sprite" data-icon="${name}">Sprite</button>
          <button type="button" class="ui-btn" data-size="sm" data-variant="ghost" data-copy="inline" data-icon="${name}">Inline</button>
        </div>
      </div>
    `;
  }).join('');
}

function spriteMarkup(name: string) {
  return `<svg class="ui-icon" aria-hidden="true"><use href="design-kit/dist/icons/sprite.svg#${name}"></use></svg>`;
}

function inlineMarkup(name: string) {
  const paths = iconDefs[name] || '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ui-icon" aria-hidden="true">${paths}</svg>`;
}

function attachIconClickListeners(grid: HTMLElement) {
  grid.querySelectorAll<HTMLButtonElement>('.ws-icon-actions button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.icon;
      const kind = btn.dataset.copy;
      if (!name || !kind) return;
      const markup = kind === 'inline' ? inlineMarkup(name) : spriteMarkup(name);
      navigator.clipboard.writeText(markup);
      showToast(`Copied ${kind} markup for "${name}"!`);
    });
  });
}

function showToast(message: string) {
  const toast = document.getElementById('ws-toast');
  if (!toast) return;
  toast.textContent = message;
  toast.setAttribute('data-visible', 'true');
  setTimeout(() => {
    toast.setAttribute('data-visible', 'false');
  }, 2000);
}
