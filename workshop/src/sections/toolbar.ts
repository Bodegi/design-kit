import type { Section } from './section';
import { copyControls } from './shared';

const toolbarSnippet = `<div class="ui-toolbar">
  <div class="ui-btn-group">
    <button class="ui-btn" data-size="sm" data-variant="ghost">Bold</button>
    <button class="ui-btn" data-size="sm" data-variant="ghost">Italic</button>
    <button class="ui-btn" data-size="sm" data-variant="ghost">Underline</button>
  </div>
  <span class="ui-toolbar-separator"></span>
  <button class="ui-btn" data-size="sm" data-variant="ghost">Link</button>
  <button class="ui-btn" data-size="sm" data-variant="ghost">Image</button>
  <span class="ui-toolbar-spacer"></span>
  <button class="ui-btn" data-size="sm" data-variant="outline">Preview</button>
  <button class="ui-btn" data-size="sm" data-intent="primary">Publish</button>
</div>`;

export const toolbarSection: Section = {
  id: 'toolbar',
  title: 'Toolbar (.ui-toolbar)',
  html: `    <!-- Toolbar Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Toolbar (.ui-toolbar)</h2>
      <p class="ws-section-desc">Flex alignment container grouping controls, with separators and a spacer to push actions apart.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Editor Toolbar</span>
          ${copyControls(toolbarSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-toolbar">
            <div class="ui-btn-group">
              <button class="ui-btn" data-size="sm" data-variant="ghost">Bold</button>
              <button class="ui-btn" data-size="sm" data-variant="ghost">Italic</button>
              <button class="ui-btn" data-size="sm" data-variant="ghost">Underline</button>
            </div>
            <span class="ui-toolbar-separator"></span>
            <button class="ui-btn" data-size="sm" data-variant="ghost">Link</button>
            <button class="ui-btn" data-size="sm" data-variant="ghost">Image</button>
            <span class="ui-toolbar-spacer"></span>
            <button class="ui-btn" data-size="sm" data-variant="outline">Preview</button>
            <button class="ui-btn" data-size="sm" data-intent="primary">Publish</button>
          </div>
        </div>
      </div>
    </section>`,
};
