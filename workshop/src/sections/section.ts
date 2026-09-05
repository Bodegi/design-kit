/** One component section of the workshop's Components tab. */
export type Section = {
  /** Stable slug for the section; matches its module filename. */
  id: string;
  /** Heading text, as rendered in the section's <h2>. */
  title: string;
  /** The section's markup, concatenated with the other sections in display order. */
  html: string;
  /** Demo behavior for the section, run against the rendered container. */
  wire?: (root: HTMLElement) => void;
};
