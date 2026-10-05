export interface Profile {
  id: string;
  fullName: string;
  title: string;
  /** Bio paragraphs, rendered in order. */
  bio: string[];
  quote: string;
  quoteAuthor: string;
  profileImagePath: string;
}
