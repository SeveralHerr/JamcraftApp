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

    it('should let the browser follow the link natively (no click hijacking)', () => {
      const open = vi.spyOn(window, 'open');
      render(<SocialLinkIcon socialLink={link} />);

      const notPrevented = fireEvent.click(screen.getByRole('link', { name: link.ariaLabel }));

      expect(notPrevented).toBe(true);
      expect(open).not.toHaveBeenCalled();
    });

    it('should not render a link for an unsafe URL', () => {
      render(<SocialLinkIcon socialLink={{ ...link, url: 'javascript:alert(1)' }} />);

      expect(screen.queryByRole('link')).not.toBeInTheDocument();
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
