export type SocialPlatform =
  | 'linkedin'
  | 'steam'
  | 'bluesky'
  | 'youtube'
  | 'github'
  | 'itch';

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
  displayName: string;
  iconPath: string;
  ariaLabel: string;
}
