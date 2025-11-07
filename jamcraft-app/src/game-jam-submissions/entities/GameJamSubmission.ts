export interface GameJamSubmission {
  id: string;
  name: string;
  description: string;
  coverImageUrl: string;
  gameUrl: string;
  jamName: string;
  jamYear?: number;
  theme?: string;
}
