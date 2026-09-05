import type { Section } from './section';
import { copyControls } from './shared';

const BUTTON_VARIANTS = ['solid', 'outline', 'ghost'] as const;

const BUTTON_INTENTS = ['primary', 'accent', 'success', 'warning', 'danger', 'info'] as const;

export const buttonsSection: Section = {
  id: 'buttons',
  title: 'Buttons (.ui-btn)',
  html: `    <!-- Buttons Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Buttons (.ui-btn)</h2>
      <p class="ws-section-desc">Open UI buttons with semantic variants, sizes, intents, and states. Every <code>data-intent</code> (primary / accent / success / warning / danger / info) is defined for every <code>data-variant</code> (solid / outline / ghost): the intent declares its ink once and each variant reads it, so all eighteen cells render. Solid keeps its fill through hover and answers with the glow and a 1px lift; outline and ghost hover onto the intent's tint. A press (toggle) button keys off <code>aria-pressed</code> — <code>true</code> reads as held down with an inset ring and no lift, <code>mixed</code> marks the leading edge — so a <code>.ui-btn-group</code> of them is a segmented control. Ships no runtime; the workshop moves <code>aria-pressed</code> for these demos.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Intents (Solid)</span>
          ${copyControls('<button class="ui-btn" data-intent="primary">Primary</button>')}
        </div>
        <div class="ws-preview-canvas">
          <button class="ui-btn">Default</button>
          <button class="ui-btn" data-intent="primary">Primary</button>
          <button class="ui-btn" data-intent="success">Success</button>
          <button class="ui-btn" data-intent="danger">Danger</button>
          <button class="ui-btn" disabled>Disabled</button>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Variants (Outline & Ghost)</span>
          ${copyControls('<button class="ui-btn" data-variant="outline" data-intent="primary">Outline Primary</button>')}
        </div>
        <div class="ws-preview-canvas">
          <button class="ui-btn" data-variant="outline" data-intent="primary">Outline Primary</button>
          <button class="ui-btn" data-variant="outline" data-intent="danger">Outline Danger</button>
          <button class="ui-btn" data-variant="ghost">Ghost Neutral</button>
          <button class="ui-btn" data-variant="ghost" data-intent="primary">Ghost Primary</button>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Intent × Variant Matrix (all 18 cells)</span>
          ${copyControls('<button class="ui-btn" data-variant="outline" data-intent="warning">Warning</button>')}
        </div>
        <div class="ws-preview-canvas ws-btn-matrix">
          ${BUTTON_VARIANTS.map(
            (variant) => `
            <div class="ws-btn-matrix-row">
              <span class="ws-btn-matrix-label">${variant}</span>
              ${BUTTON_INTENTS.map(
                (intent) =>
                  `<button class="ui-btn" type="button" data-variant="${variant}" data-intent="${intent}">${
                    intent.charAt(0).toUpperCase() + intent.slice(1)
                  }</button>`,
              ).join('')}
            </div>`,
          ).join('')}
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Sizes & Button Groups</span>
          ${copyControls('<div class="ui-btn-group"><button class="ui-btn">Left</button><button class="ui-btn">Right</button></div>')}
        </div>
        <div class="ws-preview-canvas">
          <button class="ui-btn" data-size="sm" data-intent="primary">Small (sm)</button>
          <button class="ui-btn" data-intent="primary">Medium (default)</button>
          <button class="ui-btn" data-size="lg" data-intent="primary">Large (lg)</button>
          <div class="ui-btn-group" role="group" aria-label="Granularity" data-ws-press="single">
            <button class="ui-btn" type="button" aria-pressed="false">Years</button>
            <button class="ui-btn" type="button" aria-pressed="true">Months</button>
            <button class="ui-btn" type="button" aria-pressed="false">Days</button>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Press Buttons (aria-pressed)</span>
          ${copyControls('<button class="ui-btn" type="button" aria-pressed="true">Mute</button>')}
        </div>
        <div class="ws-preview-canvas ws-btn-matrix">
          <div class="ws-btn-matrix-row">
            <span class="ws-btn-matrix-label">true</span>
            <button class="ui-btn" type="button" aria-pressed="true">Neutral</button>
            <button class="ui-btn" type="button" data-intent="primary" aria-pressed="true">Solid</button>
            <button class="ui-btn" type="button" data-variant="outline" data-intent="danger" aria-pressed="true">Outline</button>
            <button class="ui-btn" type="button" data-variant="ghost" data-intent="success" aria-pressed="true">Ghost</button>
            <button class="ui-btn" type="button" data-intent="primary" aria-pressed="true" disabled>Disabled</button>
          </div>
          <div class="ws-btn-matrix-row">
            <span class="ws-btn-matrix-label">false</span>
            <button class="ui-btn" type="button" aria-pressed="false">Neutral</button>
            <button class="ui-btn" type="button" data-intent="primary" aria-pressed="false">Solid</button>
            <button class="ui-btn" type="button" data-variant="outline" data-intent="danger" aria-pressed="false">Outline</button>
            <button class="ui-btn" type="button" data-variant="ghost" data-intent="success" aria-pressed="false">Ghost</button>
            <button class="ui-btn" type="button" data-intent="primary" aria-pressed="false" disabled>Disabled</button>
          </div>
          <div class="ws-btn-matrix-row">
            <span class="ws-btn-matrix-label">mixed</span>
            <button class="ui-btn" type="button" aria-pressed="mixed">Neutral</button>
            <button class="ui-btn" type="button" data-intent="primary" aria-pressed="mixed">Solid</button>
            <button class="ui-btn" type="button" data-variant="outline" data-intent="danger" aria-pressed="mixed">Outline</button>
            <button class="ui-btn" type="button" data-variant="ghost" data-intent="success" aria-pressed="mixed">Ghost</button>
            <button class="ui-btn" type="button" data-intent="primary" aria-pressed="mixed" disabled>Disabled</button>
          </div>
          <div class="ws-btn-matrix-row">
            <span class="ws-btn-matrix-label">group</span>
            <div class="ui-btn-group" role="group" aria-label="Text alignment" data-ws-press="single">
              <button class="ui-btn" type="button" data-variant="outline" data-intent="primary" aria-pressed="true">Left</button>
              <button class="ui-btn" type="button" data-variant="outline" data-intent="primary" aria-pressed="false">Center</button>
              <button class="ui-btn" type="button" data-variant="outline" data-intent="primary" aria-pressed="false">Right</button>
            </div>
          </div>
        </div>
      </div>
    </section>`,
};
