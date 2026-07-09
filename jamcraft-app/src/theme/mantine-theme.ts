import { createTheme, type MantineColorsTuple } from '@mantine/core';
import { typography } from './typography';

/**
 * Mantine theme wired to the Jamcraft design tokens.
 * The brand tuple is a 10-shade ramp centered on the muted steel blue (#8aa9c7),
 * so Mantine components (buttons, links, badges) pick up the brand color
 * without per-component inline styles.
 */
const brand: MantineColorsTuple = [
  '#eef3f8',
  '#dde7f0',
  '#c2d3e3',
  '#a9bfd5',
  '#97b1cb',
  '#8aa9c7', // primary brand shade
  '#7291ad',
  '#5f7d97',
  '#4f6a82',
  '#40586d',
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
  autoContrast: true,
  defaultRadius: 'lg',
});
