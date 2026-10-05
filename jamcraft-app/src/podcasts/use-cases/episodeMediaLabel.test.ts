import { describe, it, expect } from 'vitest';
import { episodeMediaLabel } from './episodeMediaLabel';

describe('episodeMediaLabel', () => {
  it.each([
    'https://www.youtube.com/watch?v=abc',
    'https://youtube.com/watch?v=abc',
    'https://youtu.be/abc',
  ])('should label video links (%s) as Watch', (url) => {
    expect(episodeMediaLabel(url)).toBe('Watch');
  });

  it.each(['https://mobmentalityshow.podbean.com/e/x/', 'not a url'])(
    'should label everything else (%s) as Listen',
    (url) => {
      expect(episodeMediaLabel(url)).toBe('Listen');
    },
  );
});
