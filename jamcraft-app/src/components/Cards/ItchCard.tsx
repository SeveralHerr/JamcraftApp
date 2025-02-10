import { BaseCard } from './BaseCard';
import { EXTERNAL_LINKS } from '../../config/routes';

export function ItchCard() {
  return (
    <BaseCard 
      imageSrc="/assets/itchLogo.png"
      imageAlt="Itch.io"
      title="Gamejam"
      description="Join the Jamcraft Games, a game jam focused on creating dynamic and juicy games with smooth animations, satisfying sounds, and impactful moments. Collaborate with others or work solo for a chance to win a $100 prize and have your game featured on Twitch!v"
      onClick={() => window.open(EXTERNAL_LINKS.itch, '_blank')}
    />
  );
}