import { CommunityChannel } from '../entities/CommunityChannel';

export const COMMUNITY_CHANNELS_DATA: CommunityChannel[] = [
  {
    id: 'discord',
    name: 'Discord',
    type: 'community',
    description: 'Connect with gamers, devs, IT pros, and hobbyists. Learn, share, and have fun! Plus, check out our Minecraft server and get the latest Jamcraft news.',
    imageSrc: '/assets/discord.gif',
    imageAlt: 'Discord',
    externalUrl: 'https://discord.gg/WVB8EwSNDG',
    isActive: true,
  },
  {
    id: 'twitch',
    name: 'Twitch',
    type: 'streaming',
    description: 'Join our live streams where we dive into collaborative game development and mob programming. Watch as we code together, share tips, and bring new learners from our Discord into the process!',
    imageSrc: '/assets/twitch.gif',
    imageAlt: 'Twitch',
    externalUrl: 'https://www.twitch.tv/mrseveral',
    isActive: true,
  },
  {
    id: 'itch-gamejam',
    name: 'Gamejam',
    type: 'gaming',
    description: 'Check out if we have any upcoming gamejams!',
    imageSrc: '/assets/itchLogo.png',
    imageAlt: 'Itch.io',
    externalUrl: 'https://itch.io/search?type=jams&q=jamcraft',
    isActive: true,
  },
];
