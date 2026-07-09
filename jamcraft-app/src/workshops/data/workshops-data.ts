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
];
