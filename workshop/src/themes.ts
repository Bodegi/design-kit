/* ==========================================================================
   The theme registry — the single source of truth for every menu.

   Discovers src/themes/*.css at build time (eager, so the side-effect import
   also injects each stylesheet — this is what loads the presets, replacing a
   hand-maintained @import list), derives a display label from the file name,
   and sorts them: Default Dark, then Default Light, then the rest alphabetical.
   Drop a new src/themes/<slug>.css and it appears, correctly placed and
   labelled, in the header picker and the Palette seed dropdown with no edits.
   ========================================================================== */
const modules = import.meta.glob('../../src/themes/*.css', { eager: true });

export type ThemeEntry = { slug: string; label: string };

function labelFor(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Dark and light lead; every other theme falls to the alphabetical tail.
function rank(slug: string): number {
  return slug === 'default-dark' ? 0 : slug === 'default-light' ? 1 : 2;
}

export const THEMES: ThemeEntry[] = Object.keys(modules)
  .map((path) => path.split('/').pop()!.replace(/\.css$/, ''))
  .map((slug) => ({ slug, label: labelFor(slug) }))
  .sort((a, b) => rank(a.slug) - rank(b.slug) || a.slug.localeCompare(b.slug));
