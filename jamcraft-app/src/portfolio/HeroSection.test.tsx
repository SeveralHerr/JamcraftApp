import { describe, it, expect } from 'vitest';
import { render, screen } from '../test/helpers/test-utils';
import { HeroSection } from './HeroSection';
import { PROFILE_DATA } from './data/profile-data';
import { SOCIAL_LINKS_DATA } from '../social-presence/data/social-links-data';

describe('HeroSection', () => {
  it('should render the name as the page h1', () => {
    render(<HeroSection />);

    expect(screen.getByRole('heading', { level: 1, name: PROFILE_DATA.fullName })).toBeInTheDocument();
  });

  it('should render every bio paragraph', () => {
    render(<HeroSection />);

    PROFILE_DATA.bio.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
  });

  it('should render the Jamcraft Discord invite and every social link', () => {
    render(<HeroSection />);

    expect(screen.getByRole('link', { name: /join the jamcraft discord server/i })).toBeInTheDocument();
    SOCIAL_LINKS_DATA.forEach((link) => {
      expect(screen.getByRole('link', { name: link.ariaLabel })).toBeInTheDocument();
    });
  });

  it('should offer a View Projects call to action pointing at #projects', () => {
    render(<HeroSection />);

    expect(screen.getByRole('link', { name: /view projects/i })).toHaveAttribute('href', '#projects');
  });
});
