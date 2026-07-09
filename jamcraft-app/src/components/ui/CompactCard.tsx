import { Group, Image, Stack, Text } from '@mantine/core';
import type { CSSProperties, ReactNode } from 'react';
import { Card as UnifiedCard } from './Card';
import { colors, typography } from '../../theme';

const THUMBNAIL_SIZE = 72;

interface CompactCardProps {
  title: string;
  line?: string;
  imageUrl?: string;
  imageAlt?: string;
  /** Custom thumbnail node rendered instead of an image (e.g. an icon box). */
  thumbnail?: ReactNode;
  /** Small trailing element such as a single badge. */
  meta?: ReactNode;
  /** When set, the whole card becomes a secure external link. */
  href?: string;
  ariaLabel?: string;
  onClick?: () => void;
  hover?: boolean;
  variant?: 'default' | 'glass';
  style?: CSSProperties;
}

/**
 * Compact Card
 * Minimalist card layout: small square thumbnail, title, and one short line.
 * Used by all section grids (projects, game jams, podcasts, workshops).
 */
export function CompactCard({
  title,
  line,
  imageUrl,
  imageAlt,
  thumbnail,
  meta,
  href,
  ariaLabel,
  onClick,
  hover = true,
  variant = 'default',
  style,
}: CompactCardProps) {
  const card = (
    <UnifiedCard variant={variant} hover={hover} onClick={onClick} padding="md" radius="md" style={style}>
      <Group wrap="nowrap" gap="md" align="center">
        {thumbnail ??
          (imageUrl && (
            <Image
              src={imageUrl}
              alt={imageAlt ?? ''}
              w={THUMBNAIL_SIZE}
              h={THUMBNAIL_SIZE}
              miw={THUMBNAIL_SIZE}
              fit="cover"
              radius="md"
            />
          ))}
        <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
          <Text
            c={colors.text.primary}
            size="sm"
            fw={typography.fontWeight.semibold}
            lineClamp={2}
            style={{ letterSpacing: typography.letterSpacing.tight }}
          >
            {title}
          </Text>
          {line && (
            <Text size="xs" c={colors.text.subtle} lineClamp={1}>
              {line}
            </Text>
          )}
          {meta}
        </Stack>
      </Group>
    </UnifiedCard>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring"
        aria-label={ariaLabel ?? title}
        style={{ display: 'block', textDecoration: 'none' }}
      >
        {card}
      </a>
    );
  }

  return card;
}
