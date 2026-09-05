import type { Section } from './section';
import { copyControls } from './shared';

// Labels one skeleton with the animation it is demonstrating (workshop-only chrome).
function skeletonAnimationRow(animation: string): string {
  return `<div style="display: flex; align-items: center; gap: var(--space-4);">
            <span style="min-width: 5rem; font-size: var(--text-sm); color: var(--color-text-muted);">${animation}</span>
            <span class="ui-skeleton" data-animation="${animation}" style="flex: 1;" aria-hidden="true"></span>
          </div>`;
}

const skeletonSnippet = `<span class="ui-skeleton" data-shape="text" aria-hidden="true"></span>
<span class="ui-skeleton" data-shape="rect" aria-hidden="true"></span>
<span class="ui-skeleton" data-shape="circle" aria-hidden="true"></span>`;

const skeletonTextSnippet = `<div class="ui-skeleton-text" aria-hidden="true">
  <span class="ui-skeleton"></span>
  <span class="ui-skeleton"></span>
  <span class="ui-skeleton"></span>
</div>`;

const skeletonCardSnippet = `<div class="ui-panel" aria-busy="true">
  <div class="ui-panel-body">
    <span class="ui-skeleton" data-shape="circle" data-size="lg" aria-hidden="true"></span>
    <div class="ui-skeleton-text" aria-hidden="true">
      <span class="ui-skeleton" data-size="md"></span>
      <span class="ui-skeleton" data-size="sm"></span>
    </div>
    <span class="ui-skeleton" data-shape="rect" aria-hidden="true"></span>
  </div>
</div>`;

export const skeletonSection: Section = {
  id: 'skeleton',
  title: 'Skeleton (.ui-skeleton)',
  html: `    <!-- Skeleton Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Skeleton (.ui-skeleton)</h2>
      <p class="ws-section-desc">A loading placeholder shaped like the content that is still arriving. <code>data-shape</code> picks text / rect / circle, <code>data-size</code> sets the font-size every shape is measured against, and <code>data-animation</code> chooses shimmer (default), pulse, or none. The app marks the loading region <code>aria-busy="true"</code> and the skeletons themselves are <code>aria-hidden="true"</code> — they announce nothing.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Shapes</span>
          ${copyControls(skeletonSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <span class="ui-skeleton" data-shape="text" aria-hidden="true"></span>
          <span class="ui-skeleton" data-shape="rect" aria-hidden="true"></span>
          <span class="ui-skeleton" data-shape="circle" aria-hidden="true"></span>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Sizes (text lines &amp; circles)</span>
          ${copyControls('<span class="ui-skeleton" data-shape="text" data-size="sm" aria-hidden="true"></span>\n<span class="ui-skeleton" data-shape="circle" data-size="lg" aria-hidden="true"></span>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <span class="ui-skeleton" data-shape="text" data-size="sm" aria-hidden="true"></span>
          <span class="ui-skeleton" data-shape="text" data-size="md" aria-hidden="true"></span>
          <span class="ui-skeleton" data-shape="text" data-size="lg" aria-hidden="true"></span>
          <div style="display: flex; align-items: center; gap: var(--space-4);">
            <span class="ui-skeleton" data-shape="circle" data-size="sm" aria-hidden="true"></span>
            <span class="ui-skeleton" data-shape="circle" data-size="md" aria-hidden="true"></span>
            <span class="ui-skeleton" data-shape="circle" data-size="lg" aria-hidden="true"></span>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Text block — last line runs short</span>
          ${copyControls(skeletonTextSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-skeleton-text" aria-hidden="true">
            <span class="ui-skeleton"></span>
            <span class="ui-skeleton"></span>
            <span class="ui-skeleton"></span>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Animations — shimmer / pulse / none</span>
          ${copyControls('<span class="ui-skeleton" data-animation="shimmer" aria-hidden="true"></span>\n<span class="ui-skeleton" data-animation="pulse" aria-hidden="true"></span>\n<span class="ui-skeleton" data-animation="none" aria-hidden="true"></span>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          ${skeletonAnimationRow('shimmer')}
          ${skeletonAnimationRow('pulse')}
          ${skeletonAnimationRow('none')}
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Composed card — loading beside loaded</span>
          ${copyControls(skeletonCardSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-5); align-items: stretch;">
          <div class="ui-panel" style="flex: 1 1 260px;" aria-busy="true">
            <div class="ui-panel-body" style="display: flex; flex-direction: column; gap: var(--space-4);">
              <div style="display: flex; align-items: center; gap: var(--space-3);">
                <span class="ui-skeleton" data-shape="circle" data-size="lg" aria-hidden="true"></span>
                <div class="ui-skeleton-text" style="flex: 1;" aria-hidden="true">
                  <span class="ui-skeleton" data-size="md"></span>
                  <span class="ui-skeleton" data-size="sm"></span>
                </div>
              </div>
              <span class="ui-skeleton" data-shape="rect" aria-hidden="true"></span>
            </div>
          </div>
          <div class="ui-panel" style="flex: 1 1 260px;">
            <div class="ui-panel-body" style="display: flex; flex-direction: column; gap: var(--space-4);">
              <div style="display: flex; align-items: center; gap: var(--space-3);">
                <span style="width: 2.5rem; height: 2.5rem; flex-shrink: 0; border-radius: var(--radius-full); background-color: var(--color-primary-subtle); color: var(--color-primary); font-weight: var(--font-semibold); display: inline-flex; align-items: center; justify-content: center;">P</span>
                <div>
                  <p style="margin: 0; font-weight: var(--font-medium);">Pangaea Atlas</p>
                  <p style="margin: 0; font-size: var(--text-sm); color: var(--color-text-muted);">Updated 4 minutes ago</p>
                </div>
              </div>
              <p style="margin: 0; color: var(--color-text-muted); font-size: var(--text-sm);">Continental drift reconstructions from 250 Ma to present, rendered from the shared plate model.</p>
            </div>
          </div>
        </div>
      </div>
    </section>`,
};
