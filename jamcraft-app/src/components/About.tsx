import {
  Container,
  Title,
  Text,
  Grid,
  Stack,
  Box,
  Divider,
  Image,
  Group,
} from "@mantine/core";
import { EXTERNAL_LINKS } from "../config/routes";

export function About() {
  return (
    <Container size="lg" py="xl">
      <Grid gutter="xl">
        {/* Left Column - Image */}
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Box
            style={{
              maxWidth: 400,
              margin: "0 auto",
              aspectRatio: "1",
              borderRadius: "50%",
              border: "4px solid #f6940b",
              overflow: "hidden",
            }}
          >
            <Image
              src="/assets/linkdin_profile.jpg"
              h="100%"
              w="100%"
              fit="cover"
              alt="Profile"
            />
          </Box>
        </Grid.Col>

        {/* Right Column - Content */}
        <Grid.Col
          span={{ base: 12, sm: 6 }}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Stack gap="lg" style={{ width: "100%" }}>
            <div>
              <Text style={{ lineHeight: 0.5 }} ta="left" c="gray.5">
                Hello, I am
              </Text>
              <Title
                order={1}
                c="#ededed"
                ta="left"
                style={{
                  fontSize: "3.0rem",
                  fontWeight: "bold",
                  color: "#ededed",
                  textTransform: "uppercase",
                }}
              >
                James Herr
              </Title>

              <Text c="gray.5" ta="left">
                Full-Stack Engineer and game developer passionate about
                collaborative coding, AI, and procedural generation.
              </Text>
            </div>

            <div>
              <Divider color="#1a2733" />
              <Group gap="md" mt="md">
                <a
                  href={EXTERNAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/assets/brand-linkedin.png"
                    h={40}
                    w={40}
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </a>
                <a
                  href={EXTERNAL_LINKS.steam}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/assets/brand-steam.png"
                    h={40}
                    w={40}
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </a>
                <a
                  href={EXTERNAL_LINKS.bluesky}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/assets/brand-bluesky.png"
                    h={40}
                    w={40}
                    style={{
                      filter: "brightness(0) invert(1)",
                      cursor: "pointer",
                    }}
                  />
                </a>
                <a
                  href={EXTERNAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/assets/brand-youtube.png"
                    h={40}
                    w={40}
                    style={{
                      filter: "brightness(0) invert(1)",
                      cursor: "pointer",
                    }}
                  />
                </a>
                <a
                  href={EXTERNAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/assets/brand-github.png"
                    h={40}
                    w={40}
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </a>
                <a
                  href={EXTERNAL_LINKS.itch_profile}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/assets/brand-itch.png"
                    h={40}
                    w={40}
                    style={{
                      filter: "brightness(0) invert(1)",
                      cursor: "pointer",
                    }}
                  />
                </a>
              </Group>
            </div>
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
