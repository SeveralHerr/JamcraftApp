import { Image, Text, Title, Badge, Group, Stack } from '@mantine/core';
import { useState } from 'react';
import { IconEye, IconAlertTriangle } from '@tabler/icons-react';
import { PortfolioProject } from '../../entities/PortfolioProject';
import { NavigateToExternalLink } from '../../../social-presence/use-cases/NavigateToExternalLink';
import { BrowserNavigationService } from '../../../social-presence/services/BrowserNavigationService';
import { Card as UnifiedCard } from '../../../components/ui/Card';
import { colors, shadows, transitions, typography } from '../../../theme';

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

// Singleton service instance
const navigationService = new BrowserNavigationService();

export function PortfolioProjectCard({ project }: PortfolioProjectCardProps) {
  const [showNSFW, setShowNSFW] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  const handleClick = () => {
    if (project.isNSFW && !showNSFW) {
      return;
    }
    const useCase = new NavigateToExternalLink(navigationService);
    useCase.execute(project.projectUrl);
  };

  const handleRevealNSFW = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRevealing(true);
    setTimeout(() => {
      setShowNSFW(true);
    }, 300);
  };

  return (
    <div style={{ position: 'relative' }}>
      <UnifiedCard
        onClick={handleClick}
        hover={!project.isNSFW || showNSFW}
        style={{
          cursor: project.isNSFW && !showNSFW ? 'default' : 'pointer',
          filter: project.isNSFW && !showNSFW ? 'blur(8px)' : 'none',
          transition: transitions.default,
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
              <Title
                order={2}
                size="h3"
                c={colors.text.primary}
                mb="xs"
                style={{
                  fontWeight: typography.fontWeight.semibold,
                  letterSpacing: typography.letterSpacing.tight,
                }}
              >
                {project.name}
              </Title>
              <Badge color={PLATFORM_COLORS[project.platform]} variant="light" size="sm">
                {PLATFORM_LABELS[project.platform]}
              </Badge>
            </div>

            <Text
              c="dimmed"
              size="sm"
              style={{
                lineHeight: typography.lineHeight.relaxed,
                color: colors.text.tertiary,
              }}
            >
              {project.description}
            </Text>

            <Text
              c={colors.brand.primary}
              size="sm"
              fw={typography.fontWeight.medium}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              View Project <IconEye size={16} />
            </Text>
          </Stack>
        </Group>
      </UnifiedCard>

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
            backgroundColor: colors.nsfw.overlay,
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            zIndex: 10,
            opacity: isRevealing ? 0 : 1,
            transform: isRevealing ? 'scale(0.95)' : 'scale(1)',
            transition: transitions.slow,
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
              padding: '2rem',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${colors.nsfw.warning}, ${colors.brand.primary})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: shadows.glowMd,
                animation: 'pulse 2s ease-in-out infinite',
              }}
            >
              <IconAlertTriangle size={40} color="white" />
            </div>

            <div>
              <Text
                size="xl"
                fw={typography.fontWeight.bold}
                c="white"
                mb="xs"
                style={{
                  textTransform: 'uppercase',
                  letterSpacing: typography.letterSpacing.widest,
                  fontSize: typography.fontSize['2xl'],
                }}
              >
                NSFW Content
              </Text>
              <Text
                size="sm"
                c={colors.text.secondary}
                px="md"
                style={{
                  maxWidth: '300px',
                  lineHeight: typography.lineHeight.relaxed,
                }}
              >
                This content may contain suggestive or mature themes
              </Text>
            </div>

            <button
              onClick={handleRevealNSFW}
              className="focus-ring"
              style={{
                padding: '12px 32px',
                backgroundColor: colors.brand.primary,
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: typography.fontWeight.semibold,
                fontSize: typography.fontSize.base,
                color: colors.background.secondary,
                transition: transitions.fast,
                boxShadow: shadows.buttonHover,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.brand.primaryHover;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = shadows.glowMd;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.brand.primary;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = shadows.buttonHover;
              }}
            >
              <IconEye size={18} />
              Click to Reveal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
