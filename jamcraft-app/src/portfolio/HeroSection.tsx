import { Grid, Stack, Divider, Group, Button, Center } from '@mantine/core';
import { IconArrowDown } from '@tabler/icons-react';
import { useProfile } from './ui/hooks/useProfile';
import { useSocialLinks } from '../social-presence/ui/hooks/useSocialLinks';
import { ProfileImage } from './ui/components/ProfileImage';
import { ProfileHeader } from './ui/components/ProfileHeader';
import { ProfileBio } from './ui/components/ProfileBio';
import { SocialLinkIcon } from '../social-presence/ui/components/SocialLinkIcon';
import { Section } from '../components/ui/Section';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { colors, headerHeight } from '../theme';

/**
 * Full-height hero / about section — the landing view of the single page.
 */
export function HeroSection() {
  const { profile, loading: profileLoading } = useProfile();
  const { socialLinks, loading: socialLinksLoading } = useSocialLinks();

  return (
    <div
      style={{
        minHeight: `calc(100vh - ${headerHeight.desktop})`,
        display: 'flex',
        alignItems: 'center',
        background: `
          radial-gradient(ellipse 80% 60% at 70% 20%, ${colors.brand.primarySubtle}, transparent),
          linear-gradient(180deg, ${colors.background.primary} 0%, ${colors.background.secondary} 100%)
        `,
      }}
    >
      <Section id="home">
        {profileLoading || socialLinksLoading || !profile ? (
          <Center py="xl">
            <LoadingSpinner />
          </Center>
        ) : (
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <ProfileImage profile={profile} />
            </Grid.Col>

            <Grid.Col
              span={{ base: 12, sm: 6 }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Stack gap="lg" style={{ width: '100%' }}>
                <div>
                  <ProfileHeader profile={profile} />
                  <ProfileBio profile={profile} />
                </div>

                <div>
                  <Divider color={colors.border.divider} />
                  <Group gap="md" mt="md">
                    {socialLinks.map((link, index) => (
                      <div
                        key={link.id}
                        style={{
                          animation: `fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s both`,
                        }}
                      >
                        <SocialLinkIcon socialLink={link} />
                      </div>
                    ))}
                  </Group>
                </div>

                <Group mt="md">
                  <Button
                    component="a"
                    href="#projects"
                    size="md"
                    className="focus-ring"
                    rightSection={<IconArrowDown size={18} />}
                    variant="gradient"
                    gradient={{
                      from: colors.brand.primary,
                      to: colors.brand.primaryPressed,
                      deg: 135,
                    }}
                  >
                    View Projects
                  </Button>
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>
        )}
      </Section>
    </div>
  );
}
