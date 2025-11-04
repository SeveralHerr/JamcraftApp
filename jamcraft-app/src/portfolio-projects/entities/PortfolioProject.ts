export type ProjectPlatform = 'github' | 'steam' | 'itch';

export interface PortfolioProject {
  id: string;
  name: string;
  description: string;
  screenshotUrl: string | null;
  projectUrl: string;
  platform: ProjectPlatform;
  isNSFW?: boolean;
}
