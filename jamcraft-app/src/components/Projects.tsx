import { Container, Stack, Title, Text, Divider } from '@mantine/core';
import { usePortfolioProjects } from '../portfolio-projects/ui/hooks/usePortfolioProjects';
import { PortfolioProjectCard } from '../portfolio-projects/ui/components/PortfolioProjectCard';
import { LoadingPage } from './ui/LoadingPage';
import { colors, typography } from '../theme';

export function Projects() {
  const { projects, loading } = usePortfolioProjects();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div
          style={{
            animation: 'fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) both',
          }}
        >
          <Title
            order={1}
            c={colors.text.primary}
            ta="left"
            style={{
              fontSize: typography.fontSize['5xl'],
              fontWeight: typography.fontWeight.bold,
              textTransform: 'uppercase',
              letterSpacing: typography.letterSpacing.tighter,
            }}
          >
            Projects
          </Title>
          <Text
            c={colors.text.dimmed}
            ta="left"
            mt="xs"
            style={{
              fontSize: typography.fontSize.lg,
              lineHeight: typography.lineHeight.relaxed,
            }}
          >
            A collection of games and applications I've built
          </Text>
        </div>

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
