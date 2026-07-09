import { SimpleGrid, Center } from '@mantine/core';
import { Section } from '../components/ui/Section';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useWorkshops } from './ui/hooks/useWorkshops';
import { WorkshopCard } from './ui/components/WorkshopCard';

export function WorkshopsSection() {
  const { workshops, loading } = useWorkshops();

  return (
    <Section
      id="workshops"
      title="Workshops"
      subtitle="Hands-on workshops I've run on AI, software teaming, and collaborative development"
    >
      {loading ? (
        <Center py="xl">
          <LoadingSpinner />
        </Center>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" verticalSpacing="md">
          {workshops.map((workshop, index) => (
            <div
              key={workshop.id}
              style={{
                animation: `fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${0.1 + index * 0.1}s both`,
              }}
            >
              <WorkshopCard workshop={workshop} />
            </div>
          ))}
        </SimpleGrid>
      )}
    </Section>
  );
}
