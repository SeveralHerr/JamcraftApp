import type { SocialLink } from '../entities/SocialLink';

export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', handle: 'james-herr', url: 'https://www.linkedin.com/in/james-herr-63b85b1b3/', icon: 'in' },
  { label: 'GitHub', handle: 'SeveralHerr', url: 'https://github.com/SeveralHerr', icon: 'gh' },
  { label: 'itch.io', handle: 'jamcraft.io', url: 'https://jamcraft.itch.io', icon: 'itch' },
  { label: 'YouTube', handle: '@jamcraft', url: 'https://youtube.com/@jamcraft', icon: 'yt' },
  { label: 'Bluesky', handle: '@jamcraft.bsky.social', url: 'https://bsky.app/profile/jamcraft.bsky.social', icon: 'bsky' },
  { label: 'Email', handle: 'several.herr@gmail.com', url: 'mailto:several.herr@gmail.com', icon: 'mail' },
];
