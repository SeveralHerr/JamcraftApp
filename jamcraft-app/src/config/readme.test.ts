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
});
