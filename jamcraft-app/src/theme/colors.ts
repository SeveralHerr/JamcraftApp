/**
 * Color System
 * Single source of truth for all colors in the application.
 * Mathematical precision - one color, one purpose.
 */

export const colors = {
  // Brand Colors
  brand: {
    primary: '#f6924b',
    primaryHover: '#ff8c42',
    primaryPressed: '#e67d3a',
    primarySubtle: 'rgba(246, 146, 75, 0.12)',
    primaryBorder: 'rgba(246, 146, 75, 0.2)',
    primaryGlow: 'rgba(246, 146, 75, 0.4)',
  },

  // Background Colors
  background: {
    primary: '#081b29',
    secondary: '#1a2733',
    tertiary: '#2a3744',
    card: 'rgba(26, 27, 30, 0.6)',
    cardHover: 'rgba(26, 27, 30, 0.8)',
    overlay: 'rgba(0, 0, 0, 0.7)',
    glass: 'rgba(26, 27, 30, 0.6)',
  },

  // Text Colors
  text: {
    primary: '#ededed',
    secondary: 'rgba(237, 237, 237, 0.9)',
    tertiary: 'rgba(237, 237, 237, 0.8)',
    dimmed: 'rgba(237, 237, 237, 0.7)',
    subtle: 'rgba(237, 237, 237, 0.6)',
    muted: 'rgba(237, 237, 237, 0.5)',
  },

  // Border Colors
  border: {
    primary: 'rgba(255, 255, 255, 0.08)',
    secondary: 'rgba(255, 255, 255, 0.1)',
    hover: 'rgba(246, 146, 75, 0.4)',
    focus: '#f6924b',
    divider: '#1a2733',
  },

  // State Colors
  state: {
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
    info: '#3b82f6',
  },

  // Platform Badge Colors
  platform: {
    github: '#6e5494',
    steam: '#1b2838',
    itch: '#fa5c5c',
  },

  // Special
  nsfw: {
    overlay: 'rgba(0, 0, 0, 0.85)',
    warning: '#ef4444',
    reveal: '#f6924b',
  },
} as const;

export type Colors = typeof colors;
