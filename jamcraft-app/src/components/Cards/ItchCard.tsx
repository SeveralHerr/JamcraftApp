import { BaseCard } from './BaseCard';

export function ItchCard() {
  return (
    <BaseCard 
      imageSrc="/assets/itchLogo.png"
      imageAlt="Itch.io"
      title="Jamcraft's Gamejam"
      description="Join our game development community! Participate in game jams, share your creations, and connect with fellow developers."
      onButtonClick={() => window.open('your-itch-link', '_blank')}
    />
  );
}