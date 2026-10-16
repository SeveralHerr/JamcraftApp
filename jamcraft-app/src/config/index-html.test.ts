import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// (node:url, not the global URL, which happy-dom replaces.)
const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const html = readFileSync(resolve(appRoot, 'index.html'), 'utf8');

function metaContent(attr: 'name' | 'property', key: string): string | undefined {
  const match = html.match(new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`));
  return match?.[1];
}

describe('index.html metadata', () => {
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  const description = metaContent('name', 'description') ?? '';

  it('should lead the search result with Jamcraft LLC and its games, crediting James', () => {
    expect(title).toMatch(/^Jamcraft LLC/);
    for (const text of [title, description]) {
      expect(text).toMatch(/games/i);
      expect(text).toContain('James Herr');
    }
    expect(description).toMatch(/^Jamcraft LLC/);
    expect(html).not.toMatch(/Full[- ]Stack/i);
  });

  it('should keep the title and description short enough for Google not to truncate', () => {
    expect(title.replace(/&amp;/g, '&').length).toBeLessThanOrEqual(60);
    expect(description.length).toBeLessThanOrEqual(160);
  });

  it('should mirror the title and description in the Open Graph and Twitter cards', () => {
    expect(metaContent('property', 'og:title')).toBe(title);
    expect(metaContent('name', 'twitter:title')).toBe(title);
    expect(metaContent('property', 'og:description')).toBe(description);
    expect(metaContent('name', 'twitter:description')).toBe(description);
  });

  it.each([
    ['property', 'og:image'],
    ['name', 'twitter:image'],
  ] as const)('should give %s %s an absolute https URL to a shipped asset', (attr, key) => {
    const url = metaContent(attr, key);

    expect(url).toMatch(/^https:\/\/jamcraft\.io\/assets\//);
    const assetPath = url!.replace('https://jamcraft.io', '');
    expect(existsSync(resolve(appRoot, 'public', `.${assetPath}`))).toBe(true);
  });

  it('should load no third-party scripts (CSP is script-src self)', () => {
    const scriptSrcs = [...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map((m) => m[1]);

    scriptSrcs.forEach((src) => expect(src).toMatch(/^\//));
  });

  it('should preload the hero portrait and declare a square favicon + touch icon', () => {
    expect(html).toMatch(/<link rel="preload" as="image" href="\/assets\/james-herr-portrait\.webp"/);
    for (const [rel, file] of [['icon', 'favicon-32.png'], ['apple-touch-icon', 'apple-touch-icon.png']]) {
      expect(html).toContain(`rel="${rel}"`);
      expect(html).toContain(`/assets/${file}`);
      expect(existsSync(resolve(appRoot, 'public/assets', file))).toBe(true);
    }
  });
});
