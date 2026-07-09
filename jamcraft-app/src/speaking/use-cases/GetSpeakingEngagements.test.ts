import { describe, it, expect } from 'vitest';
import { GetSpeakingEngagements } from './GetSpeakingEngagements';
import { SpeakingEngagement } from '../entities/SpeakingEngagement';
import { SPEAKING_ENGAGEMENTS_DATA } from '../data/speaking-engagements-data';

describe('GetSpeakingEngagements', () => {
  const mockEngagements: SpeakingEngagement[] = [
    {
      id: 'engagement-1',
      title: 'Older Talk',
      description: 'First talk',
      eventName: 'Old Conf',
      location: 'Somewhere, USA',
      eventUrl: 'https://example.com/engagement-1',
      date: 'May 2024',
      year: 2024,
      format: 'Talk',
    },
    {
      id: 'engagement-2',
      title: 'Newer Talk',
      description: 'Second talk',
      eventName: 'New Conf',
      location: 'Denver, CO',
      eventUrl: 'https://example.com/engagement-2',
      date: 'September 2026',
      year: 2026,
      format: 'Hands-On Session',
      collaborators: ['A Collaborator'],
    },
  ];

  it('should return all speaking engagements', () => {
    const useCase = new GetSpeakingEngagements(mockEngagements);
    const result = useCase.execute();

    expect(result).toEqual(mockEngagements);
    expect(result).toHaveLength(2);
  });

  it('should sort engagements by year descending', () => {
    const useCase = new GetSpeakingEngagements(mockEngagements);
    const result = useCase.executeSortedByYear();

    expect(result[0].year).toBe(2026);
    expect(result[1].year).toBe(2024);
  });

  it('should handle empty engagements array', () => {
    const useCase = new GetSpeakingEngagements([]);
    expect(useCase.execute()).toEqual([]);
  });

  describe('seed data integrity', () => {
    it('should provide at least one real engagement', () => {
      expect(SPEAKING_ENGAGEMENTS_DATA.length).toBeGreaterThan(0);
    });

    it('should have unique ids', () => {
      const ids = SPEAKING_ENGAGEMENTS_DATA.map((engagement) => engagement.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('should have all required fields populated', () => {
      SPEAKING_ENGAGEMENTS_DATA.forEach((engagement) => {
        expect(engagement.id.length).toBeGreaterThan(0);
        expect(engagement.title.length).toBeGreaterThan(0);
        expect(engagement.description.length).toBeGreaterThan(0);
        expect(engagement.eventName.length).toBeGreaterThan(0);
        expect(engagement.location.length).toBeGreaterThan(0);
        expect(engagement.date.length).toBeGreaterThan(0);
        expect(engagement.format.length).toBeGreaterThan(0);
        expect(engagement.year).toBeGreaterThan(2000);
      });
    });

    it('should only link out via http(s) URLs', () => {
      SPEAKING_ENGAGEMENTS_DATA.forEach((engagement) => {
        expect(engagement.eventUrl).toMatch(/^https?:\/\//);
      });
    });
  });
});
