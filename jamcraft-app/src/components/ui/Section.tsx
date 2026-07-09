import { Container } from '@mantine/core';
import { PageHeader } from './PageHeader';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { spacing, headerHeight, containerSizes } from '../../theme';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

/**
 * Page section wrapper for the single-page layout.
 * Provides the anchor target (with scroll offset for the sticky header),
 * consistent vertical rhythm, and an entrance animation that respects
 * the user's reduced-motion preference.
 */
export function Section({ id, title, subtitle, children }: SectionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id={id}
      style={{
        scrollMarginTop: headerHeight.desktop,
        padding: `${spacing['3xl']} 0`,
        animation: reducedMotion
          ? 'none'
          : 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both',
      }}
    >
      <Container size={containerSizes.lg} px="lg">
        {title && (
          <div style={{ marginBottom: spacing['2xl'] }}>
            <PageHeader title={title} subtitle={subtitle} />
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
