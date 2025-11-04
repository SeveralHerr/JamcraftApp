import { SocialLink } from '../entities/SocialLink';

export const SOCIAL_LINKS_DATA: SocialLink[] = [
  {
    id: 'linkedin',
    platform: 'linkedin',
    url: 'https://www.linkedin.com/in/james-herr-63b85b1b3/',
    displayName: 'LinkedIn',
    iconPath: '/assets/brand-linkedin.png',
    ariaLabel: 'Visit James Herr on LinkedIn',
  },
  {
    id: 'steam',
    platform: 'steam',
    url: 'https://steamcommunity.com/id/MrSeveral/',
    displayName: 'Steam',
    iconPath: '/assets/brand-steam.png',
    ariaLabel: 'Visit MrSeveral on Steam',
  },
  {
    id: 'bluesky',
    platform: 'bluesky',
    url: 'https://bsky.app/profile/jamesherr.bsky.social',
    displayName: 'Bluesky',
    iconPath: '/assets/brand-bluesky.png',
    ariaLabel: 'Follow James Herr on Bluesky',
  },
  {
    id: 'youtube',
    platform: 'youtube',
    url: 'https://www.youtube.com/@Jamcraft_Several',
    displayName: 'YouTube',
    iconPath: '/assets/brand-youtube.png',
    ariaLabel: 'Subscribe to Jamcraft on YouTube',
  },
  {
    id: 'github',
    platform: 'github',
    url: 'https://github.com/SeveralHerr',
    displayName: 'GitHub',
    iconPath: '/assets/brand-github.png',
    ariaLabel: 'View SeveralHerr on GitHub',
  },
  {
    id: 'itch',
    platform: 'itch',
    url: 'https://severalherr.itch.io/',
    displayName: 'Itch.io',
    iconPath: '/assets/brand-itch.png',
    ariaLabel: 'Play games by SeveralHerr on Itch.io',
  },
];
