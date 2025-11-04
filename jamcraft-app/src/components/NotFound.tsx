import { Container, Title, Text, Button, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ROUTES } from '../config/routes';

export function NotFound() {
  return (
    <Container size="sm" mt="xl">
      <Stack align="center" gap="md">
        <Title order={1}>404 - Page Not Found</Title>
        <Text c="dimmed" ta="center">
          The page you're looking for doesn't exist.
        </Text>
        <Button component={Link} to={ROUTES.home}>
          Go back home
        </Button>
      </Stack>
    </Container>
  );
}
