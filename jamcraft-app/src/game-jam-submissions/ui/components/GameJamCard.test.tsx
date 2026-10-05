import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/helpers/test-utils';
import { GameJamCard } from './GameJamCard';
import { GameJamSubmission } from '../../entities/GameJamSubmission';

const submission: GameJamSubmission = {
  id: 'test-game',
  name: 'Test Game',
  description: 'A jam game.',
  coverImageUrl: 'https://img.itch.zone/test.png',
  gameUrl: 'https://severalherr.itch.io/test-game',
  jamName: 'Juice Jam II',
  jamYear: 2023,
};

describe('GameJamCard', () => {
  it('should be a keyboard-focusable secure link to the game', () => {
    render(<GameJamCard submission={submission} />);

    const link = screen.getByRole('link', { name: 'Test Game' });
    expect(link).toHaveAttribute('href', submission.gameUrl);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link.getAttribute('rel')).toContain('noreferrer');
  });

  it('should label the jam with its year', () => {
    render(<GameJamCard submission={submission} />);

    expect(screen.getByText('Juice Jam II · 2023')).toBeInTheDocument();
  });
});
