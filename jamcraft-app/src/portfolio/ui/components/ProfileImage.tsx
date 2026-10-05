import { Box, Image } from '@mantine/core';
import { Profile } from '../../entities/Profile';

/** Intrinsic size of the portrait asset, so the browser reserves space before it loads. */
const PORTRAIT_WIDTH = 1039;
const PORTRAIT_HEIGHT = 1021;

/** Feathers the photo's edges into the black page instead of a hard box. */
const PORTRAIT_EDGE_FADE = 'radial-gradient(closest-side, #000 70%, transparent 100%)';

interface ProfileImageProps {
  profile: Profile;
}

export function ProfileImage({ profile }: ProfileImageProps) {
  return (
    // Smaller on phones so the name and bio start above the fold.
    <Box maw={{ base: 280, sm: 420, md: 560 }} mx="auto">
      <Image
        src={profile.profileImagePath}
        width={PORTRAIT_WIDTH}
        height={PORTRAIT_HEIGHT}
        w="100%"
        h="auto"
        fit="contain"
        alt={`${profile.fullName} Profile`}
        style={{ aspectRatio: `${PORTRAIT_WIDTH} / ${PORTRAIT_HEIGHT}`, maskImage: PORTRAIT_EDGE_FADE }}
      />
    </Box>
  );
}
