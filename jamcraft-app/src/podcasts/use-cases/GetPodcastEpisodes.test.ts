import { describe, it, expect } from 'vitest';
import { GetPodcastEpisodes } from './GetPodcastEpisodes';
import { PodcastEpisode } from '../entities/PodcastEpisode';
import { PODCAST_EPISODES_DATA } from '../data/podcast-episodes-data';

describe('GetPodcastEpisodes', () => {
  const mockEpisodes: PodcastEpisode[] = [
    {
      id: 'episode-1',
      showName: 'Test Show',
      episodeTitle: 'Older Episode',
      description: 'First episode',
      artworkUrl: '/assets/test.jpg',
      episodeUrl: 'https://example.com/episode-1',
      publishedYear: 2024,
    },
    {
      id: 'episode-2',
      showName: 'Test Show',
      episodeTitle: 'Newer Episode',
      description: 'Second episode',
      artworkUrl: '/assets/test.jpg',
      episodeUrl: 'https://example.com/episode-2',
      publishedYear: 2026,
    },
    {
      id: 'episode-3',
      showName: 'Test Show',
      episodeTitle: 'Undated Episode',
      description: 'Third episode',
      artworkUrl: '/assets/test.jpg',
      episodeUrl: 'https://example.com/episode-3',
    },
  ];

  it('should return all podcast episodes', () => {
    const useCase = new GetPodcastEpisodes(mockEpisodes);
    const result = useCase.execute();

    expect(result).toEqual(mockEpisodes);
    expect(result).toHaveLength(3);
  });

  it('should sort episodes by year descending with undated episodes last', () => {
    const useCase = new GetPodcastEpisodes(mockEpisodes);
    const result = useCase.executeSortedByYear();

    expect(result[0].publishedYear).toBe(2026);
    expect(result[1].publishedYear).toBe(2024);
    expect(result[2].publishedYear).toBeUndefined();
  });

  it('should handle empty episodes array', () => {
    const useCase = new GetPodcastEpisodes([]);
    expect(useCase.execute()).toEqual([]);
  });

  describe('seed data integrity', () => {
    it('should provide at least one real episode', () => {
      expect(PODCAST_EPISODES_DATA.length).toBeGreaterThan(0);
    });

    it('should have unique ids', () => {
      const ids = PODCAST_EPISODES_DATA.map((episode) => episode.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('should have all required fields populated', () => {
      PODCAST_EPISODES_DATA.forEach((episode) => {
        expect(episode.id.length).toBeGreaterThan(0);
        expect(episode.showName.length).toBeGreaterThan(0);
        expect(episode.episodeTitle.length).toBeGreaterThan(0);
        expect(episode.description.length).toBeGreaterThan(0);
        expect(episode.artworkUrl.length).toBeGreaterThan(0);
      });
    });

    it('should only link out via http(s) URLs', () => {
      PODCAST_EPISODES_DATA.forEach((episode) => {
        expect(episode.episodeUrl).toMatch(/^https?:\/\//);
      });
    });
  });
});
