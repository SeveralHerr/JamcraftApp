import { IconMicrophone2 } from '@tabler/icons-react';
import { SpeakingEngagement } from '../../entities/SpeakingEngagement';
import { CompactCard } from '../../../components/ui/CompactCard';
import { colors } from '../../../theme';

interface SpeakingEngagementCardProps {
  engagement: SpeakingEngagement;
}

export function SpeakingEngagementCard({ engagement }: SpeakingEngagementCardProps) {
  const line = `${engagement.eventName} · ${engagement.location} · ${engagement.date}`;

  return (
    <CompactCard
      title={engagement.title}
      line={line}
      thumbnail={
        <div
          style={{
            width: 72,
            height: 72,
            minWidth: 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.brand.primarySubtle,
            borderRadius: 'var(--mantine-radius-md)',
          }}
          aria-hidden="true"
        >
          <IconMicrophone2 size={32} color={colors.brand.primary} />
        </div>
      }
      href={engagement.eventUrl}
      ariaLabel={engagement.title}
      variant="glass"
    />
  );
}
