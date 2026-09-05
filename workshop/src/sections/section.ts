/** One component section of the workshop's Components tab. */
export type Section = {
  /** The section's markup, concatenated with the other sections in display order. */
  html: string;
  /** Demo behavior for the section, run against the rendered container. */
  wire?: (root: HTMLElement) => void;
};
