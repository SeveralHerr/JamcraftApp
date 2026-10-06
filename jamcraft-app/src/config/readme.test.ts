import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EXTERNAL_LINKS } from './routes';

// (node:url, not the global URL, which happy-dom replaces.)
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const readme = readFileSync(resolve(repoRoot, 'README.md'), 'utf8');

/** Local targets of markdown links/images and HTML src/href attributes. */
function localReferences(markdown: string): string[] {
  const targets = [
    ...[...markdown.matchAll(/\]\(([^)\s]+)\)/g)].map((m) => m[1]),
    ...[...markdown.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1]),
  ];
  return targets
    .filter((target) => !/^(https?:|mailto:|#)/.test(target))
    .map((target) => target.split('#')[0]);
}

describe('README.md', () => {
  it('should only reference local files that exist (no broken badges or screenshots)', () => {
    const refs = localReferences(readme);
    expect(refs.length).toBeGreaterThan(0);

    const missing = refs.filter((ref) => !existsSync(resolve(repoRoot, ref)));
    expect(missing).toEqual([]);
  });

  it('should show at least one screenshot', () => {
    expect(readme).toMatch(/docs\/screenshots\/[\w-]+\.(png|webp|jpg)/);
  });

  it('should link the same Discord invite the site uses', () => {
    expect(readme).toContain(EXTERNAL_LINKS.discord);
  });

  it('should not claim more coverage than vitest.config.ts enforces', () => {
    const claimed = Number(readme.match(/coverage-%E2%89%A5(\d+)%25/)?.[1]);
    const config = readFileSync(resolve(repoRoot, 'jamcraft-app/vitest.config.ts'), 'utf8');
    const enforced = Number(config.match(/lines:\s*(\d+)/)?.[1]);

    expect(claimed).toBeGreaterThan(0);
    expect(enforced).toBeGreaterThanOrEqual(claimed);
  });

  it('should show the live CI status badge and a license that exists', () => {
    expect(readme).toContain('actions/workflows/deploy.yml/badge.svg');
    expect(readme).toMatch(/\]\(\.\/LICENSE\)/);
  });
});

