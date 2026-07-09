import { Container, Group, Stack, Text, Title } from '@mantine/core';
import { useSocialLinks } from '../../social-presence/ui/hooks/useSocialLinks';
import { SocialLinkIcon } from '../../social-presence/ui/components/SocialLinkIcon';
import { colors, spacing, typography, headerHeight, containerSizes } from '../../theme';

/**
 * Site footer — doubles as the "Contact" section of the single page.
 */
export function Footer() {
  const { socialLinks } = useSocialLinks();

  return (
    <footer
      id="contact"
      style={{
        scrollMarginTop: headerHeight.desktop,
        borderTop: `1px solid ${colors.border.divider}`,
        background: colors.background.secondary,
        padding: `${spacing['2xl']} 0`,
      }}
    >
      <Container size={containerSizes.lg} px="lg">
        <Stack gap="lg" align="center">
          <Title
            order={2}
            c={colors.text.primary}
            style={{
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.bold,
              letterSpacing: typography.letterSpacing.tight,
            }}
          >
            Get in touch
          </Title>
          <Text c={colors.text.dimmed} ta="center" maw={480}>
            The best place to reach me is LinkedIn — or find me on any of
            these platforms.
          </Text>
          <Group gap="md" justify="center">
            {socialLinks.map((link) => (
              <SocialLinkIcon key={link.id} socialLink={link} />
            ))}
          </Group>
          <Text c={colors.text.muted} size="sm">
            © {new Date().getFullYear()} James Herr · jamcraft.io
          </Text>
        </Stack>
      </Container>
    </footer>
  );
}
