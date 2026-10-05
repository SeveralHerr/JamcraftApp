import { Title, Text } from '@mantine/core';
import { colors, typography } from '../../theme';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function PageHeader({ title, subtitle, align = 'left' }: PageHeaderProps) {
  return (
    <div
      style={{
        animation: 'fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) both',
        textAlign: align,
        maxWidth: align === 'center' ? '900px' : undefined,
        margin: align === 'center' ? '0 auto' : undefined,
      }}
    >
      <Title
        order={2}
        c={colors.text.primary}
        style={{
          fontSize: typography.fontSize['4xl'],
          fontWeight: typography.fontWeight.bold,
          textTransform: 'uppercase',
          letterSpacing: typography.letterSpacing.tighter,
          lineHeight: typography.lineHeight.tight,
          marginBottom: '0.75rem',
        }}
      >
        {title}
      </Title>
      <div
        data-testid="page-header-accent"
        aria-hidden="true"
        style={{
          width: 48,
          height: 3,
          borderRadius: 2,
          background: colors.brand.primary,
          margin: align === 'center' ? '0 auto' : undefined,
          marginBottom: subtitle ? '1rem' : 0,
        }}
      />
      {subtitle && (
        <Text
          c={colors.text.dimmed}
          style={{
            fontSize: typography.fontSize.lg,
            lineHeight: typography.lineHeight.relaxed,
          }}
        >
          {subtitle}
        </Text>
      )}
    </div>
  );
}
