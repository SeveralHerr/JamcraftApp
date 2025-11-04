import { BaseCard } from '../../../components/Cards/BaseCard';
import { CommunityChannel } from '../../entities/CommunityChannel';
import { NavigateToExternalLink } from '../../../social-presence/use-cases/NavigateToExternalLink';
import { BrowserNavigationService } from '../../../social-presence/services/BrowserNavigationService';

interface CommunityChannelCardProps {
  channel: CommunityChannel;
}

export function CommunityChannelCard({ channel }: CommunityChannelCardProps) {
  const handleClick = () => {
    const navigationService = new BrowserNavigationService();
    const useCase = new NavigateToExternalLink(navigationService);
    useCase.execute(channel.externalUrl);
  };

  return (
    <BaseCard
      imageSrc={channel.imageSrc}
      imageAlt={channel.imageAlt}
      title={channel.name}
      description={channel.description}
      onClick={handleClick}
    />
  );
}
