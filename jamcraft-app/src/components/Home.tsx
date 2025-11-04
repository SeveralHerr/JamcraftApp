import {
  Divider,
  SimpleGrid,
  Center,
  Image,
  Box,
  Container
} from "@mantine/core";
import { DiscordCard } from "./Cards/DiscordCard";
import { ItchCard } from "./Cards/ItchCard";
import { TwitchCard } from "./Cards/TwitchCard";

export function Home() {
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
     
            src="/assets/logo_narrow.png"
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
            <DiscordCard />
            <ItchCard />
            <TwitchCard />
          </SimpleGrid>
        </Center>
      </Container>
    </>
  );
}
