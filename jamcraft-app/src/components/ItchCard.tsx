import { Card, Image, Text, Button, Group, Container } from '@mantine/core';

export function ItchCard() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section h={250} w={400}>
        <Container>
          
        </Container>
        <Image
          src="/assets/itchLogo.png"
          h={250}
          w={444}
          alt="Itch"
        />
    
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Jamcraft's Gamejam</Text>
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