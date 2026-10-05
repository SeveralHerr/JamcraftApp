import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/helpers/test-utils';
import { SocialLinkIcon } from './SocialLinkIcon';
import { SocialLink } from '../../entities/SocialLink';

const link: SocialLink = {
  id: 'github',
  platform: 'github',
  url: 'https://github.com/SeveralHerr',
  displayName: 'GitHub',
  iconPath: '/assets/brand-github.png',
  ariaLabel: 'View SeveralHerr on GitHub',
};

describe('SocialLinkIcon', () => {
  it('should render a secure external link with an accessible name', () => {
    render(<SocialLinkIcon socialLink={link} />);

    const anchor = screen.getByRole('link', { name: link.ariaLabel });
    expect(anchor).toHaveAttribute('href', link.url);
    expect(anchor).toHaveAttribute('target', '_blank');
    expect(anchor.getAttribute('rel')).toContain('noopener');
    expect(anchor.getAttribute('rel')).toContain('noreferrer');
  });

  it('should show the platform name as a hover tooltip', () => {
    render(<SocialLinkIcon socialLink={link} />);

    expect(screen.getByRole('link', { name: link.ariaLabel })).toHaveAttribute('title', 'GitHub');
  });
});
