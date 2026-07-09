import { Badge } from '@mantine/core';
import { useState } from 'react';
import { IconEye } from '@tabler/icons-react';
import { PortfolioProject } from '../../entities/PortfolioProject';
import { NavigateToExternalLink } from '../../../social-presence/use-cases/NavigateToExternalLink';
import { BrowserNavigationService } from '../../../social-presence/services/BrowserNavigationService';
import { CompactCard } from '../../../components/ui/CompactCard';
import { colors, transitions, typography } from '../../../theme';

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
      <CompactCard
        title={project.name}
        line={project.description}
        imageUrl={project.screenshotUrl ?? undefined}
        imageAlt={project.name}
        meta={
          <Badge color={PLATFORM_COLORS[project.platform]} variant="light" size="xs" w="fit-content">
            {PLATFORM_LABELS[project.platform]}
          </Badge>
        }
        onClick={handleClick}
        hover={!project.isNSFW || showNSFW}
        style={{
          cursor: project.isNSFW && !showNSFW ? 'default' : 'pointer',
          filter: project.isNSFW && !showNSFW ? 'blur(8px)' : 'none',
          transition: transitions.default,
        }}
      />

      {project.isNSFW && !showNSFW && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.nsfw.overlay,
            backdropFilter: 'blur(20px)',
            borderRadius: 'var(--mantine-radius-md)',
            zIndex: 10,
            opacity: isRevealing ? 0 : 1,
            transform: isRevealing ? 'scale(0.95)' : 'scale(1)',
            transition: transitions.slow,
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <button
            onClick={handleRevealNSFW}
            className="focus-ring"
            style={{
              padding: '8px 16px',
              backgroundColor: colors.brand.primary,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.sm,
              color: colors.background.secondary,
              transition: transitions.fast,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.brand.primaryHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.brand.primary;
            }}
          >
            <IconEye size={16} />
            NSFW — Reveal
          </button>
        </div>
      )}
    </div>
  );
}
