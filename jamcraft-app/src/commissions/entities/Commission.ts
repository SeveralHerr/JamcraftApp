export interface CommissionImage {
  src: string;
  alt: string;
  /** Intrinsic size, so the browser reserves space before the image loads. */
  width: number;
  height: number;
}

export interface CommissionMedia {
  kind: 'image' | 'video';
  src: string;
  alt: string;
  caption: string;
  /** Still frame shown before a video is played. */
  posterSrc?: string;
}

export interface CommissionLink {
  label: string;
  url: string;
}

export interface Commission {
  id: string;
  client: string;
  title: string;
  summary: string;
  year: number;
  /** Short highlight shown above the title, e.g. 'First local commission'. */
  badge?: string;
  role: string;
  deliverables: string;
  heroImage: CommissionImage;
  media: CommissionMedia[];
  links: CommissionLink[];
}
