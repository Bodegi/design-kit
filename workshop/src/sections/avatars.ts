import type { Section } from './section';
import { copyControls } from './shared';

// Stand-in portrait for the avatar demos: an inline SVG data URI (gradient
// ground + head-and-shoulders silhouette), so the workshop needs no network.
function portraitSrc(hueA: number, hueB: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">`
    + `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">`
    + `<stop offset="0" stop-color="hsl(${hueA} 62% 60%)"/>`
    + `<stop offset="1" stop-color="hsl(${hueB} 55% 34%)"/>`
    + `</linearGradient></defs>`
    + `<rect width="80" height="80" fill="url(#g)"/>`
    + `<circle cx="40" cy="31" r="14" fill="rgba(255,255,255,0.88)"/>`
    + `<path d="M11 80c0-16.5 13-27 29-27s29 10.5 29 27z" fill="rgba(255,255,255,0.88)"/>`
    + `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// One .ui-avatar showing a portrait, for the size / group / status demos.
function photoAvatar(name: string, hueA: number, hueB: number, attrs = ''): string {
  return `<span class="ui-avatar"${attrs}>`
    + `<img class="ui-avatar-image" src="${portraitSrc(hueA, hueB)}" alt="${name}" />`
    + `</span>`;
}

const avatarUserIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"></path></svg>`;

const avatarSnippet = `<!-- photo -->
<span class="ui-avatar" data-size="md">
  <img class="ui-avatar-image" src="/avatars/ada.jpg" alt="Ada Lovelace" />
</span>

<!-- initials fallback -->
<span class="ui-avatar" data-size="md" role="img" aria-label="Ada Lovelace">
  <span class="ui-avatar-fallback">AL</span>
</span>

<!-- icon fallback -->
<span class="ui-avatar" data-size="md" role="img" aria-label="Unassigned">
  <span class="ui-avatar-icon"><svg>…</svg></span>
</span>`;

const avatarStatusSnippet = `<span class="ui-avatar" data-size="lg">
  <img class="ui-avatar-image" src="/avatars/ada.jpg" alt="Ada Lovelace" />
  <span class="ui-avatar-status" data-intent="success" role="img" aria-label="Online"></span>
</span>

<!-- square: --radius-control instead of --radius-full -->
<span class="ui-avatar" data-size="lg" data-shape="square">…</span>`;

const avatarGroupSnippet = `<div class="ui-avatar-group">
  <span class="ui-avatar" data-size="sm">…</span>
  <span class="ui-avatar" data-size="sm">…</span>
  <span class="ui-avatar" data-size="sm">…</span>
  <span class="ui-avatar ui-avatar-more" data-size="sm">+3</span>
</div>

<!-- on the canvas rather than a panel, retint the separation ring -->
<div class="ui-avatar-group" style="--ui-avatar-ring-color: var(--color-bg-canvas)">…</div>`;

const avatarInteractiveSnippet = `<button type="button" class="ui-avatar" data-size="md" aria-label="Account menu">
  <img class="ui-avatar-image" src="/avatars/ada.jpg" alt="" />
</button>

<a class="ui-avatar" data-size="md" data-intent="primary" href="/people/ada" aria-label="Ada Lovelace">
  <span class="ui-avatar-fallback">AL</span>
</a>`;

export const avatarsSection: Section = {
  id: 'avatars',
  title: 'Avatars (.ui-avatar)',
  html: `    <!-- Avatars Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Avatars (.ui-avatar)</h2>
      <p class="ws-section-desc">The portrait of a person or entity: an <code>img.ui-avatar-image</code> when there is a photo, a <code>.ui-avatar-fallback</code> of initials or a <code>.ui-avatar-icon</code> when there is not, plus an optional <code>.ui-avatar-status</code> dot. Round by default, <code>data-shape="square"</code> for <code>--radius-control</code>. Nothing clips — the image rounds itself with <code>border-radius: inherit</code>, so a <code>&lt;button&gt;</code> or <code>&lt;a&gt;</code> avatar keeps a whole focus ring. Initials are always <code>--color-text-main</code> over an elevated or lightly tinted ground, so they clear AA in every theme.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Sizes (xs / sm / md / lg / xl)</span>
          ${copyControls('<span class="ui-avatar" data-size="lg">\n  <img class="ui-avatar-image" src="/avatars/ada.jpg" alt="Ada Lovelace" />\n</span>')}
        </div>
        <div class="ws-preview-canvas" style="align-items: flex-end; gap: var(--space-4);">
          ${photoAvatar('Ada Lovelace', 205, 255, ' data-size="xs"')}
          ${photoAvatar('Ada Lovelace', 205, 255, ' data-size="sm"')}
          ${photoAvatar('Ada Lovelace', 205, 255, ' data-size="md"')}
          ${photoAvatar('Ada Lovelace', 205, 255, ' data-size="lg"')}
          ${photoAvatar('Ada Lovelace', 205, 255, ' data-size="xl"')}
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Photo, Initials &amp; Icon</span>
          ${copyControls(avatarSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-4);">
          ${photoAvatar('Grace Hopper', 145, 190, ' data-size="lg"')}
          <span class="ui-avatar" data-size="lg" role="img" aria-label="Ada Lovelace"><span class="ui-avatar-fallback">AL</span></span>
          <span class="ui-avatar" data-size="lg" data-intent="primary" role="img" aria-label="Grace Hopper"><span class="ui-avatar-fallback">GH</span></span>
          <span class="ui-avatar" data-size="lg" data-intent="accent" role="img" aria-label="Katherine Johnson"><span class="ui-avatar-fallback">KJ</span></span>
          <span class="ui-avatar" data-size="lg" role="img" aria-label="Unassigned"><span class="ui-avatar-icon">${avatarUserIcon}</span></span>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Intent Grounds</span>
          ${copyControls('<span class="ui-avatar" data-intent="success" role="img" aria-label="Grace Hopper">\n  <span class="ui-avatar-fallback">GH</span>\n</span>')}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-3);">
          <span class="ui-avatar" role="img" aria-label="Neutral"><span class="ui-avatar-fallback">NE</span></span>
          <span class="ui-avatar" data-intent="primary" role="img" aria-label="Primary"><span class="ui-avatar-fallback">PR</span></span>
          <span class="ui-avatar" data-intent="accent" role="img" aria-label="Accent"><span class="ui-avatar-fallback">AC</span></span>
          <span class="ui-avatar" data-intent="success" role="img" aria-label="Success"><span class="ui-avatar-fallback">SU</span></span>
          <span class="ui-avatar" data-intent="warning" role="img" aria-label="Warning"><span class="ui-avatar-fallback">WA</span></span>
          <span class="ui-avatar" data-intent="danger" role="img" aria-label="Danger"><span class="ui-avatar-fallback">DA</span></span>
          <span class="ui-avatar" data-intent="info" role="img" aria-label="Info"><span class="ui-avatar-fallback">IN</span></span>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Status Dot &amp; Square Shape</span>
          ${copyControls(avatarStatusSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-4);">
          <span class="ui-avatar" data-size="lg">
            <img class="ui-avatar-image" src="${portraitSrc(205, 255)}" alt="Ada Lovelace" />
            <span class="ui-avatar-status" data-intent="success" role="img" aria-label="Online"></span>
          </span>
          <span class="ui-avatar" data-size="lg">
            <img class="ui-avatar-image" src="${portraitSrc(145, 190)}" alt="Grace Hopper" />
            <span class="ui-avatar-status" data-intent="warning" role="img" aria-label="Away"></span>
          </span>
          <span class="ui-avatar" data-size="lg">
            <img class="ui-avatar-image" src="${portraitSrc(20, 340)}" alt="Katherine Johnson" />
            <span class="ui-avatar-status" data-intent="danger" role="img" aria-label="Do not disturb"></span>
          </span>
          <span class="ui-avatar" data-size="lg" role="img" aria-label="Alan Turing, offline">
            <span class="ui-avatar-fallback">AT</span>
            <span class="ui-avatar-status"></span>
          </span>
          <span class="ui-avatar" data-size="lg" data-shape="square">
            <img class="ui-avatar-image" src="${portraitSrc(265, 205)}" alt="Radia Perlman" />
            <span class="ui-avatar-status" data-intent="success" role="img" aria-label="Online"></span>
          </span>
          <span class="ui-avatar" data-size="lg" data-shape="square" data-intent="info" role="img" aria-label="Build agent"><span class="ui-avatar-icon">${avatarUserIcon}</span></span>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Group with Overflow</span>
          ${copyControls(avatarGroupSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-6);">
          <div class="ui-avatar-group">
            ${photoAvatar('Ada Lovelace', 205, 255, ' data-size="sm"')}
            ${photoAvatar('Grace Hopper', 145, 190, ' data-size="sm"')}
            ${photoAvatar('Katherine Johnson', 20, 340, ' data-size="sm"')}
            <span class="ui-avatar ui-avatar-more" data-size="sm" role="img" aria-label="3 more people">+3</span>
          </div>
          <div class="ui-avatar-group">
            ${photoAvatar('Ada Lovelace', 205, 255, ' data-size="lg"')}
            <span class="ui-avatar" data-size="lg" data-intent="primary" role="img" aria-label="Grace Hopper"><span class="ui-avatar-fallback">GH</span></span>
            ${photoAvatar('Katherine Johnson', 20, 340, ' data-size="lg"')}
            <span class="ui-avatar ui-avatar-more" data-size="lg" role="img" aria-label="12 more people">+12</span>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Interactive (hover ring, focus ring — tab to it)</span>
          ${copyControls(avatarInteractiveSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-4);">
          <button type="button" class="ui-avatar" data-size="md" aria-label="Account menu">
            <img class="ui-avatar-image" src="${portraitSrc(205, 255)}" alt="" />
          </button>
          <a class="ui-avatar" data-size="md" data-intent="primary" href="#avatars" aria-label="Grace Hopper"><span class="ui-avatar-fallback">GH</span></a>
          <button type="button" class="ui-avatar" data-size="md" data-shape="square" aria-label="Add a collaborator"><span class="ui-avatar-icon">${avatarUserIcon}</span></button>
          <button type="button" class="ui-avatar" data-size="md" aria-label="Unavailable" disabled><span class="ui-avatar-fallback">AT</span></button>
          <div class="ui-avatar-group">
            <button type="button" class="ui-avatar" data-size="md" aria-label="Ada Lovelace">
              <img class="ui-avatar-image" src="${portraitSrc(205, 255)}" alt="" />
            </button>
            <button type="button" class="ui-avatar" data-size="md" aria-label="Grace Hopper">
              <img class="ui-avatar-image" src="${portraitSrc(145, 190)}" alt="" />
            </button>
            <button type="button" class="ui-avatar" data-size="md" aria-label="Katherine Johnson">
              <img class="ui-avatar-image" src="${portraitSrc(20, 340)}" alt="" />
            </button>
          </div>
        </div>
      </div>
    </section>`,
};
