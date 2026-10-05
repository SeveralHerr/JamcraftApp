import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/helpers/test-utils';
import { Card } from './Card';

describe('Card', () => {
  it('should inherit the cursor so link cards show a pointer', () => {
    render(<Card>Link card</Card>);

    expect(screen.getByText('Link card').closest('[data-hover]')).toHaveStyle({ cursor: 'inherit' });
  });

  it('should show a pointer when the card itself is clickable', () => {
    render(<Card onClick={vi.fn()}>Clickable</Card>);

    expect(screen.getByText('Clickable').closest('[data-hover]')).toHaveStyle({ cursor: 'pointer' });
  });

  it.each([true, false])('should expose hover=%s to the stylesheet', (hover) => {
    render(<Card hover={hover}>Card</Card>);

    expect(screen.getByText('Card').closest('[data-hover]')).toHaveAttribute('data-hover', String(hover));
  });
});
