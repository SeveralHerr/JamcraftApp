/** Security: only https links leave the site (blocks javascript:, data:, file: and plaintext http:). */
export function isSafeExternalUrl(url: string): boolean {
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
}
