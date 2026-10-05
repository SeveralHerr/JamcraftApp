import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/helpers/test-utils';
import { Footer } from './Footer';
import { EXTERNAL_LINKS } from '../../config/routes';
import { SOCIAL_LINKS_DATA } from '../../social-presence/data/social-links-data';

describe('Footer', () => {
  it('should be the #contact landmark', () => {
    const { container } = render(<Footer />);

    expect(container.querySelector('footer#contact')).toBeInTheDocument();
  });

  it('should link every social profile', () => {
    render(<Footer />);

    SOCIAL_LINKS_DATA.forEach((link) => {
      expect(screen.getByRole('link', { name: link.ariaLabel })).toHaveAttribute('href', link.url);
    });
  });

  it('should invite visitors to the Jamcraft Discord', () => {
    render(<Footer />);

    expect(
      screen.getByRole('link', { name: /join the jamcraft discord server/i }),
    ).toHaveAttribute('href', EXTERNAL_LINKS.discord);
  });

  it('should credit Jamcraft LLC in the copyright line', () => {
    render(<Footer />);

    expect(screen.getByText(/© \d{4} James Herr · Jamcraft LLC/)).toBeInTheDocument();
  });

  it('should lazy-load its images (the footer is always below the fold)', () => {
    const { container } = render(<Footer />);

    const images = [...container.querySelectorAll('img')];
    expect(images.length).toBeGreaterThan(0);
    images.forEach((img) => expect(img).toHaveAttribute('loading', 'lazy'));
  });
});
