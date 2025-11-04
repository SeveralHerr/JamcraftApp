import { Profile } from '../entities/Profile';
import { PROFILE_DATA } from '../data/profile-data';

export class GetProfile {
  execute(): Profile {
    return PROFILE_DATA;
  }
}
