import {
  Divider,
  SimpleGrid,
  Center,
  Image,
  Box,
  Container
} from "@mantine/core";
import { useCommunityChannels } from "./ui/hooks/useCommunityChannels";
import { CommunityChannelCard } from "./ui/components/CommunityChannelCard";
import { LoadingPage } from "../components/ui/LoadingPage";
import { colors } from "../theme";

export function CommunityHubPage() {
  const { channels, loading } = useCommunityChannels();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Container
        size="s"
        maw={800}
        h="auto"
        mah={400}

        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box
          mx="auto"
          w="100%"
        >
          <Image
            radius="xl"
            h="auto"
            mah={400}
            fit="scale-down"
            w="100%"
            maw={800}

            src="/assets/logo_with_background.png"
            alt="Jamcraft Logo"
          />
        </Box>
      </Container>

      <Container size="lg">
        <Divider
          my="md"
          color={colors.border.divider}
          size="sm"
        />
        <Center>
          <SimpleGrid
            cols={{ base: 1, sm: 3 }}
            spacing={{ base: "md", sm: "lg", lg: "xl" }}
            verticalSpacing={{ base: "md", sm: "xl" }}
          >
            {channels.map((channel, index) => (
              <div
                key={channel.id}
                style={{
                  animation: `fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s both`,
                }}
              >
                <CommunityChannelCard channel={channel} />
              </div>
            ))}
          </SimpleGrid>
        </Center>
      </Container>
    </>
  );
}
