import { Group, Image, Text } from '@mantine/core';
import { EXTERNAL_LINKS } from '../../../config/routes';
import { colors, typography } from '../../../theme';

export function JamcraftInvite() {
  return (
    <a
      href={EXTERNAL_LINKS.discord}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join the Jamcraft Discord server"
      className="focus-ring"
      style={{ display: 'inline-flex', textDecoration: 'none', width: 'fit-content' }}
    >
      <Group gap="sm" align="center">
        <Image
          src="/assets/logo_server_icon_small_transparent_no_bkg.png"
          alt="Jamcraft logo"
          h={40}
          w={40}
          fit="contain"
        />
        <Text
          size="sm"
          fw={typography.fontWeight.medium}
          c={colors.brand.primary}
        >
          Join the Jamcraft Discord
        </Text>
      </Group>
    </a>
  );
}
