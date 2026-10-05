import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/helpers/test-utils';
import { ProfileImage } from './ProfileImage';
import { PROFILE_DATA } from '../../data/profile-data';

describe('ProfileImage', () => {
  it('should render the portrait with descriptive alt text', () => {
    render(<ProfileImage profile={PROFILE_DATA} />);

    const img = screen.getByRole('img', { name: 'James Herr Profile' });
    expect(img).toHaveAttribute('src', PROFILE_DATA.profileImagePath);
  });

  it('should declare intrinsic dimensions so layout does not shift on load', () => {
    render(<ProfileImage profile={PROFILE_DATA} />);

    const img = screen.getByRole('img', { name: 'James Herr Profile' });
    expect(img).toHaveAttribute('width');
    expect(img).toHaveAttribute('height');
  });

  it('should serve the compressed WebP portrait', () => {
    expect(PROFILE_DATA.profileImagePath).toMatch(/\.webp$/);
  });
});
