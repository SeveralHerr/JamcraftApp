import { Box, Image } from '@mantine/core';
import { Profile } from '../../entities/Profile';

interface ProfileImageProps {
  profile: Profile;
}

export function ProfileImage({ profile }: ProfileImageProps) {
  return (
    <Box style={{ maxWidth: 560, margin: '0 auto' }}>
      <Image
        src={profile.profileImagePath}
        w="100%"
        fit="contain"
        alt={`${profile.fullName} Profile`}
      />
    </Box>
  );
}
