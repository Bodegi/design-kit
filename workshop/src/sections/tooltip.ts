import type { Section } from './section';
import { copyControls, svg } from './shared';

const copyIcon = svg('<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>');

const tooltipSnippet = `<span class="ui-tooltip" data-placement="top">
  <button class="ui-btn" data-variant="outline" aria-describedby="tt-1">Hover or focus me</button>
  <span class="ui-tooltip-content" role="tooltip" id="tt-1">Supplementary help text</span>
</span>`;

const hintTooltipSnippet = `<button class="ui-btn ui-tooltip-trigger" data-variant="outline" interestfor="tt-2">Hover or focus me</button>
<div class="ui-tooltip" popover="hint" id="tt-2" data-placement="top">Supplementary help text</div>`;

export const tooltipSection: Section = {
  id: 'tooltip',
  title: 'Tooltip (.ui-tooltip)',
  html: `    <!-- Tooltip Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Tooltip (.ui-tooltip)</h2>
      <p class="ws-section-desc">Pure-CSS supplementary label revealed on hover <em>and</em> keyboard focus. Wire the trigger to the content with <code>aria-describedby</code>. Four placements via <code>data-placement</code>. It can't be dismissed with Escape (WCAG 1.4.13) in pure CSS — when that's required, use the click-triggered toggletip on a native <code>[popover]</code> (see Popover below), which dismisses on Escape natively.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Placements — hover or tab to a button</span>
          ${copyControls(tooltipSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-8); padding-block: var(--space-12); justify-content: center;">
          <span class="ui-tooltip" data-placement="top">
            <button class="ui-btn" data-variant="outline" aria-describedby="ws-tt-top">Top</button>
            <span class="ui-tooltip-content" role="tooltip" id="ws-tt-top">Tooltip above the trigger</span>
          </span>
          <span class="ui-tooltip" data-placement="bottom">
            <button class="ui-btn" data-variant="outline" aria-describedby="ws-tt-bottom">Bottom</button>
            <span class="ui-tooltip-content" role="tooltip" id="ws-tt-bottom">Tooltip below the trigger</span>
          </span>
          <span class="ui-tooltip" data-placement="left">
            <button class="ui-btn" data-variant="outline" aria-describedby="ws-tt-left">Left</button>
            <span class="ui-tooltip-content" role="tooltip" id="ws-tt-left">Tooltip to the left</span>
          </span>
          <span class="ui-tooltip" data-placement="right">
            <button class="ui-btn" data-variant="outline" aria-describedby="ws-tt-right">Right</button>
            <span class="ui-tooltip-content" role="tooltip" id="ws-tt-right">Tooltip to the right</span>
          </span>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">On an icon-only control (with a longer hint)</span>
        </div>
        <div class="ws-preview-canvas" style="padding-block: var(--space-10); justify-content: center;">
          <span class="ui-tooltip" data-placement="top">
            <button class="ui-btn" data-variant="ghost" aria-describedby="ws-tt-icon" aria-label="Copy link">
              ${copyIcon}
            </button>
            <span class="ui-tooltip-content" role="tooltip" id="ws-tt-icon">Copies a shareable link to this workspace to your clipboard.</span>
          </span>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Hint popover — <code>interestfor</code> + <code>popover="hint"</code></span>
          ${copyControls(hintTooltipSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-8); padding-block: var(--space-12); justify-content: center;">
          <button class="ui-btn ui-tooltip-trigger" data-variant="outline" interestfor="ws-hint-top">Top</button>
          <div class="ui-tooltip" popover="hint" id="ws-hint-top" data-placement="top">Opened by interest, dismissed by Escape</div>

          <button class="ui-btn ui-tooltip-trigger" data-variant="outline" interestfor="ws-hint-bottom">Bottom</button>
          <div class="ui-tooltip" popover="hint" id="ws-hint-bottom" data-placement="bottom">Anchored below the invoker</div>

          <button class="ui-btn ui-tooltip-trigger" data-variant="outline" interestfor="ws-hint-left">Left</button>
          <div class="ui-tooltip" popover="hint" id="ws-hint-left" data-placement="left">Anchored to the left</div>

          <button class="ui-btn ui-tooltip-trigger" data-variant="outline" interestfor="ws-hint-right">Right</button>
          <div class="ui-tooltip" popover="hint" id="ws-hint-right" data-placement="right">Anchored to the right</div>
        </div>
        <p class="ws-section-desc" style="margin-top: var(--space-3);">Hover, or tab to a button, and the hint appears after <code>interest-delay-start</code> (0.35s from <code>.ui-tooltip-trigger</code>); Escape or a click outside dismisses it. Chromium and Edge only — <code>popover="hint"</code> since 133, <code>interestfor</code> since 142. Firefox and Safari render nothing here, which is why the four buttons above still carry the CSS tooltip.</p>
      </div>
    </section>`,
};
