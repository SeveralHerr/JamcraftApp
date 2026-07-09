import { SpeakingEngagement } from '../entities/SpeakingEngagement';

/**
 * Conference talks and panel appearances, newest first.
 * To add an engagement, append an object here — no other changes needed.
 */
export const SPEAKING_ENGAGEMENTS_DATA: SpeakingEngagement[] = [
  {
    id: 'exploreddd-2026-software-teaming-and-ai',
    title: 'Advanced Software Teaming and AI: Thinking Together in the Age of Intelligent Tools',
    description:
      'A hands-on session with Woody Zuill exploring how to integrate AI into whole-team development without sacrificing flow, domain clarity, or shared understanding.',
    eventName: 'Explore DDD 2026',
    location: 'Denver, CO',
    eventUrl: 'https://exploreddd.com/schedule/',
    date: 'September 2026',
    year: 2026,
    format: 'Hands-On Session',
    collaborators: ['Woody Zuill'],
  },
  {
    id: 'sfdevs-ai-assisted-software-development',
    title: 'AI Assisted Software Development',
    description:
      'A developer panel on using AI in software development, alongside Trevor Arnold, Max Feige, and John Franti.',
    eventName: 'SFDevs',
    location: 'Sioux Falls, SD',
    eventUrl: 'https://www.meetup.com/sfdevs/',
    date: 'February 2026',
    year: 2026,
    format: 'Panel Discussion',
    collaborators: ['Trevor Arnold', 'Max Feige', 'John Franti'],
  },
];
