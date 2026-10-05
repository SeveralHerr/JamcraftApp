import { Badge } from '@mantine/core';
import { IconMicrophone2 } from '@tabler/icons-react';
import { SpeakingEngagement } from '../../entities/SpeakingEngagement';
import { CompactCard } from '../../../components/ui/CompactCard';
import { IconTile } from '../../../components/ui/IconTile';

interface SpeakingEngagementCardProps {
  engagement: SpeakingEngagement;
}

export function SpeakingEngagementCard({ engagement }: SpeakingEngagementCardProps) {
  const line = `${engagement.eventName} · ${engagement.location} · ${engagement.date}`;

  return (
    <CompactCard
      title={engagement.title}
      line={line}
      thumbnail={<IconTile icon={IconMicrophone2} />}
      meta={
        <Badge color="gray" variant="light" size="xs" w="fit-content">
          {engagement.format}
        </Badge>
      }
      href={engagement.eventUrl}
      ariaLabel={engagement.title}
      variant="glass"
    />
  );
}
