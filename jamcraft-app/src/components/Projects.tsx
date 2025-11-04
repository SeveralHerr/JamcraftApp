import { Container, Stack, Title, Text, Divider } from '@mantine/core';
import { usePortfolioProjects } from '../portfolio-projects/ui/hooks/usePortfolioProjects';
import { PortfolioProjectCard } from '../portfolio-projects/ui/components/PortfolioProjectCard';

export function Projects() {
  const { projects, loading } = usePortfolioProjects();

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <Text>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title
            order={1}
            c="#ededed"
            ta="left"
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            Projects
          </Title>
          <Text c="gray.5" ta="left" mt="xs">
            A collection of games and applications I've built
          </Text>
        </div>

        <Divider color="#1a2733" />

        <Stack gap="lg">
          {projects.map((project) => (
            <PortfolioProjectCard key={project.id} project={project} />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
