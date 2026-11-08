import { describe, it, expect } from 'vitest';
import { GetCommissions } from './GetCommissions';
import { Commission } from '../entities/Commission';
import { COMMISSIONS_DATA } from '../data/commissions-data';

const make = (id: string, year: number): Commission => ({
  id,
  client: 'Client',
  title: id,
  summary: 'Summary',
  year,
  role: 'Role',
  deliverables: 'Deliverables',
  heroImage: { src: '/assets/x.webp', alt: 'x', width: 4, height: 3 },
  media: [],
  links: [],
});

describe('GetCommissions', () => {
  it('returns commissions newest year first without mutating the source', () => {
    const data = [make('old', 2024), make('new', 2026), make('mid', 2025)];
    const sorted = new GetCommissions(data).executeSortedByYear();

    expect(sorted.map((c) => c.id)).toEqual(['new', 'mid', 'old']);
    expect(data.map((c) => c.id)).toEqual(['old', 'new', 'mid']);
  });

  it('seed data has the Atomic Robot commission with a self-hosted reel', () => {
    const atomic = COMMISSIONS_DATA.find((c) => c.id === 'atomic-robot-arcade');

    expect(atomic?.client).toBe('Atomic Robot Tattoo');
    expect(atomic?.media.some((m) => m.kind === 'video' && m.posterSrc)).toBe(true);
  });

  it('every seed media item has alt text and a caption', () => {
    for (const commission of COMMISSIONS_DATA) {
      expect(commission.heroImage.alt.length).toBeGreaterThan(0);
      for (const item of commission.media) {
        expect(item.alt.length).toBeGreaterThan(0);
        expect(item.caption.length).toBeGreaterThan(0);
      }
    }
  });
});
