/**
 * Shadow System
 * Elevation system for depth and hierarchy
 */

export const shadows = {
  // Card shadows
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  base: '0 4px 6px rgba(0, 0, 0, 0.1)',
  md: '0 8px 16px rgba(0, 0, 0, 0.15)',
  lg: '0 12px 24px rgba(0, 0, 0, 0.2)',
  xl: '0 20px 40px rgba(0, 0, 0, 0.25)',

  // Hover states
  cardHover: '0 12px 40px rgba(0, 0, 0, 0.15)',
  buttonHover: '0 4px 12px rgba(246, 146, 75, 0.3)',

  // Inner shadows
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',

  // Glow effects
  glowSm: '0 0 10px rgba(246, 146, 75, 0.3)',
  glowMd: '0 0 20px rgba(246, 146, 75, 0.4)',
  glowLg: '0 0 30px rgba(246, 146, 75, 0.5)',
} as const;

export type Shadows = typeof shadows;
