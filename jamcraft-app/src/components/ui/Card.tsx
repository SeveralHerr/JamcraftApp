import { Card as MantineCard, CardProps as MantineCardProps } from '@mantine/core';
import { colors, transitions } from '../../theme';
import styles from './Card.module.css';

interface CardProps extends MantineCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  hover?: boolean;
  variant?: 'default' | 'glass';
}

/**
 * Unified Card Component
 * Consistent hover/focus behavior (Card.module.css), borders and transitions.
 */
export function Card({ children, onClick, hover = true, variant = 'default', className, ...props }: CardProps) {
  return (
    <MantineCard
      shadow="none"
      padding="xl"
      radius="lg"
      {...props}
      className={[styles.card, className].filter(Boolean).join(' ')}
      data-hover={hover}
      style={{
        background: variant === 'glass' ? colors.background.glass : colors.background.card,
        border: `1px solid ${colors.border.primary}`,
        backdropFilter: variant === 'glass' ? 'blur(20px)' : 'none',
        transition: transitions.default,
        cursor: onClick ? 'pointer' : 'inherit',
        position: 'relative',
        ...props.style,
      }}
      onClick={onClick}
    >
      {children}
    </MantineCard>
  );
}
