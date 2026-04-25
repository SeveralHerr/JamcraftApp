import { describe, it, expect } from 'vitest';
import { GetGames } from './GetGames';
import { games } from '../data/games-data';

describe('GetGames', () => {
  const useCase = new GetGames(games);

  it('returns all 6 games', () => {
    expect(useCase.execute()).toHaveLength(6);
  });

  it('returns games with required fields', () => {
    const result = useCase.execute();
    result.forEach(g => {
      expect(g.id).toBeDefined();
      expect(g.title).toBeDefined();
      expect(g.tag).toBeDefined();
      expect(g.year).toBeDefined();
      expect(g.blurb).toBeDefined();
      expect(g.gradient).toBeDefined();
      expect(g.url).toBeDefined();
    });
  });

  it('returns empty array for empty input', () => {
    const empty = new GetGames([]);
    expect(empty.execute()).toHaveLength(0);
  });
});
