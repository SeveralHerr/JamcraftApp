import { Anchor, Container, Group, Stack, Text, Title } from '@mantine/core';
import { useSocialLinks } from '../../social-presence/ui/hooks/useSocialLinks';
import { SocialLinkIcon } from '../../social-presence/ui/components/SocialLinkIcon';
import { JamcraftInvite } from '../../portfolio/ui/components/JamcraftInvite';
import { colors, spacing, typography, headerHeight, containerSizes } from '../../theme';

/**
 * Site footer — doubles as the "Contact" section of the single page.
 */
export function Footer() {
  const { socialLinks } = useSocialLinks();
  const linkedIn = socialLinks.find((link) => link.id === 'linkedin');

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
            The best place to reach me is{' '}
            {linkedIn && (
              <Anchor href={linkedIn.url} target="_blank" rel="noopener noreferrer" c={colors.brand.primary}>
                LinkedIn
              </Anchor>
            )}{' '}
            — or find me on any of these platforms.
          </Text>
          <Group gap="md" justify="center">
            {socialLinks.map((link) => (
              <SocialLinkIcon key={link.id} socialLink={link} imageLoading="lazy" />
            ))}
          </Group>
          <JamcraftInvite align="center" imageLoading="lazy" />
          <Text c={colors.text.muted} size="sm">
            © {new Date().getFullYear()} James Herr · Jamcraft LLC
          </Text>
        </Stack>
      </Container>
    </footer>
  );
}
