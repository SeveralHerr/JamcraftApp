import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/helpers/test-utils';
import { JamcraftInvite } from './JamcraftInvite';
import { EXTERNAL_LINKS } from '../../../config/routes';

describe('JamcraftInvite', () => {
  it('should render the Jamcraft logo and invite text', () => {
    render(<JamcraftInvite />);

    expect(screen.getByRole('img', { name: /jamcraft logo/i })).toBeInTheDocument();
    expect(screen.getByText('Join the Jamcraft Discord')).toBeInTheDocument();
  });

  it('should link to the Discord invite URL', () => {
    render(<JamcraftInvite />);

    const link = screen.getByRole('link', { name: /join the jamcraft discord server/i });
    expect(link).toHaveAttribute('href', EXTERNAL_LINKS.discord);
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('should use noopener and noreferrer on the external link', () => {
    render(<JamcraftInvite />);

    const link = screen.getByRole('link', { name: /join the jamcraft discord server/i });
    expect(link.getAttribute('rel')).toContain('noopener');
    expect(link.getAttribute('rel')).toContain('noreferrer');
  });
});
