import { colors, transitions, typography } from '../../theme';

interface NavAnchorProps {
  href: string;
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

/**
 * In-page navigation anchor for the single-page layout.
 * Highlights when its target section is active (scroll-spy).
 */
export function NavAnchor({ href, active = false, onClick, children }: NavAnchorProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="focus-ring"
      aria-current={active ? 'true' : undefined}
      style={{
        display: 'block',
        padding: 'var(--mantine-spacing-xs) var(--mantine-spacing-md)',
        borderRadius: 'var(--mantine-radius-md)',
        fontWeight: typography.fontWeight.medium,
        fontSize: typography.fontSize.sm,
        color: active ? colors.brand.primary : colors.text.primary,
        textDecoration: 'none',
        borderBottom: `2px solid ${active ? colors.brand.primary : 'transparent'}`,
        transition: transitions.default,
      }}
    >
      {children}
    </a>
  );
}
