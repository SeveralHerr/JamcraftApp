export interface SpeakingEngagement {
  id: string;
  title: string;
  description: string;
  eventName: string;
  location: string;
  eventUrl: string;
  /** Human-readable date for display, e.g. 'September 2026'. */
  date: string;
  /** Numeric year used for sorting. */
  year: number;
  format: string;
  collaborators?: string[];
}
