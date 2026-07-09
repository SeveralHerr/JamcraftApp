export interface Workshop {
  id: string;
  title: string;
  description: string;
  eventUrl: string;
  /** Human-readable date for display, e.g. 'June 2026'. */
  date: string;
  /** Numeric year used for sorting. */
  year: number;
  collaborators?: string[];
  format?: string;
}
