/**
 * Single-page section registry.
 * The order here defines both the nav order and the scroll order on the page.
 */

export const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'podcasts', label: 'Podcasts' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

/**
 * Maps legacy multi-page routes to their new section anchors so old
 * bookmarks and inbound links still land somewhere sensible.
 * Returns null when no redirect is needed (already on the root path).
 */
export function resolveLegacyPath(pathname: string): SectionId | null {
  const normalized = pathname.replace(/\/+$/, '') || '/';

  switch (normalized) {
    case '/':
      return null;
    case '/projects':
      return 'projects';
    case '/about':
    case '/testimonials':
      return 'home';
    default:
      return 'home';
  }
}
