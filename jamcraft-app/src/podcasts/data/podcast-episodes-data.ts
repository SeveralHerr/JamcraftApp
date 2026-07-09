import { PodcastEpisode } from '../entities/PodcastEpisode';

/**
 * Podcast guest appearances, newest first.
 * To add an episode, append an object here — no other changes needed.
 */
export const PODCAST_EPISODES_DATA: PodcastEpisode[] = [
  {
    id: 'tlc-more-minds-better-code',
    showName: 'The Learning Curve',
    episodeTitle: 'More Minds, Better Code: Teamwork in the Age of AI',
    description:
      'With Arthur Morrow of Flexion, on ensembling and AI-native development — how navigator and driver roles evolve with AI as a third team member, and why putting more minds around the AI produces better code than solo prompting.',
    artworkUrl: 'https://img.youtube.com/vi/-y5Bg8EzOPQ/hqdefault.jpg',
    episodeUrl: 'https://www.youtube.com/watch?v=-y5Bg8EzOPQ',
    publishedYear: 2026,
  },
  {
    id: 'mms-ai-and-the-ensemble',
    showName: 'The Mob Mentality Show',
    episodeTitle:
      "AI and the Ensemble: Mob Programming's New Frontier with James Herr and Woody Zuill",
    description:
      'How AI and mob programming intersect — why ensemble collaboration becomes more critical, not less, as AI handles code generation. Covers practical patterns like "plate spinning" with multiple AI agents and using unit tests as AI guardrails.',
    artworkUrl: '/assets/mob-mentality-show.jpg',
    episodeUrl:
      'https://mobmentalityshow.podbean.com/e/ai-and-the-ensemble-mob-programmings-new-frontier-with-james-herr-and-woody-zuill/',
    publishedYear: 2026,
  },
  {
    id: 'mms-hot-sauce-ensemble',
    showName: 'The Mob Mentality Show',
    episodeTitle:
      'Mob Programming a Video Game with AI (and Escalating Hot Sauce) with James Herr and Woody Zuill',
    description:
      'The "Hot Sauce Ensemble": mob programming a video game from scratch in Godot with an AI coding agent, while eating escalating hot sauces every three-minute rotation. Player movement, landing explosions, and physics-based bell pepper enemies — built live.',
    artworkUrl: '/assets/mob-mentality-show.jpg',
    episodeUrl:
      'https://mobmentalityshow.podbean.com/e/mob-programming-a-video-game-with-ai-and-escalating-hot-sauce-with-james-herr-and-woody-zuill/',
    publishedYear: 2026,
  },
  {
    id: 'mms-software-teaming-age-of-ai',
    showName: 'The Mob Mentality Show',
    episodeTitle:
      'Software Teaming in the Age of AI with James Herr and Woody Zuill',
    description:
      'Where mob programming fits when AI writes the code and the team is barely touching the keyboard. AI removes code as a barrier to participation — making the ensemble more important than ever.',
    artworkUrl: 'https://img.youtube.com/vi/d9i2xErfQEg/hqdefault.jpg',
    episodeUrl: 'https://www.youtube.com/watch?v=d9i2xErfQEg',
    publishedYear: 2026,
  },
  {
    id: 'mms-mob-anti-patterns',
    showName: 'The Mob Mentality Show',
    episodeTitle:
      'Mob Anti-Patterns Explained: Fly on the Wall, Runaway Driver, and More with James Herr',
    description:
      'The anti-patterns that quietly erode collaboration, learning, and flow in ensembles — the "Fly on the Wall", the "Runaway Driver", the "Knee-High Navigator" — and practical techniques to recognize and fix them.',
    artworkUrl: 'https://img.youtube.com/vi/NxLor73Rgds/hqdefault.jpg',
    episodeUrl: 'https://www.youtube.com/watch?v=NxLor73Rgds',
    publishedYear: 2025,
  },
];
