/**
 * Color System
 * Single source of truth for all colors in the application.
 * Mathematical precision - one color, one purpose.
 */

export const colors = {
  // Brand Colors
  brand: {
    primary: '#8aa9c7',
    primaryHover: '#9db9d4',
    primaryPressed: '#7291ad',
    primarySubtle: 'rgba(138, 169, 199, 0.12)',
    primaryBorder: 'rgba(138, 169, 199, 0.2)',
    primaryGlow: 'rgba(138, 169, 199, 0.4)',
  },

  // Background Colors
  background: {
    primary: '#0a0d10',
    secondary: '#12161b',
    tertiary: '#1a2027',
    card: 'rgba(18, 22, 27, 0.6)',
    cardHover: 'rgba(18, 22, 27, 0.8)',
    overlay: 'rgba(0, 0, 0, 0.7)',
    glass: 'rgba(18, 22, 27, 0.65)',
    header: 'rgba(10, 13, 16, 0.8)',
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
    hover: 'rgba(138, 169, 199, 0.4)',
    focus: '#8aa9c7',
    divider: '#1a2027',
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
    reveal: '#8aa9c7',
  },
} as const;

export type Colors = typeof colors;
