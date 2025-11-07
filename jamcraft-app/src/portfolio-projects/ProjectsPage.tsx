import { Container, Stack, Divider } from '@mantine/core';
import { usePortfolioProjects } from './ui/hooks/usePortfolioProjects';
import { PortfolioProjectCard } from './ui/components/PortfolioProjectCard';
import { LoadingPage } from '../components/ui/LoadingPage';
import { PageHeader } from '../components/ui/PageHeader';
import { colors } from '../theme';

export function ProjectsPage() {
  const { projects, loading } = usePortfolioProjects();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <PageHeader
          title="Projects"
          subtitle="A collection of games and applications I've built"
          align="center"
        />

        <Divider color={colors.border.divider} />

        <Stack gap="lg">
          {projects.map((project, index) => (
            <div
              key={project.id}
              style={{
                animation: `fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${0.1 + index * 0.1}s both`,
              }}
            >
              <PortfolioProjectCard project={project} />
            </div>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
