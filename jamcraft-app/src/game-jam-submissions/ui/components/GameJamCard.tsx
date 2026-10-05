import { Badge } from '@mantine/core';
import { GameJamSubmission } from '../../entities/GameJamSubmission';
import { NavigateToExternalLink } from '../../../social-presence/use-cases/NavigateToExternalLink';
import { BrowserNavigationService } from '../../../social-presence/services/BrowserNavigationService';
import { CompactCard } from '../../../components/ui/CompactCard';
import { formatJamLabel } from '../../use-cases/formatJamLabel';

interface GameJamCardProps {
  submission: GameJamSubmission;
}

// Singleton service instance
const navigationService = new BrowserNavigationService();

export function GameJamCard({ submission }: GameJamCardProps) {
  const handleClick = () => {
    const useCase = new NavigateToExternalLink(navigationService);
    useCase.execute(submission.gameUrl);
  };

  return (
    <CompactCard
      title={submission.name}
      line={submission.description}
      imageUrl={submission.coverImageUrl}
      imageAlt={submission.name}
      meta={
        <Badge color="grape" variant="light" size="xs" w="fit-content">
          {formatJamLabel(submission)}
        </Badge>
      }
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    />
  );
}
