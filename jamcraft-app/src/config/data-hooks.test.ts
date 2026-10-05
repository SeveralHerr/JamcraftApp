import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useProfile } from '../portfolio/ui/hooks/useProfile';
import { useSocialLinks } from '../social-presence/ui/hooks/useSocialLinks';
import { usePortfolioProjects } from '../portfolio-projects/ui/hooks/usePortfolioProjects';
import { useGameJamSubmissions } from '../game-jam-submissions/ui/hooks/useGameJamSubmissions';
import { usePodcastEpisodes } from '../podcasts/ui/hooks/usePodcastEpisodes';
import { useWorkshops } from '../workshops/ui/hooks/useWorkshops';
import { useSpeakingEngagements } from '../speaking/ui/hooks/useSpeakingEngagements';

/**
 * Section data is static, so every hook must return it on the very first
 * render. A loading frame would shift the layout after mount and break
 * deep links like /#podcasts that scroll to a section on load.
 */
const DATA_HOOKS: Record<string, () => unknown> = {
  useProfile: () => useProfile().profile,
  useSocialLinks: () => useSocialLinks().socialLinks,
  usePortfolioProjects: () => usePortfolioProjects().projects,
  useGameJamSubmissions: () => useGameJamSubmissions().submissions,
  usePodcastEpisodes: () => usePodcastEpisodes().episodes,
  useWorkshops: () => useWorkshops().workshops,
  useSpeakingEngagements: () => useSpeakingEngagements().engagements,
};

describe('section data hooks', () => {
  it.each(Object.entries(DATA_HOOKS))('%s returns data on the first render', (_, selectData) => {
    const renders: unknown[] = [];
    renderHook(() => {
      const data = selectData();
      renders.push(data);
      return data;
    });

    const first = renders[0];
    expect(first).toBeTruthy();
    if (Array.isArray(first)) {
      expect(first.length).toBeGreaterThan(0);
    }
  });
});
