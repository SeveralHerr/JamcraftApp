import { useRef, type ReactNode, type ElementType } from 'react';
import { useInView } from '../hooks/useInView';

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function FadeUp({ children, delay = 0, as: As = 'div', className, style }: FadeUpProps) {
  const ref = useRef<Element>(null);
  const inView = useInView(ref);

  return (
    <As
      ref={ref}
      className={`fade-up${inView ? ' in' : ''}${className ? ` ${className}` : ''}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </As>
  );
}
