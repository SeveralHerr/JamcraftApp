import { Image } from '@mantine/core';
import { SocialLink } from '../../entities/SocialLink';
import { NavigateToExternalLink } from '../../use-cases/NavigateToExternalLink';
import { BrowserNavigationService } from '../../services/BrowserNavigationService';
import { transitions } from '../../../theme';

interface SocialLinkIconProps {
  socialLink: SocialLink;
}

// Singleton service instance
const navigationService = new BrowserNavigationService();

export function SocialLinkIcon({ socialLink }: SocialLinkIconProps) {
  const handleClick = () => {
    const useCase = new NavigateToExternalLink(navigationService);
    useCase.execute(socialLink.url);
  };

  return (
    <a
      href={socialLink.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={socialLink.ariaLabel}
      className="focus-ring"
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      style={{
        display: 'inline-block',
        transition: transitions.fast,
      }}
      onMouseEnter={(e) => {
        const img = e.currentTarget.querySelector('img');
        if (img) {
          img.style.transform = 'scale(1.1) rotate(5deg)';
        }
      }}
      onMouseLeave={(e) => {
        const img = e.currentTarget.querySelector('img');
        if (img) {
          img.style.transform = 'scale(1) rotate(0deg)';
        }
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
          transition: transitions.fast,
        }}
      />
    </a>
  );
}
