// Kit styles first (tokens + components), then theme presets, then workshop UI.
// Imported through Vite so they load in dev as well as in the production bundle.
// The theme presets are injected by ./themes (its eager glob is the single
// source of truth for every theme menu), so they need no @import here.
import '../../src/index.css';
import './workshop.css';

import { THEMES } from './themes';
import { renderTokenViewer } from './token-viewer';
import { renderComponentMatrix } from './component-matrix';
import { renderIconGallery } from './icon-gallery';
import { renderPalette } from './palette';

type Tab = 'tokens' | 'components' | 'icons' | 'palette';
let currentTab: Tab = 'tokens';

document.addEventListener('DOMContentLoaded', () => {
  const themeSelect = document.getElementById('theme-select') as HTMLSelectElement | null;
  const contentRoot = document.getElementById('ws-content-root');
  const tabButtons = document.querySelectorAll<HTMLButtonElement>('.ws-tab-btn');

  // Theme switcher — options come from the registry so a new theme file shows up
  // here without editing this file.
  if (themeSelect) {
    themeSelect.innerHTML = THEMES.map(
      (theme) => `<option value="${theme.slug}">${theme.label}</option>`,
    ).join('');
  }
  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      document.documentElement.setAttribute('data-theme', target.value);
      if (!contentRoot) return;
      if (currentTab === 'tokens') {
        renderTokenViewer(contentRoot);
      } else if (currentTab === 'palette') {
        renderPalette(contentRoot);
      }
    });
  }

  // Tab switching
  function switchTab(tab: Tab) {
    currentTab = tab;
    tabButtons.forEach((btn) => {
      btn.setAttribute('data-active', btn.dataset.tab === tab ? 'true' : 'false');
    });

    if (!contentRoot) return;

    if (tab === 'tokens') {
      renderTokenViewer(contentRoot);
    } else if (tab === 'components') {
      renderComponentMatrix(contentRoot);
    } else if (tab === 'icons') {
      renderIconGallery(contentRoot);
    } else if (tab === 'palette') {
      renderPalette(contentRoot);
    }
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab as Tab;
      if (tab) switchTab(tab);
    });
  });

  // Initial render
  if (contentRoot) {
    switchTab('tokens');
  }
});
