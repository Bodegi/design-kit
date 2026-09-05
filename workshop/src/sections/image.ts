import type { Section } from './section';
import { copyControls } from './shared';

// A transparent pixel standing in for bytes that have not arrived: the frame's
// shimmer shows straight through it.
const WS_PENDING_PIXEL = (() => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/png');
})();

// Swaps the pending pixel for the real picture and flips aria-busy with it, so
// the shimmer can be seen starting and stopping. The kit ships no runtime; the
// app owns that attribute.
function wireImageStates(root: HTMLElement) {
  const frame = root.querySelector<HTMLElement>('#ws-image-busy');
  const picture = frame?.querySelector('img');
  root.querySelector<HTMLButtonElement>('#ws-image-busy-toggle')?.addEventListener('click', () => {
    if (!frame || !picture) return;
    const busy = frame.getAttribute('aria-busy') === 'true';
    frame.setAttribute('aria-busy', busy ? 'false' : 'true');
    picture.src = busy ? (picture.dataset.src ?? '') : WS_PENDING_PIXEL;
  });
}

// Stand-in photographs, drawn on a canvas and handed over as PNG data URIs, so
// the workshop pulls nothing from the network. A raster rather than an inline
// SVG on purpose: an SVG fits itself to whatever box it is given, which makes
// data-fit="cover" / "contain" / "fill" render identically.
function wsPhoto(from: string, to: string): string {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const gradient = ctx.createLinearGradient(0, 0, 300, 400);
  gradient.addColorStop(0, from);
  gradient.addColorStop(1, to);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 300, 400);

  ctx.globalAlpha = 0.45;
  ctx.fillStyle = to;
  ctx.beginPath();
  ctx.arc(210, 110, 64, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 0.55;
  ctx.fillStyle = from;
  ctx.beginPath();
  ctx.moveTo(0, 320);
  [[110, 210], [200, 300], [300, 190], [300, 400], [0, 400]].forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.closePath();
  ctx.fill();

  return canvas.toDataURL('image/png');
}

const imageFitSnippet = `<figure class="ui-image" data-fit="contain" data-ratio="16:9">
  <img src="study.jpg" alt="Abstract gradient study">
  <figcaption class="ui-image-caption">Letterboxed against --color-bg-muted</figcaption>
</figure>`;

// Any ratio the four data-ratio values miss goes through the knob:
// style="--ui-image-ratio: 21 / 9".
const imageRatioSnippet = `<figure class="ui-image" data-ratio="4:3">
  <img src="study.jpg" alt="Abstract gradient study">
</figure>
<figure class="ui-image" data-shape="circle">
  <img src="portrait.jpg" alt="Site lead">
</figure>`;

const imageCaptionSnippet = `<figure class="ui-image" data-ratio="4:3" data-caption="overlay">
  <img src="study.jpg" alt="Abstract gradient study">
  <figcaption class="ui-image-caption">On the scrim, whatever the picture is doing.</figcaption>
</figure>`;

const imageGridSnippet = `<div class="ui-image-grid" style="--ui-image-grid-min: 160px;">
  <button class="ui-image" type="button" data-variant="thumbnail" data-ratio="1:1">
    <img src="item.jpg" alt="Library item RAW">
    <span class="ui-image-badge" data-position="end"><span class="ui-tag" data-intent="info">RAW</span></span>
  </button>
</div>`;

const imageStateSnippet = `<figure class="ui-image" data-ratio="4:3" aria-busy="true">
  <img src="study.jpg" alt="Abstract gradient study">
</figure>

<figure class="ui-image" data-ratio="4:3" data-state="error">
  <img alt="">
  <span class="ui-image-fallback">
    <svg viewBox="0 0 24 24" aria-hidden="true">…</svg>
    Image unavailable
  </span>
</figure>`;

const imageInteractiveSnippet = `<a class="ui-image" href="/atlas" data-ratio="3:2">
  <img src="study.jpg" alt="Open the plate atlas">
  <span class="ui-image-badge"><span class="ui-badge" data-intent="info">Atlas</span></span>
</a>`;

export const imageSection: Section = {
  html: `    <!-- Image Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Image (.ui-image)</h2>
      <p class="ws-section-desc">A framed picture and the things that hang off it. <code>data-fit</code> crops or letterboxes, <code>data-ratio</code> (or the <code>--ui-image-ratio</code> knob) sets the box, <code>data-shape</code> picks the rounding, and <code>data-variant="thumbnail"</code> is the contact-sheet scale. <code>aria-busy="true"</code> runs the loading shimmer; an <code>&lt;img&gt;</code> with no <code>src</code> — or <code>data-state="error"</code> after a failed load — reveals <code>.ui-image-fallback</code>. The pictures below are canvas-drawn PNG data URIs, not files.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Fit — cover / contain / fill in a 16:9 box</span>
          ${copyControls(imageFitSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-5); align-items: flex-start;">
          ${(['cover', 'contain', 'fill'] as const)
            .map(
              (fit) => `
            <figure class="ui-image" data-fit="${fit}" data-ratio="16:9" style="flex: 1 1 200px;">
              <img src="${wsPhoto('#1d4ed8', '#a21caf')}" alt="Abstract gradient study">
              <figcaption class="ui-image-caption">data-fit="${fit}"</figcaption>
            </figure>`,
            )
            .join('')}
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Ratio &amp; shape</span>
          ${copyControls(imageRatioSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-5); align-items: flex-start;">
          ${(['1:1', '4:3', '3:2', '16:9'] as const)
            .map(
              (ratio) => `
            <figure class="ui-image" data-ratio="${ratio}" style="flex: 1 1 160px;">
              <img src="${wsPhoto('#0f766e', '#22d3ee')}" alt="Abstract gradient study">
              <figcaption class="ui-image-caption">${ratio}</figcaption>
            </figure>`,
            )
            .join('')}
          <figure class="ui-image" data-shape="circle" style="flex: 0 0 120px;">
            <img src="${wsPhoto('#7c2d12', '#f59e0b')}" alt="Abstract gradient study">
            <figcaption class="ui-image-caption" style="text-align: center;">circle</figcaption>
          </figure>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Caption — below, and on the scrim</span>
          ${copyControls(imageCaptionSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-5); align-items: flex-start;">
          <figure class="ui-image" data-ratio="4:3" style="flex: 1 1 240px;">
            <img src="${wsPhoto('#312e81', '#c084fc')}" alt="Abstract gradient study">
            <figcaption class="ui-image-caption">Plate reconstruction, 250 Ma — muted ink under the picture.</figcaption>
          </figure>
          <figure class="ui-image" data-ratio="4:3" data-caption="overlay" style="flex: 1 1 240px;">
            <img src="${wsPhoto('#f8fafc', '#fde68a')}" alt="Abstract gradient study">
            <figcaption class="ui-image-caption">On the scrim — solid under the words, fading above them, so a pale picture cannot wash the text out.</figcaption>
          </figure>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Thumbnail grid with badges</span>
          ${copyControls(imageGridSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-image-grid" style="width: 100%;">
            ${[
              ['#0369a1', '#38bdf8', 'RAW', 'info'],
              ['#166534', '#4ade80', 'New', 'success'],
              ['#7e22ce', '#e879f9', '4K', 'accent'],
              ['#9a3412', '#fb923c', 'Dup', 'warning'],
              ['#1e3a8a', '#93c5fd', 'HDR', 'primary'],
            ]
              .map(
                ([from, to, label, intent]) => `
              <button class="ui-image" type="button" data-variant="thumbnail" data-ratio="1:1">
                <img src="${wsPhoto(from, to)}" alt="Library item ${label}">
                <span class="ui-image-badge" data-position="end"><span class="ui-tag" data-intent="${intent}">${label}</span></span>
              </button>`,
              )
              .join('')}
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Loading &amp; error states</span>
          ${copyControls(imageStateSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-5); align-items: flex-start;">
          <figure class="ui-image" id="ws-image-busy" data-ratio="4:3" aria-busy="true" style="flex: 1 1 200px;">
            <img src="${WS_PENDING_PIXEL}" data-src="${wsPhoto('#155e75', '#67e8f9')}" alt="Abstract gradient study">
            <figcaption class="ui-image-caption">aria-busy — toggle it</figcaption>
          </figure>
          <figure class="ui-image" data-ratio="4:3" data-state="error" style="flex: 1 1 200px;">
            <img alt="">
            <span class="ui-image-fallback">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m4 17 5-5 4 4 3-3 4 4"/><path d="m3 3 18 18"/></svg>
              Image unavailable
            </span>
            <figcaption class="ui-image-caption">data-state="error"</figcaption>
          </figure>
          <figure class="ui-image" data-ratio="4:3" style="flex: 1 1 200px;">
            <img alt="">
            <span class="ui-image-fallback">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m4 17 5-5 4 4 3-3 4 4"/><path d="m3 3 18 18"/></svg>
              No source yet
            </span>
            <figcaption class="ui-image-caption">img:not([src])</figcaption>
          </figure>
          <div style="flex: 0 0 auto; align-self: center;">
            <button class="ui-btn" data-variant="outline" type="button" id="ws-image-busy-toggle">Toggle loading</button>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Interactive — hover zooms, tab shows the ring</span>
          ${copyControls(imageInteractiveSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-5); align-items: flex-start;">
          <a class="ui-image" href="#image" data-ratio="3:2" style="flex: 1 1 220px;">
            <img src="${wsPhoto('#134e4a', '#5eead4')}" alt="Open the plate atlas">
            <span class="ui-image-badge"><span class="ui-badge" data-intent="info">Atlas</span></span>
          </a>
          <button class="ui-image" type="button" data-ratio="3:2" style="flex: 1 1 220px;">
            <img src="${wsPhoto('#4c1d95', '#a78bfa')}" alt="Expand the render">
          </button>
        </div>
      </div>
    </section>`,
  wire: wireImageStates,
};
