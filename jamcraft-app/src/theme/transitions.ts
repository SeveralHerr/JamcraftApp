/**
 * Transition System
 * Unified timing and easing for all animations
 */

export const transitions = {
  // Duration (milliseconds)
  duration: {
    instant: 100,
    fast: 200,
    base: 300,
    slow: 500,
    slower: 700,
  },

  // Easing functions
  easing: {
    // Standard easings
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

    // Custom easings
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  // Pre-configured transitions
  default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  fast: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',

  // Specific property transitions
  transform: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  opacity: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  color: 'color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  background: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  border: 'border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  shadow: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export type Transitions = typeof transitions;
