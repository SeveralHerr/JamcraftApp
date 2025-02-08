import { Card, Image, Text, Button, Group } from '@mantine/core';

export function DiscordCard() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder  w="100%" >
      <Card.Section >
 
      <Image       
          src="/assets/discord.gif"

          radius="md"
          h="100%"
          w="100%"
          maw = {300}
          mah={300}
          fit="contain"
          alt="Discord"
        />
    
  

      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Jamcraft Discord</Text>
      </Group>

      <Text size="sm" c="dimmed">
        Join today
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Join
      </Button>
    </Card>
  );
}