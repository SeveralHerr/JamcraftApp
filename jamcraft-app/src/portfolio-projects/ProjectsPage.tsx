import { Container, Stack, Divider, Title } from '@mantine/core';
import { usePortfolioProjects } from './ui/hooks/usePortfolioProjects';
import { PortfolioProjectCard } from './ui/components/PortfolioProjectCard';
import { useGameJamSubmissions } from '../game-jam-submissions/ui/hooks/useGameJamSubmissions';
import { GameJamCard } from '../game-jam-submissions/ui/components/GameJamCard';
import { LoadingPage } from '../components/ui/LoadingPage';
import { PageHeader } from '../components/ui/PageHeader';
import { colors, typography } from '../theme';

export function ProjectsPage() {
  const { projects, loading: projectsLoading } = usePortfolioProjects();
  const { submissions, loading: submissionsLoading } = useGameJamSubmissions();

  if (projectsLoading || submissionsLoading) {
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

        <Divider color={colors.border.divider} my="xl" />

        <Stack gap="lg">
          <Title
            order={1}
            c={colors.text.primary}
            ta="center"
            style={{
              fontSize: typography.fontSize['5xl'],
              fontWeight: typography.fontWeight.bold,
              textTransform: 'uppercase',
              letterSpacing: typography.letterSpacing.tighter,
              lineHeight: typography.lineHeight.tight,
            }}
          >
            Game Jam Submissions
          </Title>

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
        </Stack>
      </Stack>
    </Container>
  );
}
