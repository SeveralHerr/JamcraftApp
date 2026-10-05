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
  it('should describe James as a software engineer, not the old full-stack title', () => {
    expect(html).toMatch(/<title>[^<]*Software Engineer[^<]*<\/title>/);
    expect(html).not.toMatch(/Full[- ]Stack/i);
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
