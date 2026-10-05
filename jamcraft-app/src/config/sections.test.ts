import { describe, it, expect } from 'vitest';
import { SECTIONS, resolveLegacyPath, resolveSectionFromHash } from './sections';

describe('SECTIONS', () => {
  it('should define unique section ids', () => {
    const ids = SECTIONS.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should give every section a non-empty label', () => {
    SECTIONS.forEach((section) => {
      expect(section.label.length).toBeGreaterThan(0);
    });
  });
});

describe('resolveLegacyPath', () => {
  it.each([
    ['/', null],
    ['/projects', 'projects'],
    ['/projects/', 'projects'],
    ['/about', 'home'],
    ['/testimonials', 'home'],
    ['/some/unknown/path', 'home'],
  ] as const)('maps %s to %s', (pathname, expected) => {
    expect(resolveLegacyPath(pathname)).toBe(expected);
  });

  it('should only return known section ids or null', () => {
    const ids: string[] = SECTIONS.map((section) => section.id);
    ['/', '/projects', '/about', '/testimonials', '/nope'].forEach((path) => {
      const result = resolveLegacyPath(path);
      if (result !== null) {
        expect(ids).toContain(result);
      }
    });
  });
});

describe('resolveSectionFromHash', () => {
  it.each([
    ['#projects', 'projects'],
    ['#contact', 'contact'],
    ['', null],
    ['#', null],
    ['#not-a-section', null],
    ['#<img src=x onerror=alert(1)>', null],
  ] as const)('maps %s to %s', (hash, expected) => {
    expect(resolveSectionFromHash(hash)).toBe(expected);
  });

  it('should resolve every registered section id', () => {
    SECTIONS.forEach((section) => {
      expect(resolveSectionFromHash(`#${section.id}`)).toBe(section.id);
    });
  });
});
