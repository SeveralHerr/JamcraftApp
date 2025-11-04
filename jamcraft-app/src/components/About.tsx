import {
  Container,
  Grid,
  Stack,
  Divider,
  Group,
} from "@mantine/core";
import { useProfile } from "../portfolio/ui/hooks/useProfile";
import { useSocialLinks } from "../social-presence/ui/hooks/useSocialLinks";
import { ProfileImage } from "../portfolio/ui/components/ProfileImage";
import { ProfileHeader } from "../portfolio/ui/components/ProfileHeader";
import { ProfileBio } from "../portfolio/ui/components/ProfileBio";
import { SocialLinkIcon } from "../social-presence/ui/components/SocialLinkIcon";

export function About() {
  const { profile, loading: profileLoading } = useProfile();
  const { socialLinks, loading: socialLinksLoading } = useSocialLinks();

  if (profileLoading || socialLinksLoading || !profile) {
    return <div>Loading...</div>;
  }

  return (
    <Container size="lg" py="xl">
      <Grid gutter="xl">
        {/* Left Column - Image */}
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <ProfileImage profile={profile} />
        </Grid.Col>

        {/* Right Column - Content */}
        <Grid.Col
          span={{ base: 12, sm: 6 }}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Stack gap="lg" style={{ width: "100%" }}>
            <div>
              <ProfileHeader profile={profile} />
              <ProfileBio profile={profile} />
            </div>

            <div>
              <Divider color="#1a2733" />
              <Group gap="md" mt="md">
                {socialLinks.map(link => (
                  <SocialLinkIcon key={link.id} socialLink={link} />
                ))}
              </Group>
            </div>
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
