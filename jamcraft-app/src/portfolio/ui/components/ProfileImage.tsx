import { Box, Image } from '@mantine/core';
import { Profile } from '../../entities/Profile';

/** Intrinsic size of the portrait asset, so the browser reserves space before it loads. */
const PORTRAIT_WIDTH = 1039;
const PORTRAIT_HEIGHT = 1021;

interface ProfileImageProps {
  profile: Profile;
}

export function ProfileImage({ profile }: ProfileImageProps) {
  return (
    <Box style={{ maxWidth: 560, margin: '0 auto' }}>
      <Image
        src={profile.profileImagePath}
        width={PORTRAIT_WIDTH}
        height={PORTRAIT_HEIGHT}
        w="100%"
        h="auto"
        fit="contain"
        alt={`${profile.fullName} Profile`}
        style={{ aspectRatio: `${PORTRAIT_WIDTH} / ${PORTRAIT_HEIGHT}` }}
      />
    </Box>
  );
}
