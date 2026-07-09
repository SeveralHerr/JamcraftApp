import { Stack, SimpleGrid, Divider, Title, Center } from '@mantine/core';
import { usePortfolioProjects } from './ui/hooks/usePortfolioProjects';
import { PortfolioProjectCard } from './ui/components/PortfolioProjectCard';
import { useGameJamSubmissions } from '../game-jam-submissions/ui/hooks/useGameJamSubmissions';
import { GameJamCard } from '../game-jam-submissions/ui/components/GameJamCard';
import { Section } from '../components/ui/Section';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { colors, typography } from '../theme';

export function ProjectsSection() {
  const { projects, loading: projectsLoading } = usePortfolioProjects();
  const { submissions, loading: submissionsLoading } = useGameJamSubmissions();

  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="A collection of games and applications I've built"
    >
      {projectsLoading || submissionsLoading ? (
        <Center py="xl">
          <LoadingSpinner />
        </Center>
      ) : (
        <Stack gap="xl">
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" verticalSpacing="md">
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
          </SimpleGrid>

          <Divider color={colors.border.divider} my="xl" />

          <Stack gap="lg">
            <Title
              order={2}
              c={colors.text.primary}
              style={{
                fontSize: typography.fontSize['3xl'],
                fontWeight: typography.fontWeight.bold,
                textTransform: 'uppercase',
                letterSpacing: typography.letterSpacing.tight,
                lineHeight: typography.lineHeight.tight,
              }}
            >
              Game Jam Submissions
            </Title>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" verticalSpacing="md">
              {submissions.map((submission, index) => (
                <div
                  key={submission.id}
                  style={{
                    animation: `fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${0.1 + index * 0.1}s both`,
                  }}
                >
                  <GameJamCard submission={submission} />
                </div>
              ))}
            </SimpleGrid>
          </Stack>
        </Stack>
      )}
    </Section>
  );
}
