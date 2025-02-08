
import { Divider,SimpleGrid,Center, Image,Space,Box,Container } from '@mantine/core';
import { DiscordCard } from './DiscordCard';


export function Home() {

  return (
    <>
    
    <Container size="s"     maw={600}>
      <Box mx="auto" px="md" py="xl" > 
      <Space h={50} />
        <Image       radius="md"
    
    
    h={100}
    w="100%"
    maw={600}

    fit="contain"

      src="/assets/jamcraft.png" alt="Jamcraft Logo" />
      <Space h={50} />
    </Box>
    </Container>
    <Container size="lg" >
      
        <Divider my="md" />

      <Center>
        <SimpleGrid
        cols={{ base: 1, sm: 1, lg: 3 }}
        spacing={{ base: 1, sm: 'xl', lg: 'xl' }}
        verticalSpacing={{ base: 'md', sm: 'xl' }}
      >
        <DiscordCard ></DiscordCard>
        <DiscordCard ></DiscordCard>
        <DiscordCard ></DiscordCard>
      </SimpleGrid>
    </Center>
 
    </Container>


    </>
  );
}