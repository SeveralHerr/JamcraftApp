import { Title, Text } from '@mantine/core';
import { Profile } from '../../entities/Profile';
import { colors } from '../../../theme';

interface ProfileHeaderProps {
  profile: Profile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div>
      <Text ta="left" c="gray.5" mb={2}>
        Hello, I am
      </Text>
      <Title
        order={1}
        c={colors.text.primary}
        ta="left"
        style={{
          fontSize: '3.0rem',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          lineHeight: 1.05,
        }}
      >
        {profile.fullName}
      </Title>
      <Text ta="left" mt={6} mb="md" fw={500} c={colors.brand.primary}>
        {profile.title}
      </Text>
    </div>
  );
}
