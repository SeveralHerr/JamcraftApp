import { SimpleGrid, Center } from '@mantine/core';
import { Section } from '../components/ui/Section';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useSpeakingEngagements } from './ui/hooks/useSpeakingEngagements';
import { SpeakingEngagementCard } from './ui/components/SpeakingEngagementCard';

export function SpeakingSection() {
  const { engagements, loading } = useSpeakingEngagements();

  return (
    <Section
      id="speaking"
      title="Speaking"
      subtitle="Conference talks and panel appearances on AI, software teaming, and collaborative development"
    >
      {loading ? (
        <Center py="xl">
          <LoadingSpinner />
        </Center>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" verticalSpacing="md">
          {engagements.map((engagement, index) => (
            <div
              key={engagement.id}
              style={{
                animation: `fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${0.1 + index * 0.1}s both`,
              }}
            >
              <SpeakingEngagementCard engagement={engagement} />
            </div>
          ))}
        </SimpleGrid>
      )}
    </Section>
  );
}
