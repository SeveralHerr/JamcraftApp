import { describe, it, expect, vi, afterEach } from 'vitest';
import { fireEvent } from '@testing-library/react';
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

  describe('interaction', () => {
    afterEach(() => vi.restoreAllMocks());

    it('should open the profile through the secure navigation service on click', () => {
      const open = vi.spyOn(window, 'open').mockImplementation(() => null);
      render(<SocialLinkIcon socialLink={link} />);

      fireEvent.click(screen.getByRole('link', { name: link.ariaLabel }));

      expect(open).toHaveBeenCalledWith(link.url, '_blank', expect.stringContaining('noopener'));
    });

    it('should tilt the icon on hover and reset on leave', () => {
      render(<SocialLinkIcon socialLink={link} />);
      const anchor = screen.getByRole('link', { name: link.ariaLabel });
      const icon = anchor.querySelector('img')!;

      fireEvent.mouseEnter(anchor);
      expect(icon.style.transform).toContain('scale(1.1)');

      fireEvent.mouseLeave(anchor);
      expect(icon.style.transform).toContain('scale(1)');
    });
  });
});
