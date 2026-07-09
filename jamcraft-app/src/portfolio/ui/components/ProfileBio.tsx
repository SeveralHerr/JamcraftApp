import { Text } from '@mantine/core';
import { Profile } from '../../entities/Profile';
import { colors } from '../../../theme';

interface ProfileBioProps {
  profile: Profile;
}

export function ProfileBio({ profile }: ProfileBioProps) {
  return (
    <>
      <Text c="gray.5" ta="left">
        {profile.bio}
      </Text>
      <Text
        c={colors.brand.primary}
        fs="italic"
        mt="md"
        style={{ borderLeft: `3px solid ${colors.brand.primary}`, paddingLeft: '10px' }}
      >
        {profile.quote} ― {profile.quoteAuthor}
      </Text>
    </>
  );
}
