import { useState } from 'react';
import { GetPodcastEpisodes } from '../../use-cases/GetPodcastEpisodes';
import { PODCAST_EPISODES_DATA } from '../../data/podcast-episodes-data';

/** Static data, so it is computed once on the first render — no loading state. */
export function usePodcastEpisodes() {
  const [episodes] = useState(() => new GetPodcastEpisodes(PODCAST_EPISODES_DATA).executeSortedByYear());

  return { episodes };
}
