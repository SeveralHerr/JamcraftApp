import { SimpleGrid } from '@mantine/core';
import { Section } from '../components/ui/Section';
import { usePodcastEpisodes } from './ui/hooks/usePodcastEpisodes';
import { PodcastEpisodeCard } from './ui/components/PodcastEpisodeCard';

export function PodcastsSection() {
  const { episodes } = usePodcastEpisodes();

  return (
    <Section
      id="podcasts"
      title="Podcasts"
      subtitle="Episodes I've been featured on, talking software teaming, AI, and game development"
    >
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" verticalSpacing="md">
        {episodes.map((episode, index) => (
          <div
            key={episode.id}
            style={{
              animation: `fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${0.1 + index * 0.1}s both`,
            }}
          >
            <PodcastEpisodeCard episode={episode} />
          </div>
        ))}
      </SimpleGrid>
    </Section>
  );
}
