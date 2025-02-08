import { Card, Image, Text, Button, Group, Container } from '@mantine/core';

export function MinecraftCard() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder w="100%">
      <Card.Section >
        <Container>
          
        </Container>
        <Image
          src="/assets/minecraft.webp"
          radius="md"
          h="100%"
          w="100%"
          maw = {300}
          mah={300}
          />
    
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Minecraft Server</Text>
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