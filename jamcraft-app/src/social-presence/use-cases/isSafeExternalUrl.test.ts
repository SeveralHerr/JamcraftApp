import { describe, it, expect } from 'vitest';
import { isSafeExternalUrl } from './isSafeExternalUrl';

describe('isSafeExternalUrl', () => {
  it.each([
    'https://example.com',
    'https://example.com/path',
    'https://example.com?query=param',
    'https://subdomain.example.com',
  ])('should allow https URL %s', (url) => {
    expect(isSafeExternalUrl(url)).toBe(true);
  });

  it.each([
    '',
    ' ',
    'not a url',
    '/assets/local.png',
    'javascript:alert(1)',
    'http://example.com',
    'data:text/html,<script>alert(1)</script>',
    'file:///etc/passwd',
    'vbscript:msgbox(1)',
  ])('should reject %j', (url) => {
    expect(isSafeExternalUrl(url)).toBe(false);
  });
});
