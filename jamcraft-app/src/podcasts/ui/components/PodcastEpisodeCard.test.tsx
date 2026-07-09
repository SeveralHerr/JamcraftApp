import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/helpers/test-utils';
import { PodcastEpisodeCard } from './PodcastEpisodeCard';
import { PodcastEpisode } from '../../entities/PodcastEpisode';

describe('PodcastEpisodeCard', () => {
  const episode: PodcastEpisode = {
    id: 'test-episode',
    showName: 'The Test Show',
    episodeTitle: 'A Great Episode',
    description: 'An episode about testing.',
    artworkUrl: '/assets/test-artwork.jpg',
    episodeUrl: 'https://example.com/episode',
    publishedYear: 2026,
  };

  it('should render show name, episode title, and description', () => {
    render(<PodcastEpisodeCard episode={episode} />);

    expect(screen.getByText(/The Test Show/)).toBeInTheDocument();
    expect(screen.getByText('A Great Episode')).toBeInTheDocument();
    expect(screen.getByText('An episode about testing.')).toBeInTheDocument();
  });

  it('should link out to the episode URL', () => {
    render(<PodcastEpisodeCard episode={episode} />);

    const link = screen.getByRole('link', { name: /listen \/ watch/i });
    expect(link).toHaveAttribute('href', 'https://example.com/episode');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('should use noopener and noreferrer on the external link', () => {
    render(<PodcastEpisodeCard episode={episode} />);

    const link = screen.getByRole('link', { name: /listen \/ watch/i });
    expect(link.getAttribute('rel')).toContain('noopener');
    expect(link.getAttribute('rel')).toContain('noreferrer');
  });

  it('should show the published year when provided', () => {
    render(<PodcastEpisodeCard episode={episode} />);
    expect(screen.getByText('2026')).toBeInTheDocument();
  });

  it('should render artwork with a descriptive alt text', () => {
    render(<PodcastEpisodeCard episode={episode} />);

    const image = screen.getByRole('img', {
      name: /the test show episode artwork/i,
    });
    expect(image).toHaveAttribute('src', '/assets/test-artwork.jpg');
  });
});
