import { BaseCard } from './BaseCard';
import { EXTERNAL_LINKS } from '../../config/routes';

export function ItchCard() {
  return (
    <BaseCard 
      imageSrc="/assets/itchLogo.png"
      imageAlt="Itch.io"
      title="Gamejam"
      description="FINISHED - Join the Jamcraft Games, a game jam focused on creating dynamic and juicy games with smooth animations, satisfying sounds, and impactful moments. Collaborate with others or work solo for a chance to win a $200 prize, game assets, and have your game featured on Twitch!"
      onClick={() => window.open(EXTERNAL_LINKS.itch, '_blank')}
    />
  );
}