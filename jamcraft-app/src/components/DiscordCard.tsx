import { Card, Image, Text, Button, Group } from '@mantine/core';

export function DiscordCard() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section h={250} w={400}>
 
      <Image       
          src="/assets/discord.gif"

            h={250}
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