import { Badge } from '@mantine/core';
import { IconHeadphones, IconPlayerPlay } from '@tabler/icons-react';
import { PodcastEpisode } from '../../entities/PodcastEpisode';
import { episodeMediaLabel } from '../../use-cases/episodeMediaLabel';
import { CompactCard } from '../../../components/ui/CompactCard';

interface PodcastEpisodeCardProps {
  episode: PodcastEpisode;
}

export function PodcastEpisodeCard({ episode }: PodcastEpisodeCardProps) {
  const line = episode.publishedYear
    ? `${episode.showName} · ${episode.publishedYear}`
    : episode.showName;

  const media = episodeMediaLabel(episode.episodeUrl);
  const MediaIcon = media === 'Watch' ? IconPlayerPlay : IconHeadphones;

  return (
    <CompactCard
      title={episode.episodeTitle}
      line={line}
      imageUrl={episode.artworkUrl}
      imageAlt={`${episode.showName} episode artwork`}
      meta={
        <Badge
          color="gray"
          variant="light"
          size="xs"
          w="fit-content"
          leftSection={<MediaIcon size={10} aria-hidden="true" />}
        >
          {media}
        </Badge>
      }
      href={episode.episodeUrl}
      ariaLabel={episode.episodeTitle}
      variant="glass"
    />
  );
}
