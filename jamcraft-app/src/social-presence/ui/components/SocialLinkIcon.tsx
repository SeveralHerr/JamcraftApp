import { Image } from '@mantine/core';
import { SocialLink } from '../../entities/SocialLink';
import { NavigateToExternalLink } from '../../use-cases/NavigateToExternalLink';
import { BrowserNavigationService } from '../../services/BrowserNavigationService';

interface SocialLinkIconProps {
  socialLink: SocialLink;
}

export function SocialLinkIcon({ socialLink }: SocialLinkIconProps) {
  const handleClick = () => {
    const navigationService = new BrowserNavigationService();
    const useCase = new NavigateToExternalLink(navigationService);
    useCase.execute(socialLink.url);
  };

  return (
    <a
      href={socialLink.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={socialLink.ariaLabel}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
    >
      <Image
        src={socialLink.iconPath}
        h={40}
        w={40}
        alt={socialLink.displayName}
        style={{
          filter: 'brightness(0) invert(1)',
          cursor: 'pointer',
        }}
      />
    </a>
  );
}
