import { Component, ErrorInfo, ReactNode } from 'react';
import { Container, Title, Text, Button, Stack } from '@mantine/core';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Container size="sm" mt="xl">
          <Stack align="center" gap="md">
            <Title order={1}>Oops! Something went wrong</Title>
            <Text c="dimmed" ta="center">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </Text>
            {this.state.error && (
              <Text size="sm" c="red" ta="center" ff="monospace">
                {this.state.error.message}
              </Text>
            )}
            <Button onClick={this.handleReset}>
              Try again
            </Button>
          </Stack>
        </Container>
      );
    }

    return this.props.children;
  }
}
