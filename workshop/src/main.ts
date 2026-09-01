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
