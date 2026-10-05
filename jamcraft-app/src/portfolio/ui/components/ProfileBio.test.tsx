import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/helpers/test-utils';
import { ProfileBio } from './ProfileBio';
import { Profile } from '../../entities/Profile';

const profile: Profile = {
  id: 'test',
  fullName: 'Test Person',
  title: 'Engineer',
  bio: 'I build things.',
  quote: '"Keep going."',
  quoteAuthor: 'Someone',
  profileImagePath: '/assets/test.png',
};

describe('ProfileBio', () => {
  it('should render the bio text', () => {
    render(<ProfileBio profile={profile} />);

    expect(screen.getByText('I build things.')).toBeInTheDocument();
  });

  it('should render the quote with its author', () => {
    render(<ProfileBio profile={profile} />);

    expect(screen.getByText(/"Keep going\." ― Someone/)).toBeInTheDocument();
  });
});
