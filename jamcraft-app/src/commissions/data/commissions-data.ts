import { Commission } from '../entities/Commission';

const ASSETS = '/assets/commissions';

export const COMMISSIONS_DATA: Commission[] = [
  {
    id: 'atomic-robot-arcade',
    client: 'Atomic Robot Tattoo',
    title: 'Atomic Robot arcade cabinet',
    summary:
      "A bartop arcade cabinet for Atomic Robot Tattoo in downtown Sioux Falls, loaded with two original games. Atomic Robot is a beat-'em-up where you pick one of the shop's artists, punch meter maids and defend free parking. Atomic Pinball is a pinball table themed on the shop. Walk in at 111 S Main Ave and play for free.",
    year: 2026,
    badge: 'First local commission',
    role: 'Game design and development',
    deliverables: '2 games on a custom bartop cabinet',
    heroImage: {
      src: `${ASSETS}/atomic-robot-handoff.webp`,
      alt: 'James and Ryan from Atomic Robot Tattoo beside the arcade cabinet, showing the fighter select screen',
      width: 1200,
      height: 976,
    },
    media: [
      {
        kind: 'video',
        src: `${ASSETS}/atomic-robot-reel.mp4`,
        posterSrc: `${ASSETS}/atomic-robot-reel-poster.webp`,
        alt: 'Reel of the Atomic Robot brawler, playing as the shop artists',
        caption: 'Reel · Brawler',
      },
      {
        kind: 'image',
        src: `${ASSETS}/atomic-robot-brawler.webp`,
        alt: 'Two people playing the brawler on the cabinet, one cheering',
        caption: 'Playtest at the shop',
      },
      {
        kind: 'image',
        src: `${ASSETS}/atomic-robot-pinball.webp`,
        alt: 'Someone playing Atomic Pinball on the cabinet',
        caption: 'Atomic Pinball',
      },
      {
        kind: 'image',
        src: `${ASSETS}/atomic-robot-fighter-select.webp`,
        alt: 'Close-up of the fighter select screen with Ryan selected',
        caption: 'Choose your fighter',
      },
    ],
    links: [
      { label: 'Play Atomic Robot on itch.io', url: 'https://severalherr.itch.io/atomic-robot' },
      { label: 'More reels on Instagram', url: 'https://www.instagram.com/severaljamesherr/' },
      { label: 'Atomic Robot Tattoo', url: 'https://www.instagram.com/atomicrobottattoo/' },
    ],
  },
];
