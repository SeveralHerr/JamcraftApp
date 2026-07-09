import { Image, Text, Title, Badge, Stack } from '@mantine/core';
import { IconMicrophone, IconExternalLink } from '@tabler/icons-react';
import { PodcastEpisode } from '../../entities/PodcastEpisode';
import { Card as UnifiedCard } from '../../../components/ui/Card';
import { colors, typography } from '../../../theme';
import styles from './PodcastEpisodeCard.module.css';

interface PodcastEpisodeCardProps {
  episode: PodcastEpisode;
}

export function PodcastEpisodeCard({ episode }: PodcastEpisodeCardProps) {
  return (
    <UnifiedCard variant="glass" hover>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 'var(--mantine-spacing-xl)',
          alignItems: 'flex-start',
        }}
        className={styles['podcast-card-content']}
      >
        <div
          style={{ width: 300, minWidth: 300, flexShrink: 0 }}
          className={styles['podcast-card-artwork']}
        >
          <Image
            src={episode.artworkUrl}
            alt={`${episode.showName} episode artwork`}
            w="100%"
            h={170}
            fit="cover"
            radius="md"
          />
        </div>

        <Stack gap="sm" style={{ flex: 1, minWidth: 0 }} justify="center">
          <div>
            <Text
              c={colors.brand.primary}
              size="xs"
              fw={typography.fontWeight.semibold}
              tt="uppercase"
              style={{
                letterSpacing: typography.letterSpacing.widest,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                marginBottom: '0.5rem',
              }}
            >
              <IconMicrophone size={14} /> {episode.showName}
            </Text>
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
              {episode.episodeTitle}
            </Title>
            {episode.publishedYear && (
              <Badge color="brand" variant="light" size="sm">
                {episode.publishedYear}
              </Badge>
            )}
          </div>

          <Text
            size="sm"
            style={{
              lineHeight: typography.lineHeight.relaxed,
              color: colors.text.tertiary,
            }}
          >
            {episode.description}
          </Text>

          <Text
            component="a"
            href={episode.episodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring"
            c={colors.brand.primary}
            size="sm"
            fw={typography.fontWeight.medium}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              width: 'fit-content',
            }}
          >
            Listen / Watch <IconExternalLink size={16} />
          </Text>
        </Stack>
      </div>
    </UnifiedCard>
  );
}
