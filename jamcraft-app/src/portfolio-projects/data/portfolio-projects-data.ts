import { PortfolioProject } from '../entities/PortfolioProject';

export const PORTFOLIO_PROJECTS_DATA: PortfolioProject[] = [
  {
    id: 'gather',
    name: 'Gather',
    description: 'Gather, craft, expand — a pixel-art survival game built in Godot.',
    screenshotUrl: '/assets/gather_cover.png',
    projectUrl: 'https://severalherr.itch.io/gather',
    platform: 'itch',
  },
  {
    id: 'godot-selftest-harness',
    name: 'Godot Self-Test Harness',
    description: 'Drive, inspect, and validate a running Godot 4.x game from the command line.',
    screenshotUrl: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
    projectUrl: 'https://github.com/SeveralHerr/godot-selftest-harness',
    platform: 'github',
  },
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
];
