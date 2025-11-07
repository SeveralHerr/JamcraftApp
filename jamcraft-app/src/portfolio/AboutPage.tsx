import {
  Container,
  Grid,
  Stack,
  Divider,
  Group,
} from "@mantine/core";
import { useProfile } from "./ui/hooks/useProfile";
import { useSocialLinks } from "../social-presence/ui/hooks/useSocialLinks";
import { ProfileImage } from "./ui/components/ProfileImage";
import { ProfileHeader } from "./ui/components/ProfileHeader";
import { ProfileBio } from "./ui/components/ProfileBio";
import { SocialLinkIcon } from "../social-presence/ui/components/SocialLinkIcon";
import { LoadingPage } from "../components/ui/LoadingPage";
import { colors } from "../theme";

export function AboutPage() {
  const { profile, loading: profileLoading } = useProfile();
  const { socialLinks, loading: socialLinksLoading } = useSocialLinks();

  if (profileLoading || socialLinksLoading || !profile) {
    return <LoadingPage />;
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
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
