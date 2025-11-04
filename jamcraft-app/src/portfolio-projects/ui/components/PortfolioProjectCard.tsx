import { Card, Image, Text, Title, Badge, Group, Stack } from '@mantine/core';
import { useState } from 'react';
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
  const [showNSFW, setShowNSFW] = useState(false);

  const handleClick = () => {
    if (project.isNSFW && !showNSFW) {
      return; // Prevent navigation if NSFW is not revealed
    }
    const navigationService = new BrowserNavigationService();
    const useCase = new NavigateToExternalLink(navigationService);
    useCase.execute(project.projectUrl);
  };

  const handleRevealNSFW = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowNSFW(true);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Card
        padding="lg"
        radius="md"
        withBorder
        style={{
          cursor: project.isNSFW && !showNSFW ? 'default' : 'pointer',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          backgroundColor: '#1a2733',
          borderColor: '#2a3744',
          filter: project.isNSFW && !showNSFW ? 'blur(10px)' : 'none',
        }}
        onClick={handleClick}
        onMouseEnter={(e) => {
          if (!project.isNSFW || showNSFW) {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
          }
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
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
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

    {project.isNSFW && !showNSFW && (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '8px',
          zIndex: 10,
        }}
      >
        <Text
          size="xl"
          fw={700}
          c="red"
          mb="xs"
          style={{ textTransform: 'uppercase', letterSpacing: '2px' }}
        >
          NSFW
        </Text>
        <Text size="sm" c="white" mb="md" ta="center" px="md">
          This content may be suggestive
        </Text>
        <div
          onClick={handleRevealNSFW}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f6924b',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 600,
            color: '#1a2733',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ff8c42';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f6924b';
          }}
        >
          Click to Reveal
        </div>
      </div>
    )}
  </div>
  );
}
