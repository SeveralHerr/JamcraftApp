import { Card, Image, Text, Button, Group } from '@mantine/core';

export function DiscordCard() {
  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder 
      w="100%"
      style={{ 
        backgroundColor: '#1a2733', // Blended color between #081b29 and gray
        borderColor: '#2a3740'  // Slightly lighter border
      }}
    >
      <Card.Section>
        <Image       
          src="/assets/discord.gif"
          radius="md"
          h="100%"
          w="100%"
          maw={300}
          mah={300}
          fit="contain"
          alt="Discord"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500} c="white">Jamcraft Discord</Text>
      </Group>

      <Text size="sm" c="gray.4">
        Join today
      </Text>

      <Button 
        fullWidth 
        mt="md" 
        radius="md"
        style={{
          backgroundColor: '#00abf0', // Bright blue like the header
          color: '#081b29', // Dark blue text
          fontWeight: 800,
          letterSpacing: '0.1em',
          textTransform: 'uppercase'  // Optional: adds uppercase styling
        }}
      >
        Join
      </Button>
    </Card>
  );
}