import { SocialLink } from '../entities/SocialLink';
import { SOCIAL_LINKS_DATA } from '../data/social-links-data';

export class GetSocialLinks {
  execute(): SocialLink[] {
    return SOCIAL_LINKS_DATA;
  }
}
