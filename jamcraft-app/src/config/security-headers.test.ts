import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Amplify Hosting reads customHttp.yml from the repo root (monorepo format).
// (node:url, not the global URL, which happy-dom replaces.)
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const yml = readFileSync(resolve(repoRoot, 'customHttp.yml'), 'utf8');

function parseHeaders(source: string): Record<string, string> {
  const headers: Record<string, string> = {};
  const pair = /- key: '([^']+)'\s*\n\s*value: (?:'([^']*)'|"([^"]*)")/g;
  for (const match of source.matchAll(pair)) {
    headers[match[1]] = match[2] ?? match[3];
  }
  return headers;
}

function cspDirectives(csp: string): Record<string, string[]> {
  return Object.fromEntries(
    csp
      .split(';')
      .map((d) => d.trim().split(/\s+/))
      .filter((parts) => parts[0])
      .map(([name, ...values]) => [name, values]),
  );
}

const headers = parseHeaders(yml);

describe('customHttp.yml security headers', () => {
  it('targets the jamcraft-app monorepo root for every path', () => {
    expect(yml).toMatch(/appRoot: jamcraft-app/);
    expect(yml).toMatch(/pattern: '\*\*'/);
  });

  it('sets the baseline hardening headers', () => {
    expect(headers['Strict-Transport-Security']).toMatch(/max-age=\d{8,}/);
    expect(headers['X-Content-Type-Options']).toBe('nosniff');
    expect(headers['X-Frame-Options']).toBe('DENY');
    expect(headers['Referrer-Policy']).toBe('strict-origin-when-cross-origin');
  });

  it('disables sensitive browser features', () => {
    for (const feature of ['camera', 'microphone', 'geolocation', 'payment', 'usb']) {
      expect(headers['Permissions-Policy']).toContain(`${feature}=()`);
    }
  });

  it('ships a CSP that blocks third-party and inline scripts and framing', () => {
    const csp = cspDirectives(headers['Content-Security-Policy'] ?? '');

    expect(csp['default-src']).toEqual(["'self'"]);
    expect(csp['script-src']).toEqual(["'self'"]);
    expect(csp['object-src']).toEqual(["'none'"]);
    expect(csp['frame-ancestors']).toEqual(["'none'"]);
    expect(csp['base-uri']).toEqual(["'self'"]);
  });

  it('keeps the CSP compatible with Mantine inline styles and https images', () => {
    const csp = cspDirectives(headers['Content-Security-Policy'] ?? '');

    expect(csp['style-src']).toContain("'unsafe-inline'");
    expect(csp['img-src']).toEqual(expect.arrayContaining(["'self'", 'https:']));
  });
});
