import { renderTokenViewer } from './token-viewer';

document.addEventListener('DOMContentLoaded', () => {
  const themeSelect = document.getElementById('theme-select') as HTMLSelectElement | null;
  const tokenRoot = document.getElementById('token-viewer-root');

  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      document.documentElement.setAttribute('data-theme', target.value);
    });
  }

  if (tokenRoot) {
    renderTokenViewer(tokenRoot);
  }
});
