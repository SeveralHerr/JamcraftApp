import { Card as MantineCard, CardProps as MantineCardProps } from '@mantine/core';
import { useState } from 'react';
import { colors, shadows, transitions } from '../../theme';

interface CardProps extends MantineCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  hover?: boolean;
  variant?: 'default' | 'glass';
}

/**
 * Unified Card Component
 * Consistent hover behavior, shadows, and transitions
 */
export function Card({ children, onClick, hover = true, variant = 'default', ...props }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = {
    background: variant === 'glass' ? colors.background.glass : colors.background.card,
    border: `1px solid ${isHovered && hover ? colors.border.hover : colors.border.primary}`,
    backdropFilter: variant === 'glass' ? 'blur(20px)' : 'none',
    transition: transitions.default,
    cursor: onClick ? 'pointer' : 'default',
    transform: isHovered && hover ? 'translateY(-3px)' : 'translateY(0)',
    boxShadow: isHovered && hover ? shadows.cardHover : shadows.none,
    position: 'relative' as const,
  };

  return (
    <MantineCard
      shadow="none"
      padding="xl"
      radius="lg"
      {...props}
      style={{
        ...baseStyles,
        ...props.style,
      }}
      onClick={onClick}
      onMouseEnter={() => hover && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </MantineCard>
  );
}
