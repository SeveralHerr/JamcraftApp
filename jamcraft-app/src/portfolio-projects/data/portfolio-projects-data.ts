import { PortfolioProject } from '../entities/PortfolioProject';

export const PORTFOLIO_PROJECTS_DATA: PortfolioProject[] = [
  {
    id: 'jamcraft-app',
    name: 'Jamcraft',
    description:
      'Personal portfolio and community hub for James Herr - Full Stack Engineer & Game Developer',
    screenshotUrl: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
    projectUrl: 'https://github.com/SeveralHerr/JamcraftApp',
    platform: 'github',
  },
  {
    id: 'atomic-robot',
    name: 'Atomic Robot',
    description:
      'BETA - Built for Atomic Robot Tattoo — punch meter maids, dodge tickets, and defend free parking.',
    screenshotUrl: 'https://img.itch.zone/aW1nLzIzNTk4MjQ3LnBuZw==/315x250%23c/UeX2lG.png',
    projectUrl: 'https://severalherr.itch.io/atomic-robot',
    platform: 'itch',
  },
  {
    id: 'find-my-wiener',
    name: 'Find My Wiener',
    description:
      "Embark on a ridiculous hunt for your runaway wiener across sprawling hand-drawn worlds, sling poop, trigger explosive power-ups, uncover silly secrets, and climb the leaderboards to prove you're the ultimate wiener wrangler.",
    screenshotUrl:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2870660/4a1d4604061b7ee260d4e34a88528907b1d0720f/header.jpg?t=1755815646',
    projectUrl: 'https://store.steampowered.com/app/2870660/Find_My_Wiener/',
    platform: 'steam',
    isNSFW: true,
  },
];
