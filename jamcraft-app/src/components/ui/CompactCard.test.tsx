import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/helpers/test-utils';
import userEvent from '@testing-library/user-event';
import { CompactCard } from './CompactCard';

describe('CompactCard', () => {
  it('should render title and line', () => {
    render(<CompactCard title="My Card" line="A short line" />);

    expect(screen.getByText('My Card')).toBeInTheDocument();
    expect(screen.getByText('A short line')).toBeInTheDocument();
  });

  it('should render a thumbnail image with alt text', () => {
    render(<CompactCard title="My Card" imageUrl="/assets/thumb.jpg" imageAlt="Thumb alt" />);

    const image = screen.getByRole('img', { name: /thumb alt/i });
    expect(image).toHaveAttribute('src', '/assets/thumb.jpg');
  });

  it('should render a custom thumbnail node instead of an image', () => {
    render(<CompactCard title="My Card" thumbnail={<div data-testid="custom-thumb" />} />);

    expect(screen.getByTestId('custom-thumb')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('should render as a secure external link when href is set', () => {
    render(<CompactCard title="My Card" href="https://example.com/thing" />);

    const link = screen.getByRole('link', { name: 'My Card' });
    expect(link).toHaveAttribute('href', 'https://example.com/thing');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link.getAttribute('rel')).toContain('noopener');
    expect(link.getAttribute('rel')).toContain('noreferrer');
  });

  it('should not render a link when href is not set', () => {
    render(<CompactCard title="My Card" />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<CompactCard title="My Card" onClick={onClick} />);

    await user.click(screen.getByText('My Card'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
