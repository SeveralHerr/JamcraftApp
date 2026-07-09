import { describe, it, expect } from 'vitest';
import { GetWorkshops } from './GetWorkshops';
import { Workshop } from '../entities/Workshop';
import { WORKSHOPS_DATA } from '../data/workshops-data';

describe('GetWorkshops', () => {
  const mockWorkshops: Workshop[] = [
    {
      id: 'workshop-1',
      title: 'Older Workshop',
      description: 'First workshop',
      eventUrl: 'https://example.com/workshop-1',
      date: 'May 2024',
      year: 2024,
    },
    {
      id: 'workshop-2',
      title: 'Newer Workshop',
      description: 'Second workshop',
      eventUrl: 'https://example.com/workshop-2',
      date: 'June 2026',
      year: 2026,
      collaborators: ['A Collaborator'],
      format: 'Free online workshop',
    },
  ];

  it('should return all workshops', () => {
    const useCase = new GetWorkshops(mockWorkshops);
    const result = useCase.execute();

    expect(result).toEqual(mockWorkshops);
    expect(result).toHaveLength(2);
  });

  it('should sort workshops by year descending', () => {
    const useCase = new GetWorkshops(mockWorkshops);
    const result = useCase.executeSortedByYear();

    expect(result[0].year).toBe(2026);
    expect(result[1].year).toBe(2024);
  });

  it('should handle empty workshops array', () => {
    const useCase = new GetWorkshops([]);
    expect(useCase.execute()).toEqual([]);
  });

  describe('seed data integrity', () => {
    it('should provide at least one real workshop', () => {
      expect(WORKSHOPS_DATA.length).toBeGreaterThan(0);
    });

    it('should have unique ids', () => {
      const ids = WORKSHOPS_DATA.map((workshop) => workshop.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('should have all required fields populated', () => {
      WORKSHOPS_DATA.forEach((workshop) => {
        expect(workshop.id.length).toBeGreaterThan(0);
        expect(workshop.title.length).toBeGreaterThan(0);
        expect(workshop.description.length).toBeGreaterThan(0);
        expect(workshop.date.length).toBeGreaterThan(0);
        expect(workshop.year).toBeGreaterThan(2000);
      });
    });

    it('should only link out via http(s) URLs', () => {
      WORKSHOPS_DATA.forEach((workshop) => {
        expect(workshop.eventUrl).toMatch(/^https?:\/\//);
      });
    });
  });
});
