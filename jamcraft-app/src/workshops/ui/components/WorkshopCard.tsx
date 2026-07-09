import { IconUsers } from '@tabler/icons-react';
import { Workshop } from '../../entities/Workshop';
import { CompactCard } from '../../../components/ui/CompactCard';
import { colors } from '../../../theme';

interface WorkshopCardProps {
  workshop: Workshop;
}

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  const line = workshop.format ? `${workshop.format} · ${workshop.date}` : workshop.date;

  return (
    <CompactCard
      title={workshop.title}
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
          <IconUsers size={32} color={colors.brand.primary} />
        </div>
      }
      href={workshop.eventUrl}
      ariaLabel={workshop.title}
      variant="glass"
    />
  );
}
