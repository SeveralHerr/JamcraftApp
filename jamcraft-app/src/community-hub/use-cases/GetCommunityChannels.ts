import { CommunityChannel } from '../entities/CommunityChannel';
import { COMMUNITY_CHANNELS_DATA } from '../data/channels-data';

export class GetCommunityChannels {
  execute(): CommunityChannel[] {
    // Business rule: Only return active channels
    return COMMUNITY_CHANNELS_DATA.filter(channel => channel.isActive);
  }
}
