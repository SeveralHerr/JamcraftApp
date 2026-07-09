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

  it('should render episode title, show name, and published year', () => {
    render(<PodcastEpisodeCard episode={episode} />);

    expect(screen.getByText('A Great Episode')).toBeInTheDocument();
    expect(screen.getByText('The Test Show · 2026')).toBeInTheDocument();
  });

  it('should render only the show name when no published year is set', () => {
    render(<PodcastEpisodeCard episode={{ ...episode, publishedYear: undefined }} />);

    expect(screen.getByText('The Test Show')).toBeInTheDocument();
  });

  it('should link the whole card to the episode URL', () => {
    render(<PodcastEpisodeCard episode={episode} />);

    const link = screen.getByRole('link', { name: 'A Great Episode' });
    expect(link).toHaveAttribute('href', 'https://example.com/episode');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('should use noopener and noreferrer on the external link', () => {
    render(<PodcastEpisodeCard episode={episode} />);

    const link = screen.getByRole('link', { name: 'A Great Episode' });
    expect(link.getAttribute('rel')).toContain('noopener');
    expect(link.getAttribute('rel')).toContain('noreferrer');
  });

  it('should render artwork with a descriptive alt text', () => {
    render(<PodcastEpisodeCard episode={episode} />);

    const image = screen.getByRole('img', {
      name: /the test show episode artwork/i,
    });
    expect(image).toHaveAttribute('src', '/assets/test-artwork.jpg');
  });
});
