import { describe, it, expect } from 'vitest';
import { IconUsers } from '@tabler/icons-react';
import { render } from '../../test/helpers/test-utils';
import { IconTile } from './IconTile';
import { THUMBNAIL_SIZE } from './CompactCard';

describe('IconTile', () => {
  it('should render a decorative square tile the size of a card thumbnail', () => {
    const { container } = render(<IconTile icon={IconUsers} />);

    // MantineProvider injects <style> siblings, so find the tile itself.
    const tile = container.querySelector<HTMLElement>('div[aria-hidden="true"]')!;
    expect(tile).toBeInTheDocument();
    expect(tile.style.width).toBe(`${THUMBNAIL_SIZE}px`);
    expect(tile.style.height).toBe(`${THUMBNAIL_SIZE}px`);
    expect(tile.querySelector('svg')).toBeInTheDocument();
  });
});
