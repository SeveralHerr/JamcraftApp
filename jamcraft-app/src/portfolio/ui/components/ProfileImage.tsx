import { Box, Image } from '@mantine/core';
import { Profile } from '../../entities/Profile';

interface ProfileImageProps {
  profile: Profile;
}

export function ProfileImage({ profile }: ProfileImageProps) {
  return (
    <Box
      style={{
        maxWidth: 400,
        margin: '0 auto',
        aspectRatio: '1',
        borderRadius: '50%',
        border: '4px solid #f6940b',
        overflow: 'hidden',
      }}
    >
      <Image
        src={profile.profileImagePath}
        h="100%"
        w="100%"
        fit="cover"
        alt={`${profile.fullName} Profile`}
      />
    </Box>
  );
}
