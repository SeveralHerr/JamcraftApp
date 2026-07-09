import { Stack, Center } from '@mantine/core';
import { Section } from '../components/ui/Section';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { usePodcastEpisodes } from './ui/hooks/usePodcastEpisodes';
import { PodcastEpisodeCard } from './ui/components/PodcastEpisodeCard';

export function PodcastsSection() {
  const { episodes, loading } = usePodcastEpisodes();

  return (
    <Section
      id="podcasts"
      title="Podcasts"
      subtitle="Episodes I've been featured on, talking software teaming, AI, and game development"
    >
      {loading ? (
        <Center py="xl">
          <LoadingSpinner />
        </Center>
      ) : (
        <Stack gap="lg">
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
        </Stack>
      )}
    </Section>
  );
}
