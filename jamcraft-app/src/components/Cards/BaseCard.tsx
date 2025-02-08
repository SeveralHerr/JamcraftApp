import { Card, Image, Text, Button, Group, Box } from '@mantine/core';

interface BaseCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export function BaseCard({ 
  imageSrc, 
  imageAlt, 
  title, 
  description, 
  buttonText = "Join",
  onButtonClick 
}: BaseCardProps) {
  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder 
      w="100%"
      maw={300}
      style={{ 
        backgroundColor: '#1a2733',
        borderColor: '#2a3740',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Card.Section>
        <Image
          src={imageSrc}
          radius="md"
          h="100%"
          w="100%"
          maw={300}
          mah={300}
          fit="contain"
          alt={imageAlt}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500} c="#00abf0">{title}</Text>
      </Group>

      <Text 
        size="sm" 
        c="gray.4" 
        ta="left"
        
        lineClamp={12}
      >
        {description}
      </Text>

      <Box style={{ marginTop: 'auto', paddingTop: '1rem' }}>
        <Button 
          fullWidth 
          radius="md"
          onClick={onButtonClick}
          style={{
            backgroundColor: '#00abf0',
            color: '#081b29',
            fontWeight: 800,
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </Card>
  );
} 