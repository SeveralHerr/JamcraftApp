import { Text } from '@mantine/core';
import { Profile } from '../../entities/Profile';
import { colors } from '../../../theme';

interface ProfileBioProps {
  profile: Profile;
}

export function ProfileBio({ profile }: ProfileBioProps) {
  return (
    <>
      {profile.bio.map((paragraph, index) => (
        <Text key={index} c="gray.5" ta="left" mt={index > 0 ? 'sm' : undefined}>
          {paragraph}
        </Text>
      ))}
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
