// Kit styles first (tokens + components), then theme presets, then workshop UI.
// Imported through Vite so they load in dev as well as in the production bundle.
import '../../src/index.css';
import '../../src/themes/default-dark.css';
import '../../src/themes/default-light.css';
import '../../src/themes/server-panel.css';
import '../../src/themes/codex.css';
import '../../src/themes/tectonic.css';
import '../../src/themes/image-hoard.css';
import '../../src/themes/image-annotate.css';
import './workshop.css';

import { renderTokenViewer } from './token-viewer';
import { renderComponentMatrix } from './component-matrix';
import { renderIconGallery } from './icon-gallery';

type Tab = 'tokens' | 'components' | 'icons';
let currentTab: Tab = 'tokens';

document.addEventListener('DOMContentLoaded', () => {
  const themeSelect = document.getElementById('theme-select') as HTMLSelectElement | null;
  const contentRoot = document.getElementById('ws-content-root');
  const tabButtons = document.querySelectorAll<HTMLButtonElement>('.ws-tab-btn');

  // Theme switcher
  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      document.documentElement.setAttribute('data-theme', target.value);
      if (currentTab === 'tokens' && contentRoot) {
        renderTokenViewer(contentRoot);
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
