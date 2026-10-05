import type { Icon } from '@tabler/icons-react';
import { THUMBNAIL_SIZE } from './CompactCard';
import { colors } from '../../theme';

interface IconTileProps {
  icon: Icon;
  'data-testid'?: string;
}

/** Decorative icon on a tinted square — the thumbnail for cards that have no image. */
export function IconTile({ icon: TileIcon, 'data-testid': testId }: IconTileProps) {
  return (
    <div
      data-testid={testId}
      aria-hidden="true"
      style={{
        width: THUMBNAIL_SIZE,
        height: THUMBNAIL_SIZE,
        minWidth: THUMBNAIL_SIZE,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.brand.primarySubtle,
        borderRadius: 'var(--mantine-radius-md)',
      }}
    >
      <TileIcon size={32} color={colors.brand.primary} />
    </div>
  );
}
