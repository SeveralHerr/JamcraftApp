import { Workshop } from '../entities/Workshop';

/**
 * Workshops run or co-run by James, newest first.
 * To add a workshop, append an object here — no other changes needed.
 */
export const WORKSHOPS_DATA: Workshop[] = [
  {
    id: 'build-together-learn-together-ai-workshop',
    title: 'Build Together, Learn Together: An AI Workshop',
    description:
      'Co-run with Woody Zuill — instead of one person prompting an AI assistant, a small team explores together, making the AI part of the conversation rather than a replacement for it.',
    eventUrl:
      'https://www.eventbrite.com/e/build-together-learn-together-an-ai-workshop-tickets-1992132482883',
    date: 'June 2026',
    year: 2026,
    collaborators: ['Woody Zuill'],
    format: 'Free online workshop',
  },
  {
    id: 'software-teaming-and-ai-montreal',
    title: 'Software Teaming and AI: Thinking Together with AI',
    description:
      'Co-run with Woody Zuill for AI Agents Montreal — how software teaming (mob/ensemble programming) and AI complement each other, and where AI helps versus where it disrupts shared understanding.',
    eventUrl: 'https://www.meetup.com/ai-agent-montreal/events/314937910/',
    date: 'May 2026',
    year: 2026,
    collaborators: ['Woody Zuill'],
    format: 'Free online workshop',
  },
  {
    id: 'mobbing-and-ai-thinking-together',
    title: 'Mobbing and AI - Thinking Together with AI',
    description:
      'Co-run with Woody Zuill — an earlier run of the same conversation on where AI fits inside ensemble/mob programming, and where it helps versus disrupts shared understanding.',
    eventUrl:
      'https://www.eventbrite.com/e/mobbing-and-ai-thinking-together-with-ai-tickets-1968659211697',
    date: 'November 2025',
    year: 2025,
    collaborators: ['Woody Zuill'],
    format: 'Free online workshop',
  },
];
