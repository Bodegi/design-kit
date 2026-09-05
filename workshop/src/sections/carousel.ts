import type { Section } from './section';
import { copyControls, svg } from './shared';

type CarouselCard = { title: string; meta: string; token: string };

const carouselCards: CarouselCard[] = [
  { title: 'Bronze Age', meta: '24 entries', token: 'var(--color-primary)' },
  { title: 'Cartography', meta: '11 entries', token: 'var(--color-accent)' },
  { title: 'Field Notes', meta: '38 entries', token: 'var(--color-success)' },
  { title: 'Marginalia', meta: '7 entries', token: 'var(--color-warning)' },
  { title: 'Reference', meta: '52 entries', token: 'var(--color-info)' },
];

const carouselSlides = [
  { label: 'Slide 1', tone: 'a' },
  { label: 'Slide 2', tone: 'b' },
  { label: 'Slide 3', tone: 'a' },
  { label: 'Slide 4', tone: 'b' },
];

const carouselChevron = (direction: 'left' | 'right') =>
  svg(direction === 'left' ? '<path d="m15 18-6-6 6-6"/>' : '<path d="m9 18 6-6-6-6"/>');

const carouselPeekSnippet = `<div class="ui-carousel" data-variant="peek">
  <div class="ui-carousel-track" role="group" aria-label="Featured collections">
    <div class="ui-carousel-item"><div class="ui-panel">&#8230;</div></div>
    <div class="ui-carousel-item"><div class="ui-panel">&#8230;</div></div>
  </div>
</div>`;

const carouselFullSnippet = `<div class="ui-carousel" data-variant="full" data-controls="app">
  <div class="ui-carousel-track" role="group" aria-label="Release screenshots">
    <div class="ui-carousel-item" id="slide-0"><img src="/1.jpg" alt="&#8230;"></div>
    <div class="ui-carousel-item" id="slide-1"><img src="/2.jpg" alt="&#8230;"></div>
  </div>

  <!-- data-controls="app" suppresses the generated controls where they exist,
       so these are the only ones in every engine -->
  <button class="ui-btn ui-carousel-prev" data-variant="ghost" data-size="icon"
          type="button" aria-label="Previous slide">&#8230;</button>
  <button class="ui-btn ui-carousel-next" data-variant="ghost" data-size="icon"
          type="button" aria-label="Next slide">&#8230;</button>
  <div class="ui-carousel-markers" role="group" aria-label="Choose slide">
    <button class="ui-carousel-marker" type="button" aria-current="true" aria-label="Go to slide 1"></button>
    <button class="ui-carousel-marker" type="button" aria-current="false" aria-label="Go to slide 2"></button>
  </div>
</div>

<!-- app wiring: click a control -> el.scrollIntoView({ inline: 'center', block: 'nearest' }),
     and an IntersectionObserver on the track moves aria-current as you scroll -->`;

const carouselNativeSnippet = `<!-- Chromium 135+: the arrows and dots come from the track itself -->
<div class="ui-carousel" data-variant="peek">
  <div class="ui-carousel-track" role="group" aria-label="Gallery">
    <div class="ui-carousel-item"><img src="/1.jpg" alt="&#8230;"></div>
    <div class="ui-carousel-item"><img src="/2.jpg" alt="&#8230;"></div>
  </div>
</div>`;

const carouselSizesSnippet = `<div class="ui-carousel" data-size="sm">&#8230;</div>
<div class="ui-carousel">&#8230;</div>
<div class="ui-carousel" data-size="lg">&#8230;</div>

<div class="ui-carousel" data-orientation="vertical" style="--ui-carousel-viewport: 220px">
  <div class="ui-carousel-track">&#8230;</div>
</div>`;

// Drives the class-based carousel controls: a click jumps the scroller to a
// slide, and an IntersectionObserver over the track moves aria-current as the
// scroll position changes (whether the move came from a button, a dot, a drag
// or the keyboard). The kit ships no runtime; on Chromium 135+ the browser's
// own ::scroll-button()/::scroll-marker replace all of this.
function wireCarousels(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('.ui-carousel').forEach((carousel) => {
    const track = carousel.querySelector<HTMLElement>('.ui-carousel-track');
    const markers = Array.from(carousel.querySelectorAll<HTMLButtonElement>('.ui-carousel-marker'));
    const prev = carousel.querySelector<HTMLButtonElement>('.ui-carousel-prev');
    const next = carousel.querySelector<HTMLButtonElement>('.ui-carousel-next');
    if (!track) return;

    const items = Array.from(track.querySelectorAll<HTMLElement>('.ui-carousel-item'));
    if (!items.length) return;

    const show = (index: number) => {
      const item = items[Math.max(0, Math.min(index, items.length - 1))];
      item?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    };

    let current = 0;
    const setCurrent = (index: number) => {
      current = index;
      markers.forEach((marker, i) => marker.setAttribute('aria-current', i === index ? 'true' : 'false'));
      prev?.toggleAttribute('disabled', index === 0);
      next?.toggleAttribute('disabled', index === items.length - 1);
    };

    markers.forEach((marker, i) => marker.addEventListener('click', () => show(i)));
    prev?.addEventListener('click', () => show(current - 1));
    next?.addEventListener('click', () => show(current + 1));

    if (markers.length || prev || next) {
      setCurrent(0);
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (!visible) return;
          const index = items.indexOf(visible.target as HTMLElement);
          if (index >= 0 && index !== current) setCurrent(index);
        },
        { root: track, threshold: [0.5, 0.75, 1] },
      );
      items.forEach((item) => observer.observe(item));
    }
  });
}

export const carouselSection: Section = {
  html: `    <!-- Carousel Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Carousel (.ui-carousel)</h2>
      <p class="ws-section-desc">A <code>.ui-carousel-track</code> scroller of <code>.ui-carousel-item</code> slides held in place by <code>scroll-snap</code> — dragging, flicking, keyboard scrolling and momentum are the browser's, so the baseline needs no script at all. <code>data-variant</code> picks the shape of the strip (<code>peek</code> centres a wide slide with its neighbours showing, <code>full</code> gives one slide the whole width) and <code>data-size</code> sets the default strip's item width. Where Chromium 135+ supports them, an <code>@supports selector(::scroll-marker)</code> block grows the arrows and dots straight off the track — <code>::scroll-button(inline-start)</code> / <code>(inline-end)</code>, one <code>::scroll-marker</code> per item with the current one matched by <code>:target-current</code>, collected in a <code>::scroll-marker-group</code> below — so nothing is rendered for them. For engines without those pseudos the app renders <code>.ui-carousel-prev</code> / <code>-next</code> (composed with <code>.ui-btn</code>) and a <code>.ui-carousel-markers</code> row of <code>button[aria-current]</code>, and wires them; the kit ships no runtime, so the workshop does that here. <code>data-controls="app"</code> suppresses the generated pair on a supporting engine, so the two sets never both appear.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Card strip, <code>data-variant="peek"</code> — drag or flick; neighbours show at both edges</span>
          ${copyControls(carouselPeekSnippet)}
        </div>
        <div class="ws-preview-canvas" style="display: block;">
          <div class="ui-carousel" data-variant="peek">
            <div class="ui-carousel-track" role="group" aria-label="Featured collections">
              ${carouselCards.map((card, i) => `
                <div class="ui-carousel-item">
                  <div class="ui-panel">
                    <div class="ws-carousel-thumb" style="--ws-carousel-hue: ${card.token}" aria-hidden="true">${i + 1}</div>
                    <div class="ui-panel-body">
                      <strong>${card.title}</strong>
                      <p style="margin: var(--space-1) 0 0; color: var(--color-text-muted); font-size: var(--text-sm);">${card.meta}</p>
                    </div>
                  </div>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Full-width, class-based buttons &amp; dots — for engines without the scroll pseudos</span>
          ${copyControls(carouselFullSnippet)}
        </div>
        <div class="ws-preview-canvas" style="display: block;">
          <div class="ui-carousel" data-variant="full" data-controls="app" id="ws-carousel-full">
            <div class="ui-carousel-track" role="group" aria-label="Release screenshots">
              ${carouselSlides.map((slide, i) => `
                <div class="ui-carousel-item" id="ws-carousel-slide-${i}">
                  <div class="ws-carousel-photo" data-tone="${slide.tone}">${slide.label}</div>
                </div>`).join('')}
            </div>
            <button class="ui-btn ui-carousel-prev" data-variant="ghost" data-size="icon" type="button" aria-label="Previous slide">${carouselChevron('left')}</button>
            <button class="ui-btn ui-carousel-next" data-variant="ghost" data-size="icon" type="button" aria-label="Next slide">${carouselChevron('right')}</button>
            <div class="ui-carousel-markers" role="group" aria-label="Choose slide">
              ${carouselSlides.map((slide, i) => `
                <button class="ui-carousel-marker" type="button" aria-current="${i === 0 ? 'true' : 'false'}"
                        aria-label="Go to ${slide.label}" data-target="ws-carousel-slide-${i}"></button>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Native <code>::scroll-button()</code> and <code>::scroll-marker</code> — same markup, no controls rendered</span>
          ${copyControls(carouselNativeSnippet)}
        </div>
        <div class="ws-preview-canvas" style="display: block;">
          <p class="ws-section-desc" style="margin-top: 0;">Below is a track and its items and nothing else. In Chromium 135+ the arrows and the dot row you see are the browser's, drawn from the track; the arrow at an end disables itself and the dots track the scroll position without a line of app code. In Firefox, Safari and older Chromium the same markup is a plain snapping strip — swipe it, or render the class-based controls above.</p>
          <div class="ui-carousel" data-variant="peek">
            <div class="ui-carousel-track" role="group" aria-label="Native carousel">
              ${carouselSlides.map((slide) => `
                <div class="ui-carousel-item">
                  <div class="ws-carousel-photo" data-tone="${slide.tone}">${slide.label}</div>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Sizes &amp; <code>data-orientation="vertical"</code></span>
          ${copyControls(carouselSizesSnippet)}
        </div>
        <div class="ws-preview-canvas" style="display: block;">
          <div class="ui-carousel" data-size="sm" style="margin-bottom: var(--space-6);">
            <div class="ui-carousel-track" role="group" aria-label="Small strip">
              ${carouselCards.map((card, i) => `
                <div class="ui-carousel-item">
                  <div class="ws-carousel-thumb" style="--ws-carousel-hue: ${card.token}" aria-hidden="true">${i + 1}</div>
                </div>`).join('')}
            </div>
          </div>
          <div class="ui-carousel" data-orientation="vertical" style="--ui-carousel-viewport: 220px; max-width: 320px;">
            <div class="ui-carousel-track" role="group" aria-label="Vertical strip">
              ${carouselCards.map((card, i) => `
                <div class="ui-carousel-item">
                  <div class="ws-carousel-thumb" style="--ws-carousel-hue: ${card.token}" aria-hidden="true">${i + 1}</div>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>`,
  wire: wireCarousels,
};
