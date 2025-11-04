import { Container } from '@mantine/core';
import { LoadingSpinner } from './LoadingSpinner';
import { colors, spacing, typography } from '../../theme';

interface LoadingPageProps {
  message?: string;
}

export function LoadingPage({ message = 'Loading...' }: LoadingPageProps) {
  return (
    <Container size="lg" py="xl">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          gap: spacing.lg,
        }}
      >
        <LoadingSpinner size={48} />
        <p
          style={{
            color: colors.text.dimmed,
            fontSize: typography.fontSize.lg,
            letterSpacing: typography.letterSpacing.wide,
            margin: 0,
          }}
        >
          {message}
        </p>
      </div>
    </Container>
  );
}
