import { Title, Text } from '@mantine/core';
import { Profile } from '../../entities/Profile';

interface ProfileHeaderProps {
  profile: Profile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div>
      <Text style={{ lineHeight: 0.5 }} ta="left" c="gray.5">
        Hello, I am
      </Text>
      <Title
        order={1}
        c="#ededed"
        ta="left"
        style={{
          fontSize: '3.0rem',
          fontWeight: 'bold',
          color: '#ededed',
          textTransform: 'uppercase',
        }}
      >
        {profile.fullName}
      </Title>
    </div>
  );
}
