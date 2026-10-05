import { describe, it, expect } from 'vitest';
import { formatJamLabel } from './formatJamLabel';

describe('formatJamLabel', () => {
  it('should append the year when the jam name lacks it', () => {
    expect(formatJamLabel({ jamName: 'Juice Jam II', jamYear: 2023 })).toBe('Juice Jam II · 2023');
  });

  it('should not repeat a year already in the jam name', () => {
    expect(formatJamLabel({ jamName: 'Game Off 2022', jamYear: 2022 })).toBe('Game Off 2022');
  });

  it('should return the bare name when no year is known', () => {
    expect(formatJamLabel({ jamName: 'Some Jam' })).toBe('Some Jam');
  });
});
