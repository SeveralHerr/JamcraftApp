import {
  Divider,
  SimpleGrid,
  Center,
  Image,
  Box,
  Container
} from "@mantine/core";
import { useCommunityChannels } from "../community-hub/ui/hooks/useCommunityChannels";
import { CommunityChannelCard } from "../community-hub/ui/components/CommunityChannelCard";

export function Home() {
  const { channels, loading } = useCommunityChannels();

  if (loading) {
    return <div>Loading...</div>;
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
          color="#1a2733"
          size="sm"
        />
        <Center>
          <SimpleGrid
            cols={{ base: 1, xs: 1, md: 3 }}
            spacing={{ base: 1, sm: "lg", lg: "xl" }}
            verticalSpacing={{ base: "md", sm: "xl" }}
          >
            {channels.map(channel => (
              <CommunityChannelCard key={channel.id} channel={channel} />
            ))}
          </SimpleGrid>
        </Center>
      </Container>
    </>
  );
}
