import { SpeakingEngagement } from '../entities/SpeakingEngagement';

/**
 * Conference talks and panel appearances, newest first.
 * To add an engagement, append an object here — no other changes needed.
 */
export const SPEAKING_ENGAGEMENTS_DATA: SpeakingEngagement[] = [
  {
    id: 'agile-new-england-2026-software-teaming-and-ai',
    title: 'Software Teaming and AI, Thinking Together with AI',
    description:
      'A virtual keynote with Woody Zuill on how Software Teaming and AI complement each other to amplify learning, improve outcomes, and strengthen team alignment.',
    eventName: 'Agile New England',
    location: 'Virtual',
    eventUrl: 'https://agilenewengland.org/software-teaming-and-ai',
    date: 'October 2026',
    year: 2026,
    format: 'Keynote',
    collaborators: ['Woody Zuill'],
  },
  {
    id: 'siouxpercon-2026-siouxper-hot',
    title: 'Siouxper Hot: Creating The Unofficial Siouxpercon Game While Eating Hot Sauce',
    description:
      'A live Hot Sauce Ensemble on stage: building an unofficial SiouxperCon game together while eating increasingly unreasonable amounts of hot sauce.',
    eventName: 'SiouxperCon 2026',
    location: 'Sioux Falls, SD',
    eventUrl: 'https://www.siouxpercon.com/',
    date: 'September 2026',
    year: 2026,
    format: 'Live Game Dev Challenge',
  },
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
