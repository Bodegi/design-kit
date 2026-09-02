import { icons } from '../../src/icons/icon-data.js';

const iconDefs: Record<string, string> = icons;
const iconNames = Object.keys(iconDefs);

export function renderIconGallery(container: HTMLElement) {
  container.innerHTML = `
    <section class="ws-section">
      <div class="ws-icon-toolbar">
        <div>
          <h2 class="ws-section-title">Curated SVG Icon Suite (${iconNames.length} Icons)</h2>
          <p class="ws-section-desc">Consistent 24x24 outline vector icons. Click any icon card to copy its markup.</p>
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
      <div class="ws-card ws-icon-card" data-icon="${name}" title="Click to copy <svg> markup for ${name}">
        <div class="ws-icon-preview">
          <svg class="ui-icon" data-size="lg" viewBox="0 0 24 24" aria-hidden="true">
            ${paths}
          </svg>
        </div>
        <div class="ws-icon-name">${name}</div>
      </div>
    `;
  }).join('');
}

function attachIconClickListeners(grid: HTMLElement) {
  grid.querySelectorAll<HTMLElement>('.ws-icon-card').forEach((card) => {
    card.addEventListener('click', () => {
      const iconName = card.dataset.icon;
      if (iconName) {
        const markup = `<svg class="ui-icon"><use href="design-kit/dist/icons/sprite.svg#${iconName}"></use></svg>`;
        navigator.clipboard.writeText(markup);
        showToast(`Copied sprite markup for "${iconName}"!`);
      }
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
