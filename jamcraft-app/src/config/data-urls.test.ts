import { describe, it, expect } from 'vitest';
import { EXTERNAL_LINKS } from './routes';
import { PROFILE_DATA } from '../portfolio/data/profile-data';
import { PORTFOLIO_PROJECTS_DATA } from '../portfolio-projects/data/portfolio-projects-data';
import { GAME_JAM_SUBMISSIONS_DATA } from '../game-jam-submissions/data/game-jam-submissions-data';
import { PODCAST_EPISODES_DATA } from '../podcasts/data/podcast-episodes-data';
import { WORKSHOPS_DATA } from '../workshops/data/workshops-data';
import { SPEAKING_ENGAGEMENTS_DATA } from '../speaking/data/speaking-engagements-data';
import { SOCIAL_LINKS_DATA } from '../social-presence/data/social-links-data';

const DATA_SOURCES = {
  EXTERNAL_LINKS,
  PROFILE_DATA,
  PORTFOLIO_PROJECTS_DATA,
  GAME_JAM_SUBMISSIONS_DATA,
  PODCAST_EPISODES_DATA,
  WORKSHOPS_DATA,
  SPEAKING_ENGAGEMENTS_DATA,
  SOCIAL_LINKS_DATA,
};

const URL_FIELD = /(url|href|src|path)$/i;
const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const SAFE_URL = /^(https:\/\/[^\s]+|\/assets\/[^\s]+)$/;

/** Walks the seed data and yields every string that is (or names) a link or image. */
function* collectUrls(value: unknown, path: string): Generator<[string, string]> {
  if (Array.isArray(value)) {
    for (const [i, item] of value.entries()) yield* collectUrls(item, `${path}[${i}]`);
  } else if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      const childPath = `${path}.${key}`;
      if (typeof item === 'string' && (URL_FIELD.test(key) || HAS_SCHEME.test(item))) {
        yield [childPath, item];
      } else {
        yield* collectUrls(item, childPath);
      }
    }
  }
}

const urls = [...collectUrls(DATA_SOURCES, 'data')];

describe('seed data URLs', () => {
  it('finds URLs in every data source (the sweep is not vacuous)', () => {
    for (const source of Object.keys(DATA_SOURCES)) {
      expect(urls.some(([path]) => path.startsWith(`data.${source}`))).toBe(true);
    }
  });

  it('only links to https or local /assets (no http:, javascript:, data:)', () => {
    const unsafe = urls.filter(([, url]) => !SAFE_URL.test(url));
    expect(unsafe).toEqual([]);
  });
});
