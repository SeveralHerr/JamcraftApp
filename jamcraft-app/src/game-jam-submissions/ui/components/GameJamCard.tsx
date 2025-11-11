import { Image, Text, Title, Badge, Stack } from '@mantine/core';
import { IconTrophy } from '@tabler/icons-react';
import { GameJamSubmission } from '../../entities/GameJamSubmission';
import { NavigateToExternalLink } from '../../../social-presence/use-cases/NavigateToExternalLink';
import { BrowserNavigationService } from '../../../social-presence/services/BrowserNavigationService';
import { Card as UnifiedCard } from '../../../components/ui/Card';
import { colors, typography } from '../../../theme';
import styles from './GameJamCard.module.css';

interface GameJamCardProps {
  submission: GameJamSubmission;
}

// Singleton service instance
const navigationService = new BrowserNavigationService();

export function GameJamCard({ submission }: GameJamCardProps) {
  const handleClick = () => {
    const useCase = new NavigateToExternalLink(navigationService);
    useCase.execute(submission.gameUrl);
  };

  return (
    <UnifiedCard onClick={handleClick} hover style={{ cursor: 'pointer' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 'var(--mantine-spacing-xl)',
          alignItems: 'flex-start',
        }}
        className={styles['game-jam-card-content']}
      >
        {submission.coverImageUrl && (
          <div
            style={{
              width: 300,
              minWidth: 300,
              height: 200,
              flexShrink: 0,
            }}
            className={styles['game-jam-card-image']}
          >
            <Image
              src={submission.coverImageUrl}
              alt={submission.name}
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

        <Stack gap="sm" style={{ flex: 1, minWidth: 0 }} justify="center">
          <div>
            <Title
              order={3}
              size="h4"
              c={colors.text.primary}
              mb="xs"
              style={{
                fontWeight: typography.fontWeight.semibold,
                letterSpacing: typography.letterSpacing.tight,
              }}
            >
              {submission.name}
            </Title>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Badge color="grape" variant="light" size="sm">
                {submission.jamName}
              </Badge>
              {submission.theme && (
                <Badge color="violet" variant="outline" size="sm">
                  Theme: {submission.theme}
                </Badge>
              )}
            </div>
          </div>

          <Text
            c="dimmed"
            size="sm"
            style={{
              lineHeight: typography.lineHeight.relaxed,
              color: colors.text.tertiary,
            }}
          >
            {submission.description}
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
            Play Game <IconTrophy size={16} />
          </Text>
        </Stack>
      </div>
    </UnifiedCard>
  );
}
