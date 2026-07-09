import { createTheme, type MantineColorsTuple } from '@mantine/core';
import { typography } from './typography';

/**
 * Mantine theme wired to the Jamcraft design tokens.
 * The brand tuple is a 10-shade ramp centered on the brand orange (#f6924b),
 * so Mantine components (buttons, links, badges) pick up the brand color
 * without per-component inline styles.
 */
const brand: MantineColorsTuple = [
  '#fff1e5',
  '#ffe1cc',
  '#ffc29b',
  '#fca367',
  '#f98a3c',
  '#f6924b', // primary brand shade
  '#e67d3a',
  '#cc6a2d',
  '#b25a22',
  '#994a18',
];

export const mantineTheme = createTheme({
  fontFamily: typography.fontFamily.base,
  headings: {
    fontFamily: typography.fontFamily.base,
    fontWeight: String(typography.fontWeight.bold),
  },
  colors: { brand },
  primaryColor: 'brand',
  primaryShade: 5,
  defaultRadius: 'lg',
});
