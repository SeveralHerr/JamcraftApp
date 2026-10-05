import { IconUsers } from '@tabler/icons-react';
import { Workshop } from '../../entities/Workshop';
import { CompactCard } from '../../../components/ui/CompactCard';
import { IconTile } from '../../../components/ui/IconTile';

interface WorkshopCardProps {
  workshop: Workshop;
}

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  const line = workshop.format ? `${workshop.format} · ${workshop.date}` : workshop.date;

  return (
    <CompactCard
      title={workshop.title}
      line={line}
      thumbnail={<IconTile icon={IconUsers} />}
      href={workshop.eventUrl}
      ariaLabel={workshop.title}
      variant="glass"
    />
  );
}
