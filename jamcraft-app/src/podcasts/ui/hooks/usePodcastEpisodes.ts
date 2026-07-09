import { useState, useEffect } from 'react';
import { PodcastEpisode } from '../../entities/PodcastEpisode';
import { GetPodcastEpisodes } from '../../use-cases/GetPodcastEpisodes';
import { PODCAST_EPISODES_DATA } from '../../data/podcast-episodes-data';

export function usePodcastEpisodes() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true);
      try {
        const useCase = new GetPodcastEpisodes(PODCAST_EPISODES_DATA);
        setEpisodes(useCase.executeSortedByYear());
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  return { episodes, loading };
}
