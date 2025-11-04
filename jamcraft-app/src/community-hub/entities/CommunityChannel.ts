export type ChannelType = 'community' | 'streaming' | 'gaming';

export interface CommunityChannel {
  id: string;
  name: string;
  type: ChannelType;
  description: string;
  imageSrc: string;
  imageAlt: string;
  externalUrl: string;
  isActive: boolean;
}
