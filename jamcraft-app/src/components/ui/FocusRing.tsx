import { colors, transitions } from '../../theme';

/**
 * Custom focus ring component for accessible keyboard navigation
 * Appears only on keyboard focus, not mouse clicks
 */

export const focusRingStyles = {
  outline: 'none',
  position: 'relative',
} as const;

export const focusRingAfterStyles = `
  content: '';
  position: absolute;
  inset: -3px;
  border: 2px solid ${colors.border.focus};
  border-radius: 8px;
  opacity: 0;
  transition: ${transitions.fast};
  pointer-events: none;
`;

export const focusVisibleStyles = `
  &:focus-visible::after {
    ${focusRingAfterStyles}
    opacity: 1;
  }
`;

// CSS class for global use
export const focusRingClass = `
  .focus-ring {
    outline: none;
    position: relative;
  }

  .focus-ring::after {
    ${focusRingAfterStyles}
  }

  .focus-ring:focus-visible::after {
    opacity: 1;
  }
`;
