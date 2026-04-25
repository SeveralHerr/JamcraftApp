import { describe, it, expect } from 'vitest';
import { GetTalks } from './GetTalks';
import { talks } from '../data/talks-data';

describe('GetTalks', () => {
  const useCase = new GetTalks(talks);

  it('returns all talks when filter is all', () => {
    expect(useCase.execute('all')).toHaveLength(6);
  });

  it('returns all talks with no filter argument', () => {
    expect(useCase.execute()).toHaveLength(6);
  });

  it('filters to podcasts only', () => {
    const result = useCase.execute('Podcast');
    expect(result.every(t => t.kind === 'Podcast')).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('filters to talks only', () => {
    const result = useCase.execute('Talk');
    expect(result.every(t => t.kind === 'Talk')).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('countByKind returns correct totals', () => {
    const counts = useCase.countByKind();
    expect(counts.all).toBe(6);
    expect(counts.Podcast + counts.Talk).toBe(6);
  });

  it('works with empty talks array', () => {
    const empty = new GetTalks([]);
    expect(empty.execute()).toHaveLength(0);
    expect(empty.countByKind()).toEqual({ all: 0, Podcast: 0, Talk: 0 });
  });
});
