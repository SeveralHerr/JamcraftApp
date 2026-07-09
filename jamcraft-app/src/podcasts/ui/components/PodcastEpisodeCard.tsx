import { PodcastEpisode } from '../../entities/PodcastEpisode';
import { CompactCard } from '../../../components/ui/CompactCard';

interface PodcastEpisodeCardProps {
  episode: PodcastEpisode;
}

export function PodcastEpisodeCard({ episode }: PodcastEpisodeCardProps) {
  const line = episode.publishedYear
    ? `${episode.showName} · ${episode.publishedYear}`
    : episode.showName;

  return (
    <CompactCard
      title={episode.episodeTitle}
      line={line}
      imageUrl={episode.artworkUrl}
      imageAlt={`${episode.showName} episode artwork`}
      href={episode.episodeUrl}
      ariaLabel={episode.episodeTitle}
      variant="glass"
    />
  );
}
