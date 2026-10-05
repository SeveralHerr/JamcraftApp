import { Image } from '@mantine/core';
import { SocialLink } from '../../entities/SocialLink';
import { isSafeExternalUrl } from '../../use-cases/isSafeExternalUrl';
import { transitions } from '../../../theme';

interface SocialLinkIconProps {
  socialLink: SocialLink;
  /** Pass 'lazy' when the icon renders below the fold (e.g. the footer). */
  imageLoading?: 'eager' | 'lazy';
}

export function SocialLinkIcon({ socialLink, imageLoading = 'eager' }: SocialLinkIconProps) {
  if (!isSafeExternalUrl(socialLink.url)) {
    return null;
  }

  return (
    <a
      href={socialLink.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={socialLink.ariaLabel}
      title={socialLink.displayName}
      className="focus-ring"
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
        loading={imageLoading}
        style={{
          filter: 'brightness(0) invert(1)',
          cursor: 'pointer',
          transition: transitions.fast,
        }}
      />
    </a>
  );
}
