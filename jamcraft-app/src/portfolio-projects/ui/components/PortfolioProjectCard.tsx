import { Card, Image, Text, Title, Badge, Group, Stack } from '@mantine/core';
import { PortfolioProject } from '../../entities/PortfolioProject';
import { NavigateToExternalLink } from '../../../social-presence/use-cases/NavigateToExternalLink';
import { BrowserNavigationService } from '../../../social-presence/services/BrowserNavigationService';

interface PortfolioProjectCardProps {
  project: PortfolioProject;
}

const PLATFORM_COLORS = {
  github: 'gray',
  steam: 'blue',
  itch: 'pink',
} as const;

const PLATFORM_LABELS = {
  github: 'GitHub',
  steam: 'Steam',
  itch: 'itch.io',
} as const;

export function PortfolioProjectCard({ project }: PortfolioProjectCardProps) {
  const handleClick = () => {
    const navigationService = new BrowserNavigationService();
    const useCase = new NavigateToExternalLink(navigationService);
    useCase.execute(project.projectUrl);
  };

  return (
    <Card
      padding="lg"
      radius="md"
      withBorder
      style={{
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        backgroundColor: '#1a2733',
        borderColor: '#2a3744',
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <Group align="center" gap="xl" wrap="nowrap">
        {project.screenshotUrl && (
          <div style={{ width: 300, height: 200, flexShrink: 0 }}>
            <Image
              src={project.screenshotUrl}
              alt={project.name}
              w={300}
              h={200}
              fit="cover"
              radius="md"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>
        )}

        <Stack gap="sm" style={{ flex: 1 }} justify="center">
          <div>
            <Title order={2} size="h3" c="#ededed" mb="xs">
              {project.name}
            </Title>
            <Badge color={PLATFORM_COLORS[project.platform]} variant="light" size="sm">
              {PLATFORM_LABELS[project.platform]}
            </Badge>
          </div>

          <Text c="dimmed" size="sm" style={{ lineHeight: 1.6 }}>
            {project.description}
          </Text>

          <Text c="#f6924b" size="sm" fw={500}>
            View Project →
          </Text>
        </Stack>
      </Group>
    </Card>
  );
}
