import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/helpers/test-utils';
import { CommissionShowcase } from './CommissionShowcase';
import { Commission } from '../../entities/Commission';

const commission: Commission = {
  id: 'test',
  client: 'Test Shop',
  title: 'Test Cabinet',
  summary: 'A cabinet with two games.',
  year: 2026,
  badge: 'First local commission',
  role: 'Design and development',
  deliverables: '2 games',
  heroImage: { src: '/assets/hero.webp', alt: 'Hero photo', width: 1200, height: 976 },
  media: [
    { kind: 'video', src: '/assets/reel.mp4', posterSrc: '/assets/poster.webp', alt: 'Reel of the brawler', caption: 'Reel' },
    { kind: 'image', src: '/assets/photo.webp', alt: 'Pinball photo', caption: 'Pinball' },
  ],
  links: [
    { label: 'Play it', url: 'https://example.com/play' },
    { label: 'Bad link', url: 'javascript:alert(1)' },
  ],
};

describe('CommissionShowcase', () => {
  it('renders the title as an h3 with summary and facts', () => {
    render(<CommissionShowcase commission={commission} />);

    expect(screen.getByRole('heading', { level: 3, name: 'Test Cabinet' })).toBeInTheDocument();
    expect(screen.getByText('A cabinet with two games.')).toBeInTheDocument();
    expect(screen.getByText('Test Shop')).toBeInTheDocument();
    expect(screen.getByText('First local commission · 2026')).toBeInTheDocument();
  });

  it('reserves the hero image size to avoid layout shift', () => {
    render(<CommissionShowcase commission={commission} />);

    const hero = screen.getByAltText('Hero photo');
    expect(hero).toHaveAttribute('width', '1200');
    expect(hero).toHaveAttribute('height', '976');
    // Below the fold on first load, so it must not compete with the hero section.
    expect(hero).toHaveAttribute('loading', 'lazy');
  });

  it('renders the reel as a click-to-play video that does not preload', () => {
    render(<CommissionShowcase commission={commission} />);

    const video = screen.getByLabelText('Reel of the brawler');
    expect(video.tagName).toBe('VIDEO');
    expect(video).toHaveAttribute('controls');
    expect(video).toHaveAttribute('preload', 'none');
    expect(video).toHaveAttribute('poster', '/assets/poster.webp');
    expect(video).not.toHaveAttribute('autoplay');
  });

  it('renders photos lazily with captions', () => {
    render(<CommissionShowcase commission={commission} />);

    expect(screen.getByAltText('Pinball photo')).toHaveAttribute('loading', 'lazy');
    expect(screen.getByText('Pinball')).toBeInTheDocument();
  });

  it('renders only https links, opening safely in a new tab', () => {
    render(<CommissionShowcase commission={commission} />);

    const link = screen.getByRole('link', { name: /Play it/ });
    expect(link).toHaveAttribute('href', 'https://example.com/play');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.queryByText('Bad link')).not.toBeInTheDocument();
  });
});
