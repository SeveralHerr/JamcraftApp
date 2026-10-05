import { Badge } from '@mantine/core';
import { GameJamSubmission } from '../../entities/GameJamSubmission';
import { CompactCard } from '../../../components/ui/CompactCard';
import { formatJamLabel } from '../../use-cases/formatJamLabel';

interface GameJamCardProps {
  submission: GameJamSubmission;
}

export function GameJamCard({ submission }: GameJamCardProps) {
  return (
    <CompactCard
      title={submission.name}
      line={submission.description}
      imageUrl={submission.coverImageUrl}
      imageAlt=""
      meta={
        <Badge color="grape" variant="light" size="xs" w="fit-content">
          {formatJamLabel(submission)}
        </Badge>
      }
      href={submission.gameUrl}
      ariaLabel={submission.name}
    />
  );
}
