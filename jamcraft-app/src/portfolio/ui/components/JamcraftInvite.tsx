import { Image, Stack, Text } from '@mantine/core';
import { EXTERNAL_LINKS } from '../../../config/routes';
import { colors, typography } from '../../../theme';

interface JamcraftInviteProps {
  /** Horizontal alignment of the logo and caption. */
  align?: 'flex-start' | 'center';
  /** Pass 'lazy' when the invite renders below the fold (e.g. the footer). */
  imageLoading?: 'eager' | 'lazy';
}

export function JamcraftInvite({ align = 'flex-start', imageLoading = 'eager' }: JamcraftInviteProps) {
  return (
    <a
      href={EXTERNAL_LINKS.discord}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join the Jamcraft Discord server"
      className="focus-ring"
      style={{ display: 'inline-flex', textDecoration: 'none', width: 'fit-content' }}
    >
      <Stack gap={6} align={align}>
        <Image
          src="/assets/jamcraft-logo-full.png"
          alt="Jamcraft logo"
          loading={imageLoading}
          w={240}
          maw="100%"
          h="auto"
          fit="contain"
        />
        <Text
          size="sm"
          fw={typography.fontWeight.medium}
          c={colors.brand.primary}
        >
          Join the Jamcraft Discord
        </Text>
      </Stack>
    </a>
  );
}
