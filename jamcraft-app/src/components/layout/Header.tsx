import { AppShell, Group, Burger, Image } from '@mantine/core';
import { SECTIONS } from '../../config/sections';
import { useActiveSection } from '../../hooks/useActiveSection';
import { NavAnchor } from './NavAnchor';
import { colors } from '../../theme';

const SECTION_IDS = SECTIONS.map((section) => section.id);

interface HeaderProps {
  navOpened: boolean;
  onToggleNav: () => void;
}

/**
 * Sticky frosted-glass header with in-page anchor navigation and scroll-spy.
 */
export function Header({ navOpened, onToggleNav }: HeaderProps) {
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <AppShell.Header
      style={{
        backdropFilter: 'blur(10px)',
        backgroundColor: colors.background.header,
        borderBottom: `1px solid ${colors.border.primary}`,
      }}
    >
      <Group h="100%" px="lg">
        <Burger
          opened={navOpened}
          onClick={onToggleNav}
          hiddenFrom="sm"
          h={45}
          aria-label="Toggle navigation"
          className="focus-ring"
        />
        <Group justify="space-between" style={{ flex: 1 }}>
          <a
            href="#home"
            aria-label="Back to top"
            className="focus-ring"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Image
              src="/assets/logo_server_icon_small_transparent_no_bkg.png"
              alt="Jamcraft Logo"
              h={48}
              w="auto"
              fit="contain"
            />
          </a>
          <Group ml="xl" gap={0} visibleFrom="sm">
            {SECTIONS.map((section) => (
              <NavAnchor
                key={section.id}
                href={`#${section.id}`}
                active={activeSection === section.id}
              >
                {section.label}
              </NavAnchor>
            ))}
          </Group>
        </Group>
      </Group>
    </AppShell.Header>
  );
}
