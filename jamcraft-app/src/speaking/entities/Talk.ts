export type TalkKind = 'Podcast' | 'Talk';

export interface Talk {
  id: string;
  title: string;
  venue: string;
  kind: TalkKind;
  date: string;
  length: string;
  blurb: string;
}
