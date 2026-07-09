import { PodcastEpisode } from '../entities/PodcastEpisode';

export class GetPodcastEpisodes {
  constructor(private podcastEpisodesData: PodcastEpisode[]) {}

  execute(): PodcastEpisode[] {
    return this.podcastEpisodesData;
  }

  executeSortedByYear(): PodcastEpisode[] {
    return [...this.podcastEpisodesData].sort((a, b) => {
      if (a.publishedYear === undefined) return 1;
      if (b.publishedYear === undefined) return -1;
      return b.publishedYear - a.publishedYear;
    });
  }
}
