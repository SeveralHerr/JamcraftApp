import { Text } from '@mantine/core';
import { Profile } from '../../entities/Profile';

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
        c="#f6940b"
        fs="italic"
        mt="md"
        style={{ borderLeft: '3px solid #f6940b', paddingLeft: '10px' }}
      >
        {profile.quote} ― {profile.quoteAuthor}
      </Text>
    </>
  );
}
