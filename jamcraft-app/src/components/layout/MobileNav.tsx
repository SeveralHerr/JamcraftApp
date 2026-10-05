import { Divider, Stack } from '@mantine/core';
import { SECTIONS } from '../../config/sections';
import { NavAnchor } from './NavAnchor';
import { JamcraftInvite } from '../../portfolio/ui/components/JamcraftInvite';
import { colors } from '../../theme';

interface MobileNavProps {
  /** Called after a section link is chosen, so the drawer can close. */
  onNavigate: () => void;
}

/** Contents of the mobile navigation drawer: section links plus the Discord invite. */
export function MobileNav({ onNavigate }: MobileNavProps) {
  return (
    <Stack gap={4}>
      {SECTIONS.map((section) => (
        <NavAnchor key={section.id} href={`#${section.id}`} onClick={onNavigate}>
          {section.label}
        </NavAnchor>
      ))}
      <Divider color={colors.border.divider} my="md" />
      <div style={{ padding: '0 var(--mantine-spacing-md)' }}>
        <JamcraftInvite imageLoading="lazy" />
      </div>
    </Stack>
  );
}
