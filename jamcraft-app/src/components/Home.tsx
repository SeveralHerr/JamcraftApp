import {
  Divider,
  SimpleGrid,
  Center,
  Image,
  Space,
  Box,
  Container
} from "@mantine/core";
import { DiscordCard } from "./Cards/DiscordCard";
import { ItchCard } from "./Cards/ItchCard";
import { MinecraftCard } from "./Cards/MinecraftCard";

export function Home() {
  return (
    <>
      <Container size="s" maw={600}>
        <Box mx="auto" px="md" py="xl">
          <Space h={50} />
          <Image
            radius="md"
            h={100}
            w="100%"
            maw={600}
            fit="contain"
            src="/assets/jamcraft_with_slogan.png"
            alt="Jamcraft Logo"
          />
          <Space h={50} />
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
            <MinecraftCard />
          </SimpleGrid>
        </Center>
      </Container>
    </>
  );
}
